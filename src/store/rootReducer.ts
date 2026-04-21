import { combineReducers } from "@reduxjs/toolkit"
import { baseApi } from "@/api/baseApi"
import { authSlice } from "@/features/auth/authSlice"
import fontSizeSlice from "@/features/fontSize/fontSizeSlice"

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice.reducer,
  FontSize: fontSizeSlice.reducer,
})

//  Derive RootState here from rootReducer — NOT from store
export type RootState = ReturnType<typeof rootReducer>
