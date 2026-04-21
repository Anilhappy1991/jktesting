export interface LoginRequest {
  username: string
  password: string
  expiresInMins?: number
}

export interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface AuthState {
  user: Omit<LoginResponse, "accessToken" | "refreshToken"> | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}
