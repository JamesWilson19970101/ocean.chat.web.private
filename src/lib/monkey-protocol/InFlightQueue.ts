import { Flags } from './constants';
import { MonkeyFrame } from './frame';

interface InFlightRequest {
  reqId: number;
  frameData: Omit<MonkeyFrame, 'version'>;
  timestamp: number;
  // Promise resolvers for potential upper-layer awaiters
  resolve: (ackPayload: Uint8Array) => void;
  reject: (error: Error) => void;
}

/**
 * Manages outgoing frames that require an acknowledgment (ACK).
 *
 * It tracks requests sent with the `REQUIRE_ACK` flag, stores their Promise resolvers, and provides a silent replay compensation mechanism to automatically resend dropped packets upon network reconnection.
 *
 * @public
 */
export class InFlightQueue {
  private queue: Map<number, InFlightRequest> = new Map();

  /**
   * Adds a frame to the in-flight queue and returns a Promise that resolves when the ACK is received.
   *
   * @param frameData - The frame data to be sent, excluding the protocol version field.
   * @param reqId - The unique request identifier associated with this frame.
   * @returns A promise that resolves with the acknowledgment payload when the server responds.
   * @public
   */
  public enqueue(
    frameData: Omit<MonkeyFrame, 'version'>,
    reqId: number,
  ): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      this.queue.set(reqId, {
        reqId,
        frameData,
        timestamp: Date.now(),
        resolve,
        reject,
      });
    });
  }

  /**
   * Resolves a pending request and removes it from the queue.
   *
   * @param reqId - The unique request identifier of the pending request.
   * @param ackPayload - The payload received from the server's acknowledgment.
   * @public
   */
  public resolve(reqId: number, ackPayload: Uint8Array) {
    const req = this.queue.get(reqId);
    if (req) {
      req.resolve(ackPayload);
      this.queue.delete(reqId);
    }
  }

  /**
   * Rejects a pending request and removes it from the queue.
   *
   * @param reqId - The unique request identifier of the pending request.
   * @param error - The Error object causing the rejection.
   * @public
   */
  public reject(reqId: number, error: Error) {
    const req = this.queue.get(reqId);
    if (req) {
      req.reject(error);
      this.queue.delete(reqId);
    }
  }

  /**
   * Rejects all pending requests and clears the queue.
   *
   * This is particularly useful on intentional logout or when a fatal protocol mismatch occurs, ensuring no promises are left hanging.
   *
   * @param error - The Error object to reject all pending promises with.
   * @public
   */
  public clearAndRejectAll(error: Error) {
    this.queue.forEach((req) => req.reject(error));
    this.queue.clear();
  }

  /**
   * Retrieves all pending requests sorted by their initial timestamp (oldest first).
   *
   * This method is primarily used for silent replay mechanisms upon reconnection, ensuring messages are re-sent in their original order.
   *
   * @returns An array of pending `InFlightRequest` objects sorted by timestamp.
   * @public
   */
  public getPendingRequests(): InFlightRequest[] {
    return Array.from(this.queue.values()).sort(
      (a, b) => a.timestamp - b.timestamp,
    );
  }

  /**
   * Discards requests that have the `NO_RETRY` flag set.
   *
   * This should be called before replaying the queue to prevent "stale" volatile messages (like "typing...") from being sent after a network drop. Discarded requests will have their promises rejected.
   *
   * @public
   */
  public discardNoRetryRequests() {
    for (const [reqId, req] of this.queue.entries()) {
      if ((req.frameData.flags & Flags.NO_RETRY) === Flags.NO_RETRY) {
        req.reject(new Error('Discarded due to NO_RETRY flag upon reconnect'));
        this.queue.delete(reqId);
      }
    }
  }
}
