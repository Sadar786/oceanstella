// src/main.jsx

import AuthInit from "./components/AuthInit";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistore } from "./redux/store"; // your combined store file
import App from "./App";
 import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <AuthInit>
        <App />
      </AuthInit>
    </PersistGate>
  </Provider>
);
