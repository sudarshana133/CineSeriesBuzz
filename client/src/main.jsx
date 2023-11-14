import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CategoryContextProvider from "./context/categoryContext/CategoryContextProvider.jsx";
import SearchContextProvider from "./context/searchContext/SearchContextProvider.jsx";
import UserAuthContextProvider from "./context/userAuthContext/UserAuthContextProvider.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <CategoryContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </CategoryContextProvider>
    </UserAuthContextProvider>
  </React.StrictMode>
);
