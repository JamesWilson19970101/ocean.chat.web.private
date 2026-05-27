import { AxiosRequestConfig } from 'axios';
import { v7 as uuidv7 } from 'uuid';

import { API_ROUTES } from '@/constants/api-routes';
import { CreateRoomDto, CreateRoomResponse } from '@/types/chat';

import { httpClient } from './client';
export const groupService = {
  /**
   * Fetch all groups/rooms for the current authenticated user.
   */
  getGroups: async (): Promise<CreateRoomResponse[]> => {
    // Note: The authorization header is automatically attached by the httpClient interceptor.
    const response = await httpClient.get<CreateRoomResponse[]>(
      API_ROUTES.GROUPS.LIST,
    );
    return response.data;
  },

  createRoom: async (
    data: CreateRoomDto,
    config?: AxiosRequestConfig,
  ): Promise<CreateRoomResponse> => {
    const idempotencyKey = uuidv7();
    const response = await httpClient.post<CreateRoomResponse>(
      API_ROUTES.GROUPS.CREATE,
      data,
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
