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

import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./auth.css";
import { useResetPassowrd } from "./useResetPassowrd";


function ResetPassword() {

    const {
        handleSubmit, error, loading,setError,
        showPassword, setShowPassword, password,
        setPassword, confirmPassword, setConfirmPassword,
        code, setCode, email,
    } = useResetPassowrd();



    return (
        <Box id="Box-container">


            {/* Right Side */}
            <Box id="right-side"
                sx={{ p: 4 }}
            >
                <Paper id="paper"
                    elevation={0}
                    sx={{ p: 4, }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        إعادة تعيين كلمة المرور
                    </Typography>

                    <Typography
                        color="text.secondary"
                        textAlign="center"
                        sx={{
                            mt: 1,
                            mb: 2,
                        }}
                    >
                        تم إرسال رمز التحقق إلى
                    </Typography>

                    <Typography
                        textAlign="center"
                        fontWeight="bold"
                        sx={{ mb: 3 }}
                    >
                        {email}
                    </Typography>

                    <TextField
                        fullWidth
                        label="رمز التحقق"
                        value={code}
                        onChange={(e) =>
                            setCode(
                                e.target.value
                            )
                        }
                        sx={{ mb: 3 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon color="primary" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="كلمة المرور الجديدة"
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        sx={{ mb: 3 }}
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
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                        >
                                            {showPassword
                                                ? <VisibilityOff />
                                                : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="تأكيد كلمة المرور"
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        sx={{ mb: 4 }}
                    />

                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress
                                size={24}
                                color="inherit"
                            />
                        ) : (
                            "تغيير كلمة المرور"
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

export default ResetPassword;