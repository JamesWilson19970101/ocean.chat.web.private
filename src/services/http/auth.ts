import { AxiosRequestConfig } from 'axios';
import { v7 as uuidv7 } from 'uuid';

import { API_ROUTES } from '@/constants/api-routes';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenResponse,
} from '@/types/auth';

import { httpClient } from './client';

export const authService = {
  login: async (
    data: LoginRequest,
    config?: AxiosRequestConfig,
  ): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      data,
      config,
    );
    return response.data;
  },

  register: async (
    data: RegisterRequest,
    config?: AxiosRequestConfig,
  ): Promise<void> => {
    const idempotencyKey = uuidv7();
    await httpClient.post<unknown, unknown, RegisterRequest>(
      API_ROUTES.AUTH.REGISTER,
      data,
      {
        ...config,
        headers: {
          ...config?.headers,
          'Idempotency-Key': idempotencyKey, // TODO: use `const idempotencyKey = md5(JSON.stringify(data));` generate idempotency key
        },
      },
    );
  },

  refresh: async (
    config?: AxiosRequestConfig,
  ): Promise<RefreshTokenResponse> => {
    const response = await httpClient.post<RefreshTokenResponse>(
      API_ROUTES.AUTH.REFRESH,
      {},
      config,
    );
    return response.data;
  },

  logout: async (config?: AxiosRequestConfig): Promise<void> => {
    await httpClient.post(API_ROUTES.AUTH.LOGOUT, {}, config);
  },
};
