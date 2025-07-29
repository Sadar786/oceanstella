import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Theme/themeSlice.jsx";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
