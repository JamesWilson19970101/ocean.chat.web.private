import { toast } from 'react-hot-toast';

import { ErrorCodes } from '@/constants/error-codes';
import { globalErrorDispatcher } from '@/lib/errors/error-dispatcher';
import { useChatStore } from '@/store/useChatStore';
import { useConnectionStore } from '@/store/useConnectionStore';
import { useRoomStore } from '@/store/useRoomStore';

import { Cmd, CURRENT_VERSION, ErrorCode, Flags } from './constants';
import { FrameDecoder, FrameEncoder, MonkeyFrame } from './frame';
import { HeartbeatManager } from './Heartbeat';
import { InFlightQueue } from './InFlightQueue';
import { oceanchat } from './proto/monkey';
import { SyncEngine } from './SyncEngine';

export interface SocketManagerOptions {
  url: string;
  jwt: () => Promise<string | null>;
  deviceId: string;
  deviceType: string;
  maxRetries?: number; // Optional, default to 3
}

/**
 * Manages the entire lifecycle of a WebSocket connection using the Monkey Protocol.
 *
 * This class is responsible for:
 * - Establishing and maintaining a persistent connection.
 * - Handling authentication and protocol version negotiation.
 * - Implementing automatic reconnection with exponential backoff and jitter.
 * - Managing heartbeats to detect and recover from dead connections.
 * - Processing and routing incoming protocol frames.
 * - Queueing outgoing messages that require acknowledgment and handling silent replay
 *   after a reconnection.
 * - Coordinating with the `SyncEngine` to synchronize message history.
 */
export class SocketManager {
  /** The underlying WebSocket instance. It is `null` if the connection is not active. */
  private ws: WebSocket | null = null;
  /** Manages the sending of PING frames and detection of dead connections. */
  private heartbeat: HeartbeatManager;
  /** Queues messages that require an acknowledgment and facilitates silent replay. */
  private inFlightQueue: InFlightQueue;
  /** Handles the synchronization of messages with the server. */
  private syncEngine: SyncEngine;
  /** The configuration options for the socket manager, with defaults applied. */
  private options: Required<SocketManagerOptions>;

  /**
   * Indicates whether the WebSocket connection was closed intentionally
   * (e.g., by an explicit disconnect call, user logout, or fatal protocol errors).
   * When set to `true`, the automatic reconnection mechanism is disabled upon socket closure.
   */
  private isIntentionalClose = false;
  /**
   * Timer ID for scheduled reconnection attempts or the initial handshake timeout.
   * It is `null` when no reconnection or handshake is pending.
   */
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  /**
   * The protocol version currently in use for the connection.
   * This may be downgraded during version negotiation with the server.
   */
  private currentProtocolVersion = CURRENT_VERSION;
  /** A read-only array of protocol versions supported by this client. */
  private readonly supportedVersions = [1]; // Client supported versions TODO: Add more supported versions.
  /**
   * Constructs a new SocketManager.
   * @param options - The configuration for the socket connection.
   */
  constructor(options: SocketManagerOptions) {
    this.options = {
      maxRetries: 3,
      ...options,
    };
    this.inFlightQueue = new InFlightQueue();
    this.syncEngine = new SyncEngine();

    // Wire SyncEngine to ChatStore and RoomStore
    this.syncEngine.onSyncComplete = (newMessages) => {
      useChatStore.getState().appendMessages(newMessages);

      // Extract unique group IDs from new messages
      const groupIds = new Set(newMessages.map((m) => m.group_id));
      
      const activeRoomId = useRoomStore.getState().activeRoomId;

      groupIds.forEach((groupId) => {
        // Increment unread count if we are NOT currently looking at this room
        const isNotActiveRoom = groupId !== activeRoomId;
        useRoomStore.getState().updateRoomActivity(groupId, Date.now(), isNotActiveRoom);
      });
    };

    this.heartbeat = new HeartbeatManager(
      this.sendRawFrame.bind(this),
      this.handleDeadTimeout.bind(this),
    );

    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline.bind(this));
      window.addEventListener('offline', this.handleOffline.bind(this));
    }
  }

  /**
   * Establishes a WebSocket connection to the server.
   *
   * If a connection is already open or in the process of connecting, this method does nothing.
   * If the browser is currently offline, it updates the connection store status to 'offline' and aborts.
   * Otherwise, it initializes a new WebSocket instance, sets up the necessary event listeners,
   * and updates the connection state to 'connecting'.
   *
   * @public
   */
  public connect() {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.CONNECTING ||
        this.ws.readyState === WebSocket.OPEN)
    ) {
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      useConnectionStore.getState().setStatus('offline');
      return;
    }

    this.isIntentionalClose = false;
    useConnectionStore.getState().setStatus('connecting');

    this.ws = new WebSocket(this.options.url);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onclose = this.onClose.bind(this);
    this.ws.onerror = this.onError.bind(this);
  }

  /**
   * Intentionally closes the WebSocket connection and cleans up resources.
   *
   * This method sets the `isIntentionalClose` flag to true to prevent the automatic
   * reconnection mechanism from triggering. It also aborts all pending requests in the
   * in-flight queue with an error and resets the global connection state.
   *
   * @public
   */
  public disconnect() {
    this.isIntentionalClose = true;
    this.cleanup();
    this.inFlightQueue.clearAndRejectAll(new Error('Intentional disconnect'));
    useConnectionStore.getState().reset();
  }

  /**
   * A low-level method to send a pre-constructed frame directly to the WebSocket.
   *
   * This method bypasses the `InFlightQueue` and is used for sending control frames
   * (like heartbeats) or for replaying queued messages upon reconnection. It ensures
   * the socket is open before sending, adds the current protocol version to the frame,
   * encodes it, and then transmits it. It also resets the heartbeat timer by signaling
   * network activity.
   *
   * @private
   * @param frameData - The frame data to be sent, excluding the protocol version.
   * @returns {void}
   */
  private sendRawFrame(frameData: Omit<MonkeyFrame, 'version'>) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('[SocketManager] Cannot send raw frame, socket not open');
      return;
    }

    const frame: MonkeyFrame = {
      ...frameData,
      version: this.currentProtocolVersion,
    };

    const encoded = FrameEncoder.encode(frame);
    this.ws.send(encoded as unknown as Uint8Array<ArrayBuffer>);
    this.heartbeat.onActivity();
  }

  /**
   * Sends a request through the WebSocket connection. This is the primary method for
   * application-level communication.
   *
   * It intelligently handles frames that require acknowledgment (ACK) versus those that are
   * "fire-and-forget".
   *
   * - If the frame includes the `Flags.REQUIRE_ACK` flag, it is enqueued in the `InFlightQueue`.
   *   A `Promise` is returned which will resolve with the server's ACK payload when it arrives.
   *   The frame is only sent immediately if the connection is currently open and authenticated;
   *   otherwise, it will be sent upon successful reconnection (silent replay).
   *
   * - If the frame does not require an ACK, it is sent immediately if the connection is ready,
   *   and a resolved `Promise<void>` is returned.
   *
   * A unique `reqId` is automatically assigned if not provided.
   *
   * @public
   * @param frameData - The frame data to send. The `version` is added automatically.
   * `reqId` is optional and will be generated if omitted.
   * @returns A `Promise` that resolves with the `Uint8Array` payload of the ACK frame
   * if `Flags.REQUIRE_ACK` is set, otherwise it resolves with `void`.
   */
  public sendRequest(
    frameData: Omit<MonkeyFrame, 'version' | 'reqId'> & { reqId?: number },
  ): Promise<Uint8Array | void> {
    const reqId =
      frameData.reqId !== undefined
        ? frameData.reqId
        : this.generateInternalReqId();

    const fullFrameData = {
      ...frameData,
      reqId,
    };

    // If it requires an ACK, queue it
    if ((frameData.flags & Flags.REQUIRE_ACK) === Flags.REQUIRE_ACK) {
      const promise = this.inFlightQueue.enqueue(fullFrameData, reqId);
      // Only send if the socket is open and authenticated (handled by silent replay otherwise)
      if (
        this.ws &&
        this.ws.readyState === WebSocket.OPEN &&
        useConnectionStore.getState().status === 'connected'
      ) {
        this.sendRawFrame(fullFrameData);
      }
      return promise;
    } else {
      // Fire and forget
      if (
        this.ws &&
        this.ws.readyState === WebSocket.OPEN &&
        useConnectionStore.getState().status === 'connected'
      ) {
        this.sendRawFrame(fullFrameData);
      }
      return Promise.resolve();
    }
  }

  /**
   * Re-authenticates an active WebSocket connection with a new JWT token.
   * This is useful for long-lived connections where the access token might expire,
   * allowing seamless re-authentication without dropping the socket.
   *
   * @public
   */
  public async reauthenticate() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    const jwt = await this.options.jwt();
    if (!jwt) return;

    const authReqObj: oceanchat.monkey.AuthReq.$Properties = {
      jwt,
      deviceId: this.options.deviceId,
      deviceType: this.options.deviceType,
      supportedVersions: this.supportedVersions,
    };

    const payload = oceanchat.monkey.AuthReq.encode(authReqObj).finish();

    this.sendRawFrame({
      cmd: Cmd.AUTH_REQ,
      flags: Flags.REQUIRE_ACK,
      reqId: this.generateInternalReqId(),
      length: payload.length,
      payload,
    });
  }

  /**
   * Event handler for the WebSocket `onopen` event. Initiates the protocol-level authentication handshake.
   *
   * Upon a successful low-level connection, this method retrieves the JWT token and sends an `AUTH_REQ`
   * frame to the server to authenticate the session. It also initializes a 5-second timeout waiting for
   * the corresponding `AUTH_ACK`. If the handshake times out, or if no JWT is available,
   * the connection is automatically reconnected or disconnected respectively.
   *
   * @private
   */
  private async onOpen() {
    // Send AUTH_REQ
    const jwt = await this.options.jwt();
    if (!jwt) {
      globalErrorDispatcher.dispatch({
        errorCode: ErrorCode.UNAUTHORIZED,
        message: 'No JWT token available',
        source: 'ws',
      });
      this.disconnect();
      return;
    }

    const authReqObj: oceanchat.monkey.AuthReq.$Properties = {
      jwt,
      deviceId: this.options.deviceId,
      deviceType: this.options.deviceType,
      supportedVersions: this.supportedVersions,
    };

    const payload = oceanchat.monkey.AuthReq.encode(authReqObj).finish();

    // Not Enqueue InFlightQueue
    this.sendRawFrame({
      cmd: Cmd.AUTH_REQ,
      flags: Flags.REQUIRE_ACK,
      reqId: this.generateInternalReqId(),
      length: payload.length,
      payload,
    });

    // Start 5-second handshake timeout wait
    this.reconnectTimer = setTimeout(() => {
      console.warn('[SocketManager] Handshake timeout');
      this.reconnect();
    }, 5000);
  }

  /**
   * Event handler for the WebSocket `onmessage` event.
   *
   * This method processes incoming binary frames from the server. It first registers
   * the network activity with the heartbeat manager, then attempts to decode the frame.
   * Based on the decoded command (`cmd`), it routes the payload to the appropriate
   * handler (e.g., authentication acknowledgment, exception handling, ping/pong,
   * message synchronization, or resolving in-flight requests).
   *
   * @private
   * @param event - The message event containing the raw binary data.
   */
  private onMessage(event: MessageEvent) {
    this.heartbeat.onActivity();

    let frame: MonkeyFrame;
    try {
      frame = FrameDecoder.decode(event.data);
    } catch (err) {
      console.error('[SocketManager] Frame decode error:', err);
      return;
    }

    switch (frame.cmd) {
      case Cmd.AUTH_ACK:
        this.handleAuthAck();
        break;
      case Cmd.EXCEPTION_ACK:
        this.handleExceptionAck(frame);
        break;
      case Cmd.PING:
        this.heartbeat.onReceivePing();
        break;
      case Cmd.PONG:
        // No business logic needed, onActivity already reset timers
        break;
      case Cmd.MSG_NOTIFY:
        try {
          const notify = oceanchat.monkey.MsgNotify.decode(frame.payload);
          this.syncEngine.handleNotify(notify);
        } catch (e) {
          console.error('[SocketManager] Failed to decode MSG_NOTIFY', e);
        }
        break;
      case Cmd.MSG_UP_ACK:
        this.inFlightQueue.resolve(frame.reqId, frame.payload);
        break;
      default:
        console.warn(`[SocketManager] Unhandled cmd: ${frame.cmd}`);
    }
  }

  /**
   * Event handler for the WebSocket `onclose` event.
   *
   * This method is triggered when the connection to the server is terminated.
   * If the closure was not initiated intentionally by the client (e.g., due to network
   * failure or server crash), it automatically initiates the reconnection sequence.
   *
   * @private
   * @param event - The close event containing the closure code and reason.
   */
  private onClose(event: CloseEvent) {
    console.log(`[SocketManager] WebSocket closed. Code: ${event.code}`);

    // Handle specific disconnect codes before generic reconnect logic
    if (event.code === ErrorCodes.WS_CLOSE_SERVICE_RESTART) {
      // WS_CLOSE_SERVICE_RESTART
      console.warn(
        '[SocketManager] Backend gateway restarted. Initiating reconnect.',
      );
      this.reconnect();
      return;
    } else if (event.code === ErrorCodes.WS_CLOSE_HANDSHAKE_TIMEOUT) {
      // WS_CLOSE_HANDSHAKE_TIMEOUT
      console.warn('[SocketManager] Handshake timeout. Triggering re-auth.');
      globalErrorDispatcher.dispatch({
        errorCode: ErrorCode.UNAUTHORIZED,
        message: 'Errors.wsHandshakeTimeout',
        details: { closeEventCode: event.code },
        source: 'ws',
      });
      return;
    }

    if (!this.isIntentionalClose) {
      this.reconnect();
    }
  }

  /**
   * Event handler for the WebSocket `onerror` event.
   *
   * Logs connection errors. Note that the WebSocket API guarantees that an `onclose`
   * event will always follow an `onerror` event, so the actual reconnection logic
   * is deferred to the `onClose` handler to prevent duplicate reconnection attempts.
   *
   * @private
   * @param event - The error event.
   */
  private onError(event: Event) {
    console.error('[SocketManager] WebSocket error', event);
    // According to the browser's WebSocket API standard,
    // if the underlying network connection encounters any fatal error that causes an interruption,
    // it will first dispatch an error event,
    // and it is guaranteed that a close event will be dispatched immediately afterward.
    // So onClose will be called right after
  }

  /**
   * Handles the successful authentication acknowledgment (`AUTH_ACK`) from the server.
   *
   * This method finalizes the connection establishment process by:
   * 1. Clearing the handshake timeout timer.
   * 2. Updating the global connection state to 'connected'.
   * 3. Starting the heartbeat mechanism to keep the connection alive.
   * 4. Replaying any pending requests in the `InFlightQueue` (discarding volatile `NO_RETRY` requests)
   *    to ensure seamless recovery from temporary disconnections.
   * 5. Triggering a full message sync via the `SyncEngine` to catch up on any data missed while offline.
   *
   * @private
   */
  private handleAuthAck() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    useConnectionStore.getState().setStatus('connected');
    this.heartbeat.start();

    // Replay InFlight Queue
    this.inFlightQueue.discardNoRetryRequests();
    const pending = this.inFlightQueue.getPendingRequests();
    if (pending.length > 0) {
      console.log(
        `[SocketManager] Replaying ${pending.length} pending requests...`,
      );
      for (const req of pending) {
        this.sendRawFrame(req.frameData);
      }
    }

    // Trigger sync to cover offline period and load real historical messages for all active rooms
    const activeRooms = useRoomStore.getState().rooms;
    activeRooms.forEach((room) => {
      this.syncEngine.triggerSync(room.id);
    });
  }

  /**
   * Handles server-sent exception frames (`EXCEPTION_ACK`).
   *
   * This method is responsible for processing various error conditions reported by the server.
   * It can trigger specific client-side recovery logic based on the error code received.
   *
   * - **Protocol Mismatch (`PROTOCOL_MISMATCH`):** Initiates a version negotiation. If a common
   *   version is found between the client's `supportedVersions` and the server's list, it
   *   silently downgrades to the best compatible version and reconnects. If no common version
   *   is available, it transitions the connection to a 'failed' state, requiring a client update.
   *
   * - **Unauthorized (`UNAUTHORIZED`):** Handles authentication failures, such as an expired or
   *   invalid JWT. It marks the connection for intentional closure to prevent reconnection,
   *   cleans up resources, and dispatches a global `UNAUTHORIZED` error to trigger application-level
   *   logout or re-authentication flows.
   *
   * - **Other Errors:** For any other error codes, it dispatches them through the `globalErrorDispatcher`
   *   to be handled by the application's global error handling logic.
   *
   * @private
   * @param frame - The `MonkeyFrame` containing the exception details.
   * @returns {void}
   */
  private handleExceptionAck(frame: MonkeyFrame) {
    try {
      const decoded = oceanchat.monkey.ExceptionAck.decode(frame.payload);

      // Handle smooth version negotiation
      if (decoded.errorCode === ErrorCode.PROTOCOL_MISMATCH) {
        const serverVersions = decoded.serverSupportedVersions;

        // Find intersection
        const intersection = this.supportedVersions.filter((v) =>
          serverVersions.includes(v),
        );

        if (intersection.length > 0) {
          // Silent downgrade and reconnect
          const bestVersion = Math.max(...intersection);
          this.currentProtocolVersion = bestVersion;
          console.log(
            `[SocketManager] Downgrading protocol to version ${bestVersion} and reconnecting...`,
          );

          this.cleanup();
          this.connect(); // Reconnect immediately with new version
          return;
        } else {
          // Intersection empty, force update needed
          useConnectionStore
            .getState()
            .setFailed(new Error('Protocol mismatch, force update required'));
          this.isIntentionalClose = true;
          this.cleanup();
          globalErrorDispatcher.dispatch({
            errorCode: ErrorCode.PROTOCOL_MISMATCH,
            message: 'Version mismatch',
            source: 'ws',
          });
          return;
        }
      }

      // Handle token revoked/expired
      if (decoded.errorCode === ErrorCode.UNAUTHORIZED) {
        this.isIntentionalClose = true;
        this.cleanup();
        useConnectionStore
          .getState()
          .setFailed(new Error(decoded.message ?? 'Unauthorized'));
        toast.error(
          'WebSocket connection unauthorized, please try again later.',
        );
        return;
      }

      // Dispatch other business errors
      globalErrorDispatcher.dispatch({
        errorCode: decoded.errorCode ?? 500,
        message: decoded.message ?? 'Unknown Exception',
        source: 'ws',
      });
    } catch (e) {
      console.error('[SocketManager] ExceptionAck decode failed', e);
    }
  }

  /**
   * Callback for the `HeartbeatManager` when a dead connection is detected.
   * This is triggered if no network activity (neither sent nor received frames)
   * occurs within the `DEAD_TIMEOUT` period. It initiates the reconnection process.
   *
   * @private
   */
  private handleDeadTimeout() {
    console.warn(
      '[SocketManager] Dead timeout reached. Terminating connection.',
    );
    this.reconnect();
  }

  /**
   * Manages the automatic reconnection process with an exponential backoff strategy.
   *
   * This method is called when the connection is lost unintentionally. It cleans up the old connection,
   * increments the retry counter, and schedules the next connection attempt. The delay between
   * retries increases exponentially (`2^retryCount`) with added jitter to prevent thundering herd
   * problems. The delay is capped at 30 seconds. If `maxRetries` is exceeded, it transitions
   * the connection to a permanent 'failed' state.
   *
   * @private
   */
  private reconnect() {
    this.cleanup();

    const store = useConnectionStore.getState();
    if (store.status === 'failed') return; // Cannot reconnect from failed state (e.g. 426 force update)

    const retryCount = store.retryCount + 1;

    // Check against maxRetries
    if (retryCount > this.options.maxRetries) {
      console.error(
        `[SocketManager] Max retries (${this.options.maxRetries}) exceeded. Stopping.`,
      );
      store.setFailed(new Error('Connection failed after maximum retries'));
      return;
    }

    // Exponential backoff with jitter (max 30s)
    let backoffMs = Math.min(
      Math.random() * (Math.pow(2, Math.min(retryCount, 6)) * 1000),
      30000,
    );
    if (backoffMs < 1000) backoffMs = 1000;

    const nextRetryTime = Date.now() + backoffMs;
    store.setWaiting(retryCount, nextRetryTime, new Error('Connection lost'));

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, backoffMs);
  }

  /**
   * Cleans up internal resources, stops heartbeat timers, and safely closes the WebSocket connection.
   *
   * This method is essential for preventing memory leaks and reconnect loops by unbinding all event listeners
   * before discarding the current WebSocket instance. It also clears any pending reconnection timers.
   *
   * @private
   * @returns {void}
   */
  private cleanup() {
    this.heartbeat.stop();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.onclose = null; // Prevent reconnect loop
      this.ws.onerror = null;
      this.ws.onmessage = null;
      this.ws.onopen = null;
      if (
        this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING
      ) {
        this.ws.close();
      }
      this.ws = null;
    }
  }

  /**
   * Handles the browser's 'online' event.
   *
   * If the connection was previously marked as 'offline', this method will
   * automatically trigger a new connection attempt.
   *
   * @private
   */
  private handleOnline() {
    const store = useConnectionStore.getState();
    if (store.status === 'offline') {
      this.connect();
    }
  }

  /**
   * Handles the browser's 'offline' event.
   *
   * This immediately cleans up any active connection and sets the state to 'offline',
   * preventing any further reconnection attempts until the browser comes back online.
   *
   * @private
   */
  private handleOffline() {
    this.cleanup();
    useConnectionStore.getState().setStatus('offline');
  }

  /**
   * A counter used to sequentially generate unique internal request IDs.
   *
   * @private
   */
  private internalReqIdCounter = 1;
  /**
   * Generates the next unique internal request ID.
   *
   * This method increments the internal counter and wraps it around at `0xFFFFFF`
   * (the maximum value for a 24-bit unsigned integer) to ensure compatibility
   * with the `reqId` field size defined in the Monkey Protocol specification.
   *
   * @private
   * @returns {number} A 24-bit unsigned integer representing the request ID.
   */
  private generateInternalReqId() {
    this.internalReqIdCounter = (this.internalReqIdCounter % 0xffffff) + 1;
    return this.internalReqIdCounter;
  }
}
