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
import { verifyToken, setLoading } from "./store/slices/userSlice";
import Cookies from "js-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
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
};

// Immediately Invoked Function Expression (IIFE) to handle async logic
(async () => {
  // On app start, check if the user is authenticated and verify the token
  if (Cookies.get("is_authenticated") === "true") {
    // Wait for the token verification to complete before rendering
    await store.dispatch(verifyToken());
  } else {
    // If no cookie, ensure loading is set to false
    store.dispatch(setLoading(false));
  }

  // Now render the app with the potentially updated state
  renderApp();
})();
