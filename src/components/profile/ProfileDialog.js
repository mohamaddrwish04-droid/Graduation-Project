import {
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
    Typography,
    Box,
    Divider,
    Button,
    CircularProgress
} from "@mui/material";
import { buildImageUrl } from "../../utils/buildImageUrl"
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/profileService";
import { uploadProfileImage, } from "../../services/profileService";
export default function ProfileDialog({
    open,
    onClose,
    User,
}) {

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [success, setSuccess] = useState("");
     const [user, setUser] = useState(null);

    const handleUploadImage = async () => {

        if (!selectedFile) {
            return;
        }

        try {

            setUploading(true);
            await uploadProfileImage(selectedFile);
            const updatedUser = await getCurrentUser();
            setUser(updatedUser);
            setSelectedFile(null);
            setSuccess(
                "تم رفع الصورة بنجاح"
            );
        } catch (error) {
            setError(
                "فشل رفع الصورة"
            );
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

                <Divider sx={{ mb: 2 }} />

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
        </Dialog>
    );
}