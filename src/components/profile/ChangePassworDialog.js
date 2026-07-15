import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert
} from "@mui/material";

import { useState, useEffect } from "react";

import { changePassword, } from "../../services/authService";

export default function ChangePasswordDialog({
    open,
    onClose,
}) {

    const [currentPassword, setCurrentPassword,] = useState("");
    const [newPassword, setNewPassword,] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });


    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setSnackbar({
                open: true,
                message: "كلمتا المرور غير متطابقتين",
                severity: "warning",
            });
            return;
        }
        try {
            await changePassword(
                currentPassword,
                newPassword
            );
            setConfirmPassword("");
            setNewPassword();
            setCurrentPassword();
            setTimeout(()=>{
                onClose();
            },5000);
            setSnackbar({
                open: true,
                message: "تم تغيير كلمة المرور بنجاح",
                severity: "success",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message:
                    error?.message ||
                    "فشل تغيير كلمة المرور",
                severity: "error",
            });
        } finally {

        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            sx={{ textAlign: "center" }}
        >
            <DialogTitle>
                تغيير كلمة المرور
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
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                />

                <Box
                    sx={{
                        mt: 3,
                    }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={
                            handleSubmit
                        }
                    >
                        حفظ التغييرات
                    </Button>
                </Box>

            </DialogContent>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false,
                    })
                }
            >
                <Alert
                    severity={
                        snackbar.severity
                    }
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
}