import { ErrorCodes } from '@/constants/error-codes';
import { globalErrorDispatcher } from '@/lib/errors/error-dispatcher';
import { MonkeyExceptionAck } from '@/types/error';

// Stub for Monkey Commands to make it compilable
enum MonkeyCmd {
  EXCEPTION_ACK = 0x0c,
  // other commands...
}

// Stub for Protobuf Decoder
const ProtobufDecoder = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  decodeCommand: (data: ArrayBuffer): { cmd: number; payload: any } => {
    // Implementation would decode the binary payload here
    return { cmd: 0, payload: {} };
  },
};

export class SocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  public connect(url: string) {
    if (this.ws) {
      this.ws.close();
    }

    this.ws = new WebSocket(url);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onmessage = this.handleMessage.bind(this);
    this.ws.onclose = this.handleClose.bind(this);
    this.ws.onerror = this.handleError.bind(this);
  }

  private handleMessage(event: MessageEvent) {
    try {
      // Decode the incoming Protobuf message
      const { cmd, payload } = ProtobufDecoder.decodeCommand(
        event.data as ArrayBuffer,
      );

      // Intercept Global Exception ACKs
      if (cmd === MonkeyCmd.EXCEPTION_ACK) {
        const exceptionAck = payload as MonkeyExceptionAck;
        globalErrorDispatcher.dispatch(
          exceptionAck.errorCode,
          exceptionAck.message,
          {
            timestamp: exceptionAck.timestamp,
            serverSupportedVersions: exceptionAck.serverSupportedVersions,
          },
        );
        return; // Stop processing further for this packet
      }

      // Handle other normal business messages...
    } catch (err) {
      console.error('Failed to parse WebSocket message', err);
    }
  }

  private handleClose(event: CloseEvent) {
    console.warn(`WebSocket closed with code: ${event.code}`);

    // Intercept specific disconnect codes
    if (event.code === ErrorCodes.WS_CLOSE_SERVICE_RESTART) {
      // Backend gateway restarted - Silent/Exponential backoff reconnect
      this.attemptReconnect();
    } else if (event.code === ErrorCodes.WS_CLOSE_HANDSHAKE_TIMEOUT) {
      // Handshake timeout - Unauthorized, trigger re-auth
      globalErrorDispatcher.dispatch(
        ErrorCodes.UNAUTHORIZED,
        'Errors.wsHandshakeTimeout',
        { closeEventCode: event.code }
      );
    } else {
      // Standard close logic or other reconnect strategies
    }
    }

    private handleError(event: Event) {
    console.error('WebSocket encountered an error', event);
    // Generic socket error
    }

    private attemptReconnect() {
    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      const backoffTime = Math.pow(2, this.reconnectAttempts) * 1000;
      this.reconnectAttempts++;
      console.log(`Attempting reconnect in ${backoffTime}ms...`);
      setTimeout(() => {
        // Implement real reconnect logic with URL
        // this.connect(this.lastUrl);
      }, backoffTime);
    } else {
      globalErrorDispatcher.dispatch(
        ErrorCodes.SERVICE_ERROR,
        'Errors.wsConnectionFailed'
      );
    }
    }
}

export const socketManager = new SocketManager();
