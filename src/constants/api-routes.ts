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
    ME: '/api/users/me',
  },
  MESSAGES: {
    SYNC: '/api/messages/sync',
  },
  GROUPS: {
    CREATE: '/api/groups/create',
    LIST: '/api/groups/list',
  },
} as const;
