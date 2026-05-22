/**
 * Lightweight, strictly-typed EventBus for cross-component communication.
 * Used to decouple the underlying networking layers from React UI components.
 */

export type AppEventMap = {
  'auth:logout': void;
  'protocol:force-update': void;
  // Add other events here as needed
};

type EventHandler<T> = (payload: T) => void;

export type TranslatorFn = (
  key: string,
  values?: Record<string, string | number>,
) => string;

class EventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handlers: Map<keyof AppEventMap, EventHandler<any>[]> = new Map();

  private translator: TranslatorFn | null = null;

  public setTranslator(translator: TranslatorFn): void {
    this.translator = translator;
  }

  private t(
    key: string,
    fallback: string,
    values?: Record<string, string | number>,
  ): string {
    if (this.translator) return this.translator(key, values);
    let result = fallback;
    if (values) {
      for (const [k, v] of Object.entries(values)) {
        result = result.replace(`{${k}}`, String(v));
      }
    }
    return result;
  }

  /**
   * Subscribes to an event.
   * @param event The event name
   * @param handler The callback to execute
   * @returns A cleanup function to unsubscribe
   */
  on<K extends keyof AppEventMap>(
    event: K,
    handler: EventHandler<AppEventMap[K]>,
  ): () => void {
    const currentHandlers = this.handlers.get(event) || [];
    this.handlers.set(event, [...currentHandlers, handler]);

    // Return cleanup function
    return () => {
      this.off(event, handler);
    };
  }

  /**
   * Unsubscribes from an event.
   * @param event The event name
   * @param handler The callback to remove
   */
  off<K extends keyof AppEventMap>(
    event: K,
    handler: EventHandler<AppEventMap[K]>,
  ): void {
    const currentHandlers = this.handlers.get(event);
    if (currentHandlers) {
      const filtered = currentHandlers.filter((h) => h !== handler);
      if (filtered.length === 0) {
        this.handlers.delete(event);
      } else {
        this.handlers.set(event, filtered);
      }
    }
  }

  /**
   * Emits an event to all subscribers.
   * @param event The event name
   * @param payload The event payload
   */
  emit<K extends keyof AppEventMap>(event: K, payload: AppEventMap[K]): void {
    const currentHandlers = this.handlers.get(event);
    if (currentHandlers) {
      currentHandlers.forEach((handler) => {
        try {
          handler(payload);
        } catch (error) {
          const logMsg = this.t(
            'eventBusHandlerError',
            'Error in event handler for {event}:',
            { event: String(event) },
          );
          console.error(logMsg, error);
        }
      });
    }
  }
}

// Singleton instance
export const appEventBus = new EventBus();
