import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "../services/profileService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (authData) => {

        localStorage.setItem(
            "accessToken",
            authData.accessToken
        );

        localStorage.setItem(
            "refreshToken",
            authData.refreshToken
        );

        const currentUser = await getCurrentUser();

        const userData = {
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,  
            userId: currentUser.userId,
            fullName: currentUser.fullName,
            email: currentUser.email,
            phoneNumber: currentUser.phoneNumber,
            role: currentUser.role,
            profileImageUrl: currentUser.profileImageUrl,
        };

        setUser(userData);
        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );
    };

    const logout = () => {
        setUser(null);

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };
    const updateUser = (newUserData) => {
        setUser(newUserData);
        localStorage.setItem(
            "user",
            JSON.stringify(newUserData)
        );
    };

    const value = {
        user,
        login,
        logout,
        updateUser,
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