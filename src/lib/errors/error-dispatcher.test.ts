/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ErrorCodes } from '@/constants/error-codes';

import { appEventBus } from '../event-bus';

import { globalErrorDispatcher } from './error-dispatcher';

describe('GlobalErrorDispatcher', () => {
  const originalWindow = global.window;
  let consoleErrorSpy: any;
  let consoleWarnSpy: any;

  beforeEach(() => {
    // Ensure we are in a simulated "Client" environment for most tests
    if (typeof window === 'undefined') {
      global.window = {} as any;
    }

    // Silence expected console outputs to keep test logs clean
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Reset translator before each test
    globalErrorDispatcher.setTranslator(null as any);
  });

  afterEach(() => {
    // Restore window
    global.window = originalWindow;
    vi.restoreAllMocks();
  });

  it('should resolve i18n keys when a translator is provided', () => {
    const mockT = vi.fn((key) => `Translated: ${key}`);
    globalErrorDispatcher.setTranslator(mockT);

    const emitSpy = vi.spyOn(appEventBus, 'emit');

    // Using a key format 'Namespace.key'
    globalErrorDispatcher.dispatch(ErrorCodes.UNAUTHORIZED, 'Errors.authError');

    expect(mockT).toHaveBeenCalledWith('authError');
    expect(emitSpy).toHaveBeenCalledWith('auth:logout', undefined);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[Auth Error]: Translated: authError'),
    );
  });

  it('should emit auth:logout event for UNAUTHORIZED error', () => {
    const emitSpy = vi.spyOn(appEventBus, 'emit');

    globalErrorDispatcher.dispatch(
      ErrorCodes.UNAUTHORIZED,
      'Unauthorized message',
    );

    expect(emitSpy).toHaveBeenCalledWith('auth:logout', undefined);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[Auth Error]: Unauthorized message'),
    );
  });

  it('should execute registered custom strategies', () => {
    const customHandler = vi.fn();
    const CUSTOM_CODE = 99999;

    globalErrorDispatcher.register(CUSTOM_CODE, customHandler);
    globalErrorDispatcher.dispatch(CUSTOM_CODE, 'Custom error', {
      context: 'test',
    });

    expect(customHandler).toHaveBeenCalledWith('Custom error', {
      context: 'test',
    });
  });

  it('should fallback to default error console when window is undefined (Server environment)', () => {
    // Simulate Next.js Server Components environment
    (global as any).window = undefined;

    globalErrorDispatcher.dispatch(
      ErrorCodes.UNAUTHORIZED,
      'Server environment error',
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[Server Error] Code: 10030, Msg: Server environment error',
      undefined,
    );

    // Verify side-effects don't run on the server
    const emitSpy = vi.spyOn(appEventBus, 'emit');
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should fallback to default handler if no strategy is registered', () => {
    const UNKNOWN_CODE = 88888;

    globalErrorDispatcher.dispatch(UNKNOWN_CODE, 'Unknown error occurred');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `[Unhandled Error Toast] Code ${UNKNOWN_CODE}: Unknown error occurred`,
      undefined,
    );
  });
});
