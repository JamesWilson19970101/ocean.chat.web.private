export interface UserProfile {
  _id: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  deviceId: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserProfile;
}

export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
