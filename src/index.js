import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import store, { persistor } from "./store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeContextWrapper from "./utils/ThemeContextWrapper";
import reportWebVitals from "./screens/device/LiveComponent/reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
  </ThemeContextWrapper>
);
reportWebVitals()