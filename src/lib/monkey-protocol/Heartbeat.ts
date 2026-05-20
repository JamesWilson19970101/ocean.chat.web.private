import { Cmd, Flags } from './constants';
import { MonkeyFrame } from './frame';

/**
 * Implements the Asymmetric Heartbeat and Implicit Heartbeat mechanisms
 * as specified in Monkey Protocol.
 */
export class HeartbeatManager {
  private pingTimer: ReturnType<typeof setTimeout> | null = null;
  private deadTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly PING_INTERVAL = 35000; // 35s
  private readonly DEAD_TIMEOUT = 60000; // 60s

  constructor(
    private readonly sendFrame: (frame: Omit<MonkeyFrame, 'version'>) => void,
    private readonly onDeadTimeout: () => void,
  ) {}

  /**
   * Starts or resets the heartbeat timers.
   *
   * This method should be invoked immediately after the connection is established and the authentication (AUTH) is successful. It begins the countdown for both the PING interval and the dead connection timeout.
   *
   * @public
   * @returns {void}
   */
  public start() {
    this.resetTimers();
  }

  /**
   * Stops all running heartbeat timers.
   *
   * Call this method when the connection is intentionally closed or while waiting to reconnect to prevent memory leaks and unnecessary heartbeat checks.
   *
   * @public
   * @returns {void}
   */
  public stop() {
    if (this.pingTimer) {
      clearTimeout(this.pingTimer);
      this.pingTimer = null;
    }
    if (this.deadTimer) {
      clearTimeout(this.deadTimer);
      this.deadTimer = null;
    }
  }

  /**
   * Handles implicit heartbeat behavior by resetting the timers upon any network activity.
   *
   * Any incoming or outgoing activity should invoke this method to delay the next PING frame and reset the dead connection countdown. It only takes effect if the heartbeat manager is currently active.
   *
   * @public
   * @returns {void}
   */
  public onActivity() {
    if (this.deadTimer !== null) {
      this.resetTimers();
    }
  }

  /**
   * Handles a specific incoming PING command from the server.
   *
   * When a PING is received, this method registers the activity to reset the timers and immediately dispatches a PONG frame back to the server to acknowledge the heartbeat.
   *
   * @public
   * @returns {void}
   */
  public onReceivePing() {
    this.onActivity();
    this.sendFrame({
      cmd: Cmd.PONG,
      flags: Flags.NONE,
      reqId: 0,
      length: 0,
      payload: new Uint8Array(),
    });
  }

  /**
   * Resets the internal heartbeat timers.
   *
   * This method clears any currently running timers and starts them fresh. It schedules a PING frame
   * to be sent after the `PING_INTERVAL`, and sets up a dead connection timeout that will trigger
   * if no further activity is detected within the `DEAD_TIMEOUT`.
   *
   * @private
   * @returns {void}
   */
  private resetTimers() {
    this.stop();

    this.pingTimer = setTimeout(() => {
      this.sendFrame({
        cmd: Cmd.PING,
        flags: Flags.NONE,
        reqId: 0,
        length: 0,
        payload: new Uint8Array(),
      });
    }, this.PING_INTERVAL);

    this.deadTimer = setTimeout(() => {
      this.onDeadTimeout();
    }, this.DEAD_TIMEOUT);
  }
}
