import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./rootReducer"
import { baseApi } from "@/api/baseApi"
import { listenerMiddleware } from "./listeners/listenerMiddleware"
// import '@/store/listeners'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault()
      .prepend(listenerMiddleware.middleware)
      .concat(baseApi.middleware),
})

//  AppDispatch comes from the store instance — correct place
export type AppDispatch = typeof store.dispatch

// Re-export RootState for convenience so others import from one place
export type { RootState } from "./rootReducer"
