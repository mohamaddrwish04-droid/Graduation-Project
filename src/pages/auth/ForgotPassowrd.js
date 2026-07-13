import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    InputAdornment,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import "./auth.css";
import { useForgotPassword } from "./useForgotPassword";

function ForgotPassword() {
 const{
        handleSubmit, email, setEmail,
        error, navigate, loading,setError
    } = useForgotPassword();


    return (
        <Box id="Box-container">
            {/* Right Side */}

            <Box id="right-side"
                sx={{p: 4,}}
            >
                <Paper id="paper"
                    elevation={0}
                    sx={{p: 5,}}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        نسيت كلمة المرور
                    </Typography>

                    <Typography
                        color="text.secondary"
                        textAlign="center"
                        sx={{
                            mt: 1,
                            mb: 4,
                        }}
                    >
                        أدخل بريدك الإلكتروني
                        لإرسال رمز التحقق.
                    </Typography>

                    <TextField
                        fullWidth
                        label="البريد الإلكتروني"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        sx={{ mb: 4 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
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
                            "إرسال رمز التحقق"
                        )}
                    </Button>

                    <Button
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        العودة لتسجيل الدخول
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

export default ForgotPassword;