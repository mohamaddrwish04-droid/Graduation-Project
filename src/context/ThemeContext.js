import {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useLanguage } from "./LanguageContext";
import getTheme from "../styles/muiTheme";

const ThemeContext = createContext();

export function CustomThemeProvider({ children,}) {
    const [mode, setMode] = useState(
        localStorage.getItem("theme") ||
        "dark"
    );
    const { direction } = useLanguage();

    const toggleTheme = () => {
        const newMode =
            mode === "dark"
                ? "light"
                : "dark";

        setMode(newMode);

        localStorage.setItem(
            "theme",
            newMode
        );
    };

    const theme = useMemo(
        () => getTheme(mode, direction),
        [mode, direction]
    );

    return (
        <ThemeContext.Provider
            value={{
                mode,
                toggleTheme,
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () =>
    useContext(ThemeContext);