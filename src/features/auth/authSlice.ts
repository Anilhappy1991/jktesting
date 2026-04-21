import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, LoginResponse } from "./authTypes"
import { authApi } from "./authApi"

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,

    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { accessToken, refreshToken, ...user } = action.payload
      state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.isAuthenticated = true
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          const { accessToken, refreshToken, ...user } = payload
          state.user = user
          state.accessToken = accessToken
          state.refreshToken = refreshToken
          state.isAuthenticated = true
        }
      )
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        state.isAuthenticated = false
      })
    // ✅ removed logout matcher — logout is a local reducer action only
  },
})

export const { logout, setCredentials } = authSlice.actions
