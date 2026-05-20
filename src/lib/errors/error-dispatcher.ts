import { ErrorCodes } from '@/constants/error-codes';

import { appEventBus } from '../event-bus';

/**
 * Strategy handler function definition.
 */
export type ErrorHandlerFn = (
  message: string,
  details?: Record<string, unknown>,
) => void;

/**
 * Type for a translation function that takes a key and returns a string.
 */
export type TranslatorFn = (key: string) => string;

/**
 * Global Error Dispatcher using the Strategy Pattern.
 * Centralized error handler for both HTTP and WebSocket layers.
 * Designed to ensure Isomorphic Error Handling and high extensibility.
 */
class GlobalErrorDispatcher {
  private handlers: Map<number, ErrorHandlerFn> = new Map();
  private translator: TranslatorFn | null = null;

  constructor() {
    this.registerDefaultStrategies();
  }

  /**
   * Injects a translator function (e.g., from next-intl) to resolve error keys.
   */
  public setTranslator(translator: TranslatorFn): void {
    this.translator = translator;
  }

  /**
   * Helper to resolve a message key if a translator is available.
   * Uses a regex to strictly identify 'Errors.key' format to avoid
   * misinterpreting raw backend messages containing periods.
   */
  private resolveMessage(messageOrKey: string): string {
    const i18nKeyRegex = /^Errors\.([a-zA-Z0-9]+)$/;
    const match = messageOrKey.match(i18nKeyRegex);

    if (this.translator && match) {
      const key = match[1];
      return this.translator(key);
    }
    return messageOrKey;
  }

  /**
   * Registers a specific strategy for a given error code.
   * @param errorCode The business error code (e.g., from ErrorCodes enum)
   * @param handler The strategy function to execute
   */
  public register(errorCode: number, handler: ErrorHandlerFn): void {
    this.handlers.set(errorCode, handler);
  }

  /**
   * Sanitizes details for server-side logging to avoid leaking sensitive information.
   */
  private sanitizeDetails(details?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (!details) return undefined;
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const { config, request, response, ...safeDetails } = details as any;
    return safeDetails;
  }

  /**
   * Dispatches the error to the registered strategy, or a default fallback.
   * Only executes side effects (EventBus/Toast) in the client environment.
   */
  public dispatch(
    errorCode: number,
    message: string,
    details?: Record<string, unknown>,
  ): void {
    const resolvedMessage = this.resolveMessage(message);

    // Only execute UI/Routing side effects in the browser
    if (typeof window === 'undefined') {
      const safeDetails = this.sanitizeDetails(details);
      console.error(
        `[Server Error] Code: ${errorCode}, Msg: ${resolvedMessage}`,
        safeDetails,
      );
      return;
    }

    const handler = this.handlers.get(errorCode);
    if (handler) {
      handler(resolvedMessage, details);
    } else {
      this.defaultFallbackHandler(errorCode, resolvedMessage, details);
    }
  }

  /**
   * Built-in default strategies that come out-of-the-box.
   */
  private registerDefaultStrategies(): void {
    // 401 Unauthorized / Token Revoked -> Trigger Global Logout
    const authErrorHandler: ErrorHandlerFn = (msg) => {
      console.warn(`[Auth Error]: ${msg}. Triggering logout...`);
      appEventBus.emit('auth:logout', undefined);
    };

    this.register(ErrorCodes.UNAUTHORIZED, authErrorHandler);
    this.register(ErrorCodes.TOKEN_REVOKED, authErrorHandler);
    this.register(ErrorCodes.WS_CLOSE_HANDSHAKE_TIMEOUT, authErrorHandler);

    // 426 Protocol Mismatch -> Trigger Force Update
    this.register(426, (msg) => {
      console.error(`[Protocol Error]: ${msg}. Triggering force update...`);
      appEventBus.emit('protocol:force-update', undefined);
    });

    // Rate Limit Exceeded
    this.register(ErrorCodes.RATE_LIMIT_EXCEEDED, (msg) => {
      // NOTE: Replace with your actual UI Toast library (e.g., react-hot-toast)
      console.error(`[Rate Limit Toast]: ${msg}`);
      // toast.error(msg || "Too many requests. Please try again later.");
    });
  }

  /**
   * The fallback behavior when no specific strategy is registered.
   */
  private defaultFallbackHandler(
    errorCode: number,
    message: string,
    details?: Record<string, unknown>,
  ): void {
    if (typeof window !== 'undefined') {
      console.error(
        `[Unhandled Error Toast] Code ${errorCode}: ${message}`,
        details,
      );
    } else {
      const safeDetails = this.sanitizeDetails(details);
      console.error(
        `[Unhandled Server Error] Code ${errorCode}: ${message}`,
        safeDetails,
      );
    }
  }
}

// Singleton instance
export const globalErrorDispatcher = new GlobalErrorDispatcher();
