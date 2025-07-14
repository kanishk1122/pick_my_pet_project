import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store";
import { UserProvide } from "./utils/Usercontext";
import { SwalProvider } from "./utils/Customswal";
import App from "./App.jsx";
import "./index.css";
import "animate.css";
import "./swal.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <UserProvide>
            <SwalProvider>
              <App />
            </SwalProvider>
          </UserProvide>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
