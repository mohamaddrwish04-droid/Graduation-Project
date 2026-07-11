import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import "./i18n";

import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { LanguageProvider } from "./context/LanguageContext";
import rtlCache from "./styles/rtlCache";
import { CustomThemeProvider } from "./context/ThemeContext";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CacheProvider value={rtlCache}>
      <LanguageProvider>
        <CustomThemeProvider>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </CustomThemeProvider>
      </LanguageProvider>
    </CacheProvider>
  </React.StrictMode>
);