import { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "ar"
    );
    useEffect(() => {
        document.documentElement.lang =
            language;

        document.documentElement.dir =
            language === "ar"
                ? "rtl"
                : "ltr";
    }, [language]);

    const changeLanguage = (lang) => {
        setLanguage(lang);

        i18n.changeLanguage(lang);

        localStorage.setItem(
            "language",
            lang
        );
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                changeLanguage,
                direction:
                    language === "ar"
                        ? "rtl"
                        : "ltr",
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () =>
    useContext(LanguageContext);