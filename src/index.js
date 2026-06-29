import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";

import theme from "./styles/muiTheme";
import rtlCache from "./styles/rtlCache";
import {
    CustomThemeProvider,
} from "./context/ThemeContext";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CacheProvider value={rtlCache}>
      <CustomThemeProvider>
        <CssBaseline />

        <AuthProvider>
          <App />
        </AuthProvider>

      </CustomThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);