/**
 * Core backend business status codes and WebSocket specific disconnect codes.
 * Aligned with the Monkey Protocol backend implementation.
 */
export enum ErrorCodes {
  UNAUTHORIZED = 10030,
  TOKEN_REVOKED = 10031,
  RATE_LIMIT_EXCEEDED = 42900,
  SERVICE_ERROR = 50300,
  IDEMPOTENCY_CONFLICT = 10050,
  
  // WebSocket specific disconnect codes
  WS_CLOSE_SERVICE_RESTART = 1012, // Backend gateway restarted
  WS_CLOSE_HANDSHAKE_TIMEOUT = 4008, // WebSocket handshake timeout
}
