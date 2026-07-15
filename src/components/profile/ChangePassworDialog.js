import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
} from "@mui/material";

import { useState } from "react";

import {
    changePassword,
} from "../../services/authService";

export default function ChangePasswordDialog({
    open,
    onClose,
}) {

    const [
        currentPassword,
        setCurrentPassword,
    ] = useState("");

    const [
        newPassword,
        setNewPassword,
    ] = useState("");

    const handleSubmit =
        async () => {

            try {

                await changePassword(
                    currentPassword,
                    newPassword
                );

                onClose();

            } catch (error) {

                console.error(error);
            }
        };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
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
        </Dialog>
    );
}