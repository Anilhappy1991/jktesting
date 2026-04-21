export const AUTH_DEFAULTS = {
  expiresInMins: 30,
  credentials: "include" as RequestCredentials,
} as const

export const AUTH_MESSAGES = {
  loginSuccess: "Login successful",
  loginFailed: "Invalid username or password",
  logoutSuccess: "Logged out successfully",
  sessionExpired: "Session expired, please login again",
  unauthorized: "You are not authorized to perform this action",
} as const
