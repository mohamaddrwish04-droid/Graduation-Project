import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../../services/authService";





export function useForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleSubmit = async () => {
        try {

            setLoading(true);

            await forgotPasswordRequest(
                email
            );

            navigate(
                "/reset-password",
                {
                    state: {
                        email,
                    },
                }
            );

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }
    };

    return {
        handleSubmit, email, setEmail,
        error, navigate, loading,setError
    }
}