export interface User {
  email: string;
  password: string;
  phoneNumber: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}
