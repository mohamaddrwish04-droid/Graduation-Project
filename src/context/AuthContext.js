import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser): null;
    });

    const login = (authData) => {

        const decoded = jwtDecode(authData.accessToken);

        const userData = {
            accessToken:
                authData.accessToken,

            refreshToken:
                authData.refreshToken,

            userId:
                decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                ],

            name:
                decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ],

            email:
                decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
                ],

            role:
                decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ],
        };

        setUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "accessToken",
            authData.accessToken
        );

        localStorage.setItem(
            "refreshToken",
            authData.refreshToken
        );
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated:
            !!localStorage.getItem("accessToken"),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);