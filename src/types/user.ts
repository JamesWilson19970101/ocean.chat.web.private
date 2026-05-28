export enum UserType {
  USER = 'user',
  BOT = 'bot',
  GUEST = 'guest',
}
export enum UserStatus {
  ONLINE = 'online',
  AWAY = 'away',
  BUSY = 'busy',
  OFFLINE = 'offline',
}

export interface UserProfile {
  _id: string;
  username: string;
  type: UserType;
  active: boolean;
  status: UserStatus;
  roles: string[];
}
