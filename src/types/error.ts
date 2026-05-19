/**
 * Matches the backend ErrorResponseDto format for HTTP APIs.
 */
export interface BackendErrorResponse {
  statusCode: number;
  timestamp: string;
  errorCode: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>;
  path?: string;
}

/**
 * Matches the backend ExceptionAck Protobuf structure (Command 0x0C).
 * Used for WebSocket error events.
 */
export interface MonkeyExceptionAck {
  errorCode: number;
  message: string;
  timestamp: string;
  serverSupportedVersions?: string[];
}

/**
 * Standardized application error object abstracted for the frontend.
 * This unifies HTTP and WebSocket errors.
 */
export interface StandardizedAppError {
  errorCode: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>;
}
