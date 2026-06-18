import {
    Avatar,
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import HandymanIcon from "@mui/icons-material/Handyman";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

function OrderDetailsDialog({open,onClose,order,}) {
    if (!order) return null;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent:"space-between",
                    alignItems: "center",
                    pb: 2,
                }}>
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >
                        تفاصيل الطلب
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        رقم الطلب {order.id}
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {/* الحالة */}
                <Box sx={{mb: 3,}}>
                    <Chip
                        label={order.status}
                        color="primary"
                        sx={{fontWeight:700, minWidth: 130, }}
                    />
                </Box>
                <Grid containerspacing={3}>
                    {/* العميل */}
                    <Grid item xs={12} md={6}>
                        <Paper
                            sx={{ p: 3,borderRadius: 3,}}>
                            <Box
                                sx={{
                                    display:"flex",
                                    alignItems:"center",
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
                            <Divider
                                sx={{mb: 2, }}
                            />
                            <Typography>
                                الاسم:
                                محمد
                                درويش
                            </Typography>
                            <Typography>
                                الهاتف:
                                099999999
                            </Typography>
                            <Typography>
                                البريد:
                                mohamad@gmail.com
                            </Typography>
                        </Paper>
                    </Grid>
                    {/* الطلب */}
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
                                    display:"flex",
                                    alignItems:"center",
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
                            <Divider
                                sx={{
                                    mb: 2,
                                }}
                            />
                            <Typography>
                                التخصص:
                                {
                                    order.specialization
                                }
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
                                {
                                    order.description
                                }
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 2,
                                }}
                            >
                                تاريخ الإنشاء:
                                {
                                    order.createdAt
                                }
                            </Typography>
                        </Paper>
                    </Grid>
                    {/* الموقع */}
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    display:"flex",
                                    alignItems:"center",
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
                            <Divider
                                sx={{
                                    mb: 2,
                                }}
                            />
                            <Typography>
                                دمشق -
                                جرمانا
                            </Typography>
                            <Typography>
                                Latitude:
                                33.5138
                            </Typography>
                            <Typography>
                                Longitude:
                                36.2765
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* مقدم الخدمة */}

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
                                    display:
                                        "flex",

                                    alignItems:
                                        "center",

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

                            <Divider
                                sx={{
                                    mb: 2,
                                }}
                            />

                            <Typography>
                                أحمد
                                خالد
                            </Typography>

                            <Typography>
                                كهرباء
                            </Typography>

                            <Typography>
                                098888888
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* العرض المقبول */}

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
                                    display:
                                        "flex",

                                    alignItems:
                                        "center",

                                    gap: 1,

                                    mb: 2,
                                }}
                            >
                                <Avatar>
                                    <ReceiptLongIcon />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    العرض المقبول
                                </Typography>
                            </Box>

                            <Divider
                                sx={{
                                    mb: 2,
                                }}
                            />

                            <Typography>
                                السعر:
                                50$
                            </Typography>

                            <Typography>
                                التنفيذ
                                خلال
                                يوم
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default OrderDetailsDialog;