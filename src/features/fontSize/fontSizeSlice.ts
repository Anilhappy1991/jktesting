import { createSlice } from "@reduxjs/toolkit"

type FontSizeKey = "small" | "medium" | "large"

interface FontSizeState {
  fontSize: FontSizeKey
  value: number
}

const FONT_SIZES: Record<FontSizeKey, number> = {
  small: 14,
  medium: 16,
  large: 18,
}

const initialState: FontSizeState = {
  fontSize: "medium",
  value: FONT_SIZES["medium"],
}

const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState,
  reducers: {
    increase: (state) => {
      if (state.fontSize !== "large") {
        state.fontSize = "large"
        state.value = FONT_SIZES["large"]
      }
    },
    decrease: (state) => {
      if (state.fontSize !== "small") {
        state.fontSize = "small"
        state.value = FONT_SIZES["small"]
      }
    },
    reset: (state) => {
      state.fontSize = "medium"
      state.value = FONT_SIZES["medium"]
    },
  },
})

export const { increase, decrease, reset } = fontSizeSlice.actions
export default fontSizeSlice
