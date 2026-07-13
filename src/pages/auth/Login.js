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
import "./auth.css";
import { useLogin } from "./useLogin";


function Login() {
    const {
        navigate, email, setEmail,
        password, setPassword, showPassword,
        setShowPassword, loading,
        error, setError, handleLogin
    } = useLogin();

    return (
        <Box id="Box-container">
            <Box id="right-side"
                sx={{ p: 4, }}>
                <Paper id="paper"
                    elevation={0}
                    sx={{ p: 5, }}
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
                            onClick={() =>
                                navigate("/forgot-password")
                            }
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