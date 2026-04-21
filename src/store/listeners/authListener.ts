import { startAppListening } from "./listenerMiddleware"
import { authSlice } from "@/features/auth/authSlice"
import { baseApi } from "@/api/baseApi"

// When user logs out, wipe the entire RTK Query cache
startAppListening({
  actionCreator: authSlice.actions.logout,
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(baseApi.util.resetApiState())
  },
})
