/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ErrorCodes } from '@/constants/error-codes';
import { StandardizedAppError } from '@/types/error';

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
    const mockT = vi.fn((key, values) => {
      if (key === 'authError') return 'Translated: authError';
      if (key === 'authErrorLog') return `${values.msg}. Triggering logout...`;
      return `Translated: ${key}`;
    });
    globalErrorDispatcher.setTranslator(mockT);

    const emitSpy = vi.spyOn(appEventBus, 'emit');

    // Using a key format 'Namespace.key'
    globalErrorDispatcher.dispatch({
      errorCode: ErrorCodes.UNAUTHORIZED,
      message: 'Errors.authError',
      source: 'http',
    });

    expect(mockT).toHaveBeenCalledWith('authError');
    expect(emitSpy).toHaveBeenCalledWith('auth:logout', { force: true });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Translated: authError'),
    );
  });

  it('should emit auth:logout event for UNAUTHORIZED error', () => {
    const emitSpy = vi.spyOn(appEventBus, 'emit');

    globalErrorDispatcher.dispatch({
      errorCode: ErrorCodes.UNAUTHORIZED,
      source: 'http',
      message: 'Unauthorized message',
    });

    expect(emitSpy).toHaveBeenCalledWith('auth:logout', { force: true });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unauthorized message'),
    );
  });

  it('should execute registered custom strategies', () => {
    const customHandler = vi.fn();
    const CUSTOM_CODE = 99999;

    const error: StandardizedAppError = {
      errorCode: CUSTOM_CODE,
      message: 'Custom error',
      details: {
        context: 'test',
      },
      source: 'http',
    };

    globalErrorDispatcher.register(CUSTOM_CODE, customHandler);
    globalErrorDispatcher.dispatch(error);

    expect(customHandler).toHaveBeenCalledWith(error);
  });

  it('should fallback to default error console when window is undefined (Server environment)', () => {
    // Simulate Next.js Server Components environment
    (global as any).window = undefined;

    globalErrorDispatcher.dispatch({
      errorCode: ErrorCodes.UNAUTHORIZED,
      source: 'http',
      message: 'Server environment error',
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Code: 10030, Msg: Server environment error',
      undefined,
    );

    // Verify side-effects don't run on the server
    const emitSpy = vi.spyOn(appEventBus, 'emit');
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should fallback to default handler if no strategy is registered', () => {
    const UNKNOWN_CODE = 88888;

    globalErrorDispatcher.dispatch({
      errorCode: UNKNOWN_CODE,
      message: 'Unknown error occurred',
      source: 'http',
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `[Unhandled Error Toast] Code ${UNKNOWN_CODE}: Unknown error occurred`,
      undefined,
    );
  });
});
