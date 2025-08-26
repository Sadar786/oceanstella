import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "light",  // default
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setDarkMode: (state) => {
      state.mode = "dark";
    },
    setLightMode: (state) => {
      state.mode = "light";
    },
  },
});

export const { toggleTheme, setDarkMode, setLightMode } = themeSlice.actions;
export default themeSlice.reducer;
