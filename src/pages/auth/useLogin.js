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

            const authData = await loginRequest(
                email,
                password
            );

            await login(authData);

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
        error, setError, handleLogin
    }
}