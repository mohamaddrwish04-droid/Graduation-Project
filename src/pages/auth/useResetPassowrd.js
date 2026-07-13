
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { resetPasswordRequest } from "../../services/authService";


export function useResetPassowrd() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setError("كلمتا المرور غير متطابقتين");
            return;
        }
        try {
            setLoading(true);
            await resetPasswordRequest(email, code, password);
            navigate("/");
        } catch (err) {
            setError(
                err.message
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSubmit, error, loading, setLoading,
        showPassword, setShowPassword, password,
        setPassword, confirmPassword, setConfirmPassword,
        code, setCode, email, navigate, location,setError
    }
}