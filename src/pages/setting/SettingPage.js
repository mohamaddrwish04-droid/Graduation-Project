import {
    Box,
    Paper,
    Typography,
    Avatar,
    Stack,
    Switch,
    Grid,
    Chip,
    TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import { buildImageUrl } from "../../utils/buildImageUrl";
import { uploadProfileImage, } from "../../services/profileService";
import { Button, CircularProgress, } from "@mui/material";
import PageHeader from "../../components/common/PageHeader"
import { useLanguage } from "../../context/LanguageContext";
import { getCurrentUser } from "../../services/profileService";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";



export default function SettingsPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState("");
    const { language, changeLanguage } = useLanguage();
    const { mode, toggleTheme } = useThemeContext();
    const { logout } = useAuth();

    const [error, setError] = useState("");

    useEffect(() => {

        const loadUser =
            async () => {

                try {

                    const data =
                        await getCurrentUser();

                    setUser(data);

                } catch (error) {
                    console.error(error);
                }
            };

        loadUser();

    }, []);

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

            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            setError(
                error.response?.data ||
                "فشل رفع الصورة"
            );
        } finally {

            setUploading(false);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 1200,
                mx: "auto",
            }}
        >

            <PageHeader
                title="الإعدادات"
                subtitle="إدارة الحساب والتفضيلات"
            />

            <Grid
                container
                spacing={3}
            >

                <Grid
                    item
                    xs={12}
                    md={5}
                >
                    {/* Profile Card */}
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            height: "100%",
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >

                            <Avatar
                                src={buildImageUrl(
                                    user?.profileImageUrl
                                )}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mb: 2,
                                }}
                            >
                                {user?.fullName?.charAt(0)}
                            </Avatar>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    mb: 3,
                                }}
                            >

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

                            </Box>

                            <Typography
                                variant="h5"
                                sx={{ mt: 3 }}
                            >
                                {user?.fullName}
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                {user?.email}
                            </Typography>

                            <Chip
                                label={user?.role}
                                color="primary"
                                sx={{ mt: 2 }}
                            />

                        </Box>

                    </Paper>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={7}
                >
                    {/* Theme & Language */}
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            mb: 3,
                        }}
                    >

                        <Typography
                            variant="h6"
                            mb={3}
                        >
                            المظهر واللغة
                        </Typography>

                        <Stack spacing={3}>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography>
                                    الوضع الداكن
                                </Typography>

                                <Switch
                                    checked={
                                        mode === "dark"
                                    }
                                    onChange={
                                        toggleTheme
                                    }
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography>
                                    اللغة العربية
                                </Typography>

                                <Switch
                                    checked={
                                        language === "ar"
                                    }
                                    onChange={() =>
                                        changeLanguage(
                                            language === "ar"
                                                ? "en"
                                                : "ar"
                                        )
                                    }
                                />
                            </Box>

                        </Stack>

                    </Paper>
                    {/* Change Password */}
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            mb: 3,
                        }}
                    >

                        <Typography
                            variant="h6"
                            mb={3}
                        >
                            تغيير كلمة المرور
                        </Typography>

                        <Stack spacing={2}>

                            <TextField
                                label="كلمة المرور الحالية"
                                type="password"
                            />

                            <TextField
                                label="كلمة المرور الجديدة"
                                type="password"
                            />

                            <TextField
                                label="تأكيد كلمة المرور"
                                type="password"
                            />
                            <Button
                                variant="contained"
                                size="large"
                            >
                                تغيير كلمة المرور
                            </Button>
                        </Stack>
                    </Paper>
                    {/* Logout */}
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                        }}
                    >
                        <Button
                            fullWidth
                            color="error"
                            variant="contained"
                            onClick={logout}
                        >
                            تسجيل الخروج
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}