import axios, { AxiosError, AxiosResponse } from 'axios';

import { ErrorCodes } from '@/constants/error-codes';
import { globalErrorDispatcher } from '@/lib/errors/error-dispatcher';
import { BackendErrorResponse } from '@/types/error';

/**
 * Standard HTTP Client using Axios.
 * Includes global interceptors for unified error handling.
 */
export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
});

// Response interceptor
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<BackendErrorResponse>) => {
    // Check if we have a structured backend error response
    if (error.response && error.response.data && error.response.data.errorCode) {
      const { errorCode, message, details } = error.response.data;

      /**
       * Note: Server-side redirection (401/403) is now handled by middleware.ts.
       * This interceptor focuses on dispatching errors for Client Components
       * and providing basic server-side logging.
       */
      globalErrorDispatcher.dispatch(errorCode, message, details);
    } else {
      // Map generic network/system errors
      const systemErrorCode = ErrorCodes.SERVICE_ERROR;
      let systemMessageKey = 'Errors.unexpected';

      if (error.code === 'ECONNABORTED') {
        systemMessageKey = 'Errors.requestTimeout';
      } else if (!error.response) {
        systemMessageKey = 'Errors.networkDisconnected';
      }

      globalErrorDispatcher.dispatch(systemErrorCode, systemMessageKey, {
        originalError: error,
      });
    }

    // Always reject the promise to allow localized catch handling
    return Promise.reject(error);
  }
);
