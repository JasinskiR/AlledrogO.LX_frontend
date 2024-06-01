export interface User {
  email: string;
  password: string;
  phoneNumber: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
