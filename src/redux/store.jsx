import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/userSlice.js";
 import themeReducer from "./Theme/ThemeSlice.js"

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 2, // bump this to drop old 'shop' state from storage
  // optional: whitelist only what you want to persist
  // whitelist: ["user", "theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gdm) => gdm({ serializableCheck: false }),
});

export const persistore = persistStore(store);
