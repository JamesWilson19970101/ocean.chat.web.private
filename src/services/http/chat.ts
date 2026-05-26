import { AxiosRequestConfig } from 'axios';
import { v7 as uuidv7 } from 'uuid';

import { API_ROUTES } from '@/constants/api-routes';
import { CreateRoomDto, CreateRoomResponse } from '@/types/chat';

import { httpClient } from './client';

export const chatService = {
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
