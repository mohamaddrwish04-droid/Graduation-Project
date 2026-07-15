import {
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
    Typography,
    Box,
    Divider,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { buildImageUrl } from "../../utils/buildImageUrl"
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/profileService";
import { uploadProfileImage, } from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";


export default function ProfileDialog({
    open,
    onClose,
    user,
}) {

    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const { updateUser } = useAuth();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });


    const handleUploadImage = async () => {

        if (!selectedFile) return;

        try {

            setUploading(true);
            await uploadProfileImage(selectedFile);
            const updatedUser = await getCurrentUser();
            updateUser(updatedUser);
            setSelectedFile(null);
            setSnackbar({
                open: true, message:  "تم رفع الصورة بنجاح", severity: "success",
            })
        } catch {
            setSnackbar({
                open: true, message: "فشل رفع الصورة", severity: "error",
            })

        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            sx={{
                textAlign: "center"
            }}
        >
            <DialogTitle>
                معلومات الحساب
            </DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 3,
                    }}
                >
                    <Avatar
                        src={
                            buildImageUrl(
                                user?.profileImageUrl
                            )}
                        sx={{
                            width: 90,
                            height: 90,
                            mx: "auto",
                            mb: 2,
                        }}
                    >
                        {user?.fullName?.charAt(0)}
                    </Avatar>

                    <Typography
                        variant="h6"
                    >
                        {user?.fullName}
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        {user?.email}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 2, }} />

                <Typography>
                    رقم المستخدم:
                    {user?.userId}
                </Typography>

                <Typography>
                    الهاتف:
                    {user?.phoneNumber}
                </Typography>

                <Typography>
                    الدور:
                    {user?.role}
                </Typography>

                <Button
                    component="label"
                    variant="outlined"
                >
                    اختيار صورة

                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setSelectedFile(
                                e.target.files[0]
                            )
                        }
                    />
                </Button>

                <Button
                    variant="contained"
                    disabled={
                        !selectedFile ||
                        uploading
                    }
                    onClick={
                        handleUploadImage
                    }
                >
                    {uploading ? (
                        <CircularProgress
                            size={20}
                        />
                    ) : (
                        "رفع الصورة"
                    )}
                </Button>
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