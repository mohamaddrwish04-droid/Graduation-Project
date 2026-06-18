import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Avatar,
    Chip,
    Divider,
    Grid,
    Paper,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HandymanIcon from "@mui/icons-material/Handyman";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";

function UserDetailsDialog({
    open,
    onClose,
    user,
}) {
    if (!user) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                تفاصيل المستخدم
            </DialogTitle>

            <DialogContent>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,
                            fontSize: 28,
                            bgcolor: "primary.main",
                        }}
                    >
                        {user.fullName?.charAt(0)}
                    </Avatar>

                    <Box>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                        >
                            {user.fullName}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                mt: 1,
                            }}
                        >
                            <Chip
                                label={
                                    user.isEmailVerified
                                        ? "مفعل"
                                        : "غير مفعل"
                                }
                                color={
                                    user.isEmailVerified
                                        ? "success"
                                        : "error"
                                }
                            />

                            <Chip
                                label={
                                    user.role === 1
                                        ? "مدير"
                                        : "عميل"
                                }
                                color="primary"
                            />

                            {user.hasProviderProfile && (
                                <Chip
                                    icon={<HandymanIcon />}
                                    label="مقدم خدمة"
                                    color="warning"
                                />
                            )}
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2}>

                    <Grid size={6}>
                        <Paper sx={{ p: 2 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <EmailIcon />
                                <Typography>
                                    {user.email}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid size={6}>
                        <Paper sx={{ p: 2 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <PhoneIcon />
                                <Typography>
                                    {user.phoneNumber}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid size={12}>
                        <Paper sx={{ p: 2 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <CalendarMonthIcon />
                                <Typography>
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleString(
                                        "ar-EG",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>

                {user.provider && (
                    <>
                        <Divider sx={{ my: 3 }} />

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            mb={2}
                        >
                            معلومات مقدم الخدمة
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography
                                        fontWeight="bold"
                                        mb={1}
                                    >
                                        التخصص
                                    </Typography>

                                    <Typography>
                                        {user.provider.specializationName}
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid size={6}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography
                                        fontWeight="bold"
                                        mb={1}
                                    >
                                        الاشتراك
                                    </Typography>

                                    <Chip
                                        icon={<VerifiedIcon />}
                                        label={
                                            user.provider
                                                .hasActiveSubscription
                                                ? "نشط"
                                                : "غير نشط"
                                        }
                                        color={
                                            user.provider
                                                .hasActiveSubscription
                                                ? "success"
                                                : "default"
                                        }
                                    />
                                </Paper>
                            </Grid>

                            <Grid size={12}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography
                                        fontWeight="bold"
                                        mb={1}
                                    >
                                        النبذة التعريفية
                                    </Typography>
                                    <Typography>
                                        {user.provider.bio}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </>
                )}
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}
                >
                    إغلاق
                </Button>
            </DialogActions>
        </Dialog>
    );

}

export default UserDetailsDialog;