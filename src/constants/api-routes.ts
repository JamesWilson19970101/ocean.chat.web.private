/**
 * Centralized API route definitions for Ocean Chat.
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
  },
  USERS: {
    ALL: '/api/users/all',
  },
  MESSAGES: {
    SYNC: '/v1/messages/sync',
  },
  GROUPS: {
    CREATE: '/api/groups/create',
  },
} as const;
