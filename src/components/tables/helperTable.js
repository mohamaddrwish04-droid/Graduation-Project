
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { buildImageUrl } from "../../utils/buildImageUrl";
import {
    Box,
    Typography,
    Rating,
    Chip,
    Avatar
} from "@mui/material";


export function HelperTable() {
    const formatCellValue = (row, column) => {
        if (column.field === "createdAt" || column.field === "ratingcreatedAt") {
            return new Date(row.createdAt).toLocaleString("ar-EG", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        }

        if (column.field === "ratingValue") {
            return <Rating value={row.ratingValue} readOnly precision={0.5} />;
        }

        if (column.field === "isActive") {
            return row.isActive ? (
                <CheckCircleIcon color="success" fontSize="small" />
            ) : (
                <CancelIcon color="error" fontSize="small" />
            );
        }
        if (column.field === "price") {
            return `${row.price}$`;
        }

        if (column.field === "durationInDays") {
            return `${row.durationInDays} يوم`;
        }

        if (column.field === "isEmailVerified") {
            return row.isEmailVerified ? (
                <CheckCircleIcon color="success" fontSize="small" />
            ) : (
                <CancelIcon color="error" fontSize="small" />
            );
        }

        if (column.field === "status") {
            switch (row.status) {
                case 0:
                    return (
                        <Chip
                            label="بانتظار العروض"
                            color="info"
                            size="small"
                            sx={{ minWidth: 120, fontWeight: 600 }}
                        />
                    );
                case 1:
                    return (
                        <Chip
                            label="تمت المعاينة"
                            color="warning"
                            size="small"
                            sx={{ minWidth: 120, fontWeight: 600 }}
                        />
                    );
                case 2:
                    return (
                        <Chip
                            label="قيد التنفيذ"
                            color="primary"
                            size="small"
                            sx={{ minWidth: 120, fontWeight: 600 }}
                        />
                    );
                case 3:
                    return (
                        <Chip
                            label="بانتظار تأكيد الإنجاز"
                            color="secondary"
                            size="small"
                            sx={{ minWidth: 120, fontWeight: 600 }}
                        />
                    );
                case 4:
                    return (
                        <Chip
                            label="مكتمل"
                            color="success"
                            size="small"
                            sx={{ minWidth: 120, fontWeight: 600 }}
                        />
                    );
                case 5:
                    return (
                        <Chip
                            label="ملغي"
                            color="error"
                            size="small"
                            sx={{ minWidth: 120, fontWeight: 600 }}
                        />
                    );
                default:
                    return (
                        <Chip
                            label="غير معروف"
                            color="default"
                            size="small"
                            sx={{ minWidth: 120, fontWeight: 600 }}
                        />
                    );
            }
        }

        if (column.field === "paymentMethod") {
            switch (row.paymentMethod) {
                case 1:
                    return "شام كاش";
                default:
                    return "غير معروف";
            }
        }

        if (column.field === "fullName") {
            return (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        justifyContent: "center",
                    }}
                >
                    <Avatar
                        src={
                            row.profileImageUrl
                                ? buildImageUrl(
                                    row.profileImageUrl
                                )
                                : undefined
                        }
                        sx={{
                            width: 34,
                            height: 34,
                            fontSize: "0.95rem",
                            fontWeight: 700,
                        }}
                    >
                        {row.fullName?.charAt(0)?.toUpperCase()}
                    </Avatar>

                    <Typography
                        fontWeight={500}
                    >
                        {row.fullName}
                    </Typography>
                </Box>
            );
        }

        return row[column.field];
    };

    return{formatCellValue}
}