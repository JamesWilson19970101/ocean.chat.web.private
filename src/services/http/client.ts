import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { API_ROUTES } from '@/constants/api-routes';
import { ErrorCodes } from '@/constants/error-codes';
import { globalErrorDispatcher } from '@/lib/errors/error-dispatcher';
import { appEventBus } from '@/lib/event-bus';
import { useAuthStore } from '@/store/useAuthStore';
import { RefreshTokenResponse } from '@/types/auth';
import { BackendErrorResponse } from '@/types/error';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipGlobalErrorHandler?: boolean;
  }
}

/**
 * Standard HTTP Client using Axios.
 * Includes global interceptors for unified error handling.
 */
export const httpClient = axios.create({
  baseURL: '',
  timeout: 10000,
});

// Flag to prevent multiple concurrent refresh requests
let isRefreshing = false;
// Queue to hold requests while token is refreshing
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor: Inject Access Token
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: Handle 401 & Global Errors
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<BackendErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - Token Expiration
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Prevent infinite loops if the refresh endpoint itself returns 401
      if (originalRequest.url === API_ROUTES.AUTH.REFRESH) {
        if (!originalRequest.skipGlobalErrorHandler) {
          globalErrorDispatcher.dispatch({
            errorCode: ErrorCodes.UNAUTHORIZED,
            message: 'Errors.authError',
            source: 'http',
          });
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If already refreshing, queue the request
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
          }
          return httpClient(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      // Start token refresh
      originalRequest._retry = true;
      isRefreshing = true;

      // Retry based on whether the error returned by the backend contains the isRetriable field.
      try {
        // The refresh token is an HttpOnly cookie, so we don't need to pass it explicitly in the body,
        // but we must ensure credentials (cookies) are sent.
        const response = await axios.post<RefreshTokenResponse>(
          `${httpClient.defaults.baseURL}${API_ROUTES.AUTH.REFRESH}`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = response.data.accessToken;

        // Update the in-memory store
        useAuthStore.getState().setAccessToken(newAccessToken);

        // Process all queued requests with the new token
        processQueue(null, newAccessToken);

        // Retry the original request
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed (e.g., refresh token expired)
        processQueue(refreshError, null);
        globalErrorDispatcher.dispatch({
          errorCode: ErrorCodes.TOKEN_REVOKED,
          message: 'Errors.refreshTokenError',
          source: 'http',
        });

        // Let the normal error dispatcher handle the final rejection
      } finally {
        isRefreshing = false;
      }
    }

    // Check if we have a structured backend error response
    if (
      error.response &&
      error.response.data &&
      error.response.data.errorCode
    ) {
      const { errorCode, message, details } = error.response.data;

      /**
       * Note: Server-side redirection (401/403) is now handled by middleware.ts.
       * This interceptor focuses on dispatching errors for Client Components
       * and providing basic server-side logging.
       */
      if (!originalRequest?.skipGlobalErrorHandler) {
        globalErrorDispatcher.dispatch({
          errorCode,
          message,
          details,
          source: 'http',
        });
      }
    } else {
      // Map generic network/system errors
      const systemErrorCode = ErrorCodes.SERVICE_ERROR;
      let systemMessageKey = 'Errors.service';

      if (error.code === 'ECONNABORTED') {
        systemMessageKey = 'Errors.requestTimeout';
      } else if (!error.response) {
        systemMessageKey = 'Errors.networkDisconnected';
      }

      if (!originalRequest?.skipGlobalErrorHandler) {
        globalErrorDispatcher.dispatch({
          errorCode: systemErrorCode,
          message: systemMessageKey,
          details: {
            originalError: error,
          },
          source: 'http',
        });
      }
    }

    // Always reject the promise to allow localized catch handling
    return Promise.reject(error);
  },
);
