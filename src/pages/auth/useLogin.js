import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { loginRequest } from "../../services/authService";


export function useLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const user = await loginRequest(email, password);
            const decoded = jwtDecode(
                user.accessToken
            );

            const role =
                decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];

            if (role !== "Admin") {
                throw new Error(
                    "ليس لديك صلاحية الدخول إلى لوحة التحكم"
                );
            }

            login(user);

            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        navigate, login, email, setEmail,
        password, setPassword, showPassword,
        setShowPassword, loading, setLoading,
        error, setError ,handleLogin
    }
}