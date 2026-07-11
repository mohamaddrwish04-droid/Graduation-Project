import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { loginRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
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

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                overflow: "hidden",
                background: "#0F111A",
            }}
        >
            {/* Left Side */}
            <Box
                sx={{
                    flex: 1,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    overflow: "hidden",
                    background: "linear-gradient(135deg,#0F111A,#1A1D2E)",
                }}
            >
                {/* Glow 1 */}
                <Box
                    sx={{
                        position: "absolute",
                        width: 350,
                        height: 350,
                        borderRadius: "50%",
                        background: "#2F6BFF",
                        filter: "blur(120px)",
                        opacity: 0.3,
                        top: -50,
                        left: -50,
                    }}
                />

                {/* Glow 2 */}
                <Box
                    sx={{
                        position: "absolute",
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        background: "#6C63FF",
                        filter: "blur(120px)",
                        opacity: 0.3,
                        bottom: -50,
                        right: -50,
                    }}
                />

                {/* Logo */}
                <Box
                    component="img"
                    src="/logo.png"
                    alt="logo"
                    sx={{
                        width: 240,
                        mb: 10,
                        zIndex: 2,
                        filter: "drop-shadow(0 10px 25px rgba(47,107,255,.35))",
                    }}
                />

                <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{
                        color: "#fff",
                        zIndex: 2,
                        textAlign: "center",
                    }}
                >
                    FixIt Admin
                </Typography>

                <Typography
                    sx={{
                        mt: 2,
                        color: "rgba(255,255,255,.8)",
                        textAlign: "center",
                        maxWidth: 450,
                        zIndex: 2,
                        fontSize: 18,
                    }}
                >
                    إدارة الطلبات ومقدمي الخدمات
                    والاشتراكات من مكان واحد.
                </Typography>
            </Box>

            {/* Right Side */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 4,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: 500,
                        p: 5,
                        borderRadius: 1,
                        background: "rgba(26,29,46,.95)",
                        border: "1px solid rgba(255,255,255,.08)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 20px 60px rgba(0,0,0,.35)",
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                            mb: 4,
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >
                            تسجيل الدخول
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            قم بإدخال بيانات المدير
                            للوصول إلى لوحة التحكم
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        label="البريد الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "14px",
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="primary" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="كلمة المرور"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "14px",
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "flex-end",
                            mb: 4,
                        }}
                    >
                        <Typography
                            color="primary"
                            sx={{
                                cursor: "pointer",
                                fontWeight: 600,
                            }}
                        >
                            نسيت كلمة المرور؟
                        </Typography>
                    </Box>

                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress
                                size={24}
                                color="inherit"
                            />
                        ) : (
                            "تسجيل الدخول"
                        )}
                    </Button>
                </Paper>
            </Box>


            <Snackbar
                open={!!error}
                autoHideDuration={3000}
                onClose={() =>
                    setError("")
                }
            >
                <Alert severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Login;