/**
 * Centralized application route constants.
 * Used for middleware, navigation, and breadcrumbs to ensure consistency.
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CHAT: '/chat',
  // Dynamic routes can be represented as functions
  CHAT_ROOM: (roomId: string) => `/chat/${roomId}`,
};

/**
 * Routes that require authentication.
 * Used by the middleware to determine protection levels.
 */
export const PROTECTED_ROUTES = [
  ROUTES.CHAT,
];

/**
 * Routes that are only accessible to unauthenticated users (e.g. login/register).
 */
export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];
