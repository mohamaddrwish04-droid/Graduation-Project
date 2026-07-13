import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    IconButton,
    Chip,
    Grid,
    Paper,
    Avatar,
    Divider,
    Button,
    Rating,
} from "@mui/material";


import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HandymanIcon from "@mui/icons-material/Handyman";
import StarIcon from "@mui/icons-material/Star";
import MapIcon from "@mui/icons-material/Map";
function OrderDetailsDialog({ open, onClose, order, }) {

    if (!order) return null;
    const getStatusChip = (status) => {
        const statusMap = {
            0: {
                label: "بانتظار العروض",
                color: "info",
            },

            1: {
                label: "تمت المعاينة",
                color: "warning",
            },

            2: {
                label: "قيد التنفيذ",
                color: "primary",
            },

            3: {
                label: "بانتظار تأكيد الإنجاز",
                color: "secondary",
            },

            4: {
                label: "مكتمل",
                color: "success",
            },

            5: {
                label: "ملغي",
                color: "error",
            },
        };
        const current = statusMap[status] || {
            label: "غير معروف",
            color: "default",
        };


        return (
            <Chip
                label={current.label}
                color={current.color}
                sx={{
                    minWidth: 150,
                    fontWeight: 700,
                }}
            />
        );
    };
    const openLocation = () => {
        if (!order.latitude || !order.longitude) {
            return;
        }


        const url = `https://www.openstreetmap.org/?mlat=${order.latitude}&mlon=${order.longitude}&zoom=15;`


        window.open(
            url,
            "_blank",
            "width=1000,height=700"
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        تفاصيل الطلب #{order.id}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                        {getStatusChip(order.status)}
                    </Box>
                </Box>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={3}>
                    {/* معلومات العميل */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                    >
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                height: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 2,
                                }}
                            >
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>


                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    معلومات العميل
                                </Typography>

                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Typography>
                                الاسم:
                                {" "}
                                {order.customerName || "غير متوفر"}
                            </Typography>


                            <Typography sx={{ mt: 1 }}>
                                رقم العميل:
                                {" "}
                                {order.customerId}
                            </Typography>
                        </Paper>
                    </Grid>
                    {/* معلومات الطلب */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                    >

                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                height: "100%",
                            }}
                        >

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 2,
                                }}
                            >

                                <Avatar>
                                    <DescriptionIcon />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    معلومات الطلب
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Typography>
                                التخصص:
                                {" "}
                                {order.specializationName}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 2,
                                }}
                            >
                                الوصف:
                            </Typography>
                            <Typography
                                color="text.secondary"
                            >
                                {order.description || "لا يوجد وصف"}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 2,
                                }}
                            >
                                تاريخ الإنشاء:
                                {" "}
                                {
                                    new Date(
                                        order.createdAt
                                    ).toLocaleDateString(
                                        "ar-EG"
                                    )
                                }
                            </Typography>
                        </Paper>
                    </Grid>
                    {/* مقدم الخدمة */}
                    {
                        order.selectedProviderName && (

                            <Grid
                                item
                                xs={12}
                                md={6}
                            >

                                <Paper
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                    }}
                                >

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <Avatar>
                                            <HandymanIcon />
                                        </Avatar>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            مقدم الخدمة
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography>
                                        الاسم:
                                        {" "}
                                        {order.selectedProviderName}
                                    </Typography>
                                </Paper>
                            </Grid>
                        )
                    }
                    {/* الموقع */}
                    <Grid
                        item
                        xs={12}
                    >
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 2,
                                }}
                            >
                                <Avatar>
                                    <LocationOnIcon />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    الموقع
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Typography>
                                العنوان:
                                {" "}
                                {order.addressText || "غير متوفر"}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                Latitude:
                                {" "}
                                {order.latitude}
                            </Typography>
                            <Typography>
                                Longitude:
                                {" "}
                                {order.longitude}
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<MapIcon />}
                                sx={{
                                    mt: 2,
                                    borderRadius: 2,
                                    textTransform: "none",
                                }}
                                onClick={openLocation}
                            >
                                فتح الموقع على الخريطة
                            </Button>
                        </Paper>
                    </Grid>
                    {/* التقييم */}
                    {
                        order.hasRating && (
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <Paper
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <Avatar>
                                            <StarIcon />
                                        </Avatar>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            التقييم
                                        </Typography>

                                    </Box>
                                    <Divider sx={{ mb: 2 }} />
                                    <Rating
                                        value={order.ratingValue}
                                        readOnly
                                    />
                                    <Typography
                                        sx={{ mt: 1, }}
                                        color="text.secondary"
                                    >
                                        {
                                            new Date(
                                                order.ratingCreatedAt
                                            ).toLocaleDateString("ar-EG")
                                        }
                                    </Typography>
                                </Paper>
                            </Grid>
                        )
                    }
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default OrderDetailsDialog;