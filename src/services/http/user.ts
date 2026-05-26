import { AxiosRequestConfig } from 'axios';
import { v7 as uuidv7 } from 'uuid';

import { API_ROUTES } from '@/constants/api-routes';
import { UserProfile } from '@/types/auth';

import { httpClient } from './client';

export const userService = {
  getAllUsers: async (
    config?: AxiosRequestConfig,
  ): Promise<UserProfile[]> => {
    const idempotencyKey = uuidv7();
    const response = await httpClient.get<UserProfile[]>(
      API_ROUTES.USERS.ALL,
      {
        ...config,
        headers: {
          ...config?.headers,
          'idempotency-key': idempotencyKey,
        },
      },
    );
    return response.data;
  },
};
