



import {
    Box,
    Paper,
    Typography,
    Avatar,
    Button,
    Divider,
    Switch,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
} from "@mui/material";

import {
    Person,
    Lock,
    Logout,
    Close,
} from "@mui/icons-material";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

import { changePassword } from "../../services/authService";

export default function SettingsPage() {

    const { user, logout } = useAuth();

    const { mode, toggleTheme } =
        useThemeContext();

    const {
        language,
        changeLanguage,
    } = useLanguage();

    const [openDialog, setOpenDialog] =
        useState(false);

    const [currentPassword,
        setCurrentPassword] =
        useState("");

    const [newPassword,
        setNewPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const handleChangePassword =
        async () => {

            if (
                newPassword !==
                confirmPassword
            ) {
                alert(
                    "كلمتا المرور غير متطابقتين"
                );
                return;
            }

            try {

                await changePassword(
                    currentPassword,
                    newPassword
                );

                alert(
                    "تم تغيير كلمة المرور بنجاح"
                );

                setOpenDialog(false);

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

            } catch (error) {
                alert(error.message);
            }
        };

    return (
        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                الإعدادات
            </Typography>

            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                >
                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,
                        }}
                    >
                        <Person />
                    </Avatar>

                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            {user?.name}
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            {user?.email}
                        </Typography>

                        <Typography
                            color="primary"
                        >
                            {user?.role}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                >
                    المظهر واللغة
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <FormControlLabel
                    control={
                        <Switch
                            checked={
                                mode === "dark"
                            }
                            onChange={
                                toggleTheme
                            }
                        />
                    }
                    label="الوضع الداكن"
                />

                <Box mt={2}>
                    <Button
                        variant={
                            language === "ar"
                                ? "contained"
                                : "outlined"
                        }
                        onClick={() =>
                            changeLanguage(
                                "ar"
                            )
                        }
                    >
                        العربية
                    </Button>

                    <Button
                        sx={{ ml: 2 }}
                        variant={
                            language === "en"
                                ? "contained"
                                : "outlined"
                        }
                        onClick={() =>
                            changeLanguage(
                                "en"
                            )
                        }
                    >
                        English
                    </Button>
                </Box>
            </Paper>

            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                >
                    الأمان
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Button
                    startIcon={<Lock />}
                    variant="contained"
                    onClick={() =>
                        setOpenDialog(true)
                    }
                >
                    تغيير كلمة المرور
                </Button>
            </Paper>

            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                >
                    الجلسة
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Button
                    color="error"
                    variant="contained"
                    startIcon={<Logout />}
                    onClick={logout}
                >
                    تسجيل الخروج
                </Button>
            </Paper>

            <Dialog
                open={openDialog}
                onClose={() =>
                    setOpenDialog(false)
                }
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>

                    تغيير كلمة المرور

                    <IconButton
                        sx={{
                            position:
                                "absolute",
                            right: 10,
                            top: 10,
                        }}
                        onClick={() =>
                            setOpenDialog(
                                false
                            )
                        }
                    >
                        <Close />
                    </IconButton>

                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="كلمة المرور الحالية"
                        type="password"
                        value={
                            currentPassword
                        }
                        onChange={(e) =>
                            setCurrentPassword(
                                e.target.value
                            )
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="كلمة المرور الجديدة"
                        type="password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(
                                e.target.value
                            )
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="تأكيد كلمة المرور"
                        type="password"
                        value={
                            confirmPassword
                        }
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setOpenDialog(
                                false
                            )
                        }
                    >
                        إلغاء
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleChangePassword
                        }
                    >
                        حفظ
                    </Button>

                </DialogActions>
            </Dialog>

        </Box>
    );
}