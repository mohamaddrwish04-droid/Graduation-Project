import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    Rating,
    Chip,
} from "@mui/material";
import"./tables.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function CustomTable({
    columns,
    rows,
    actions,
    emptyMessage = "لا توجد بيانات",
}) {
    return (
        <TableContainer
            component={Paper}
            className="custom-table-container"
        >
            <Table>
                <TableHead>
                    <TableRow
                      className="custom-table-row"
                    >
                        {columns.map((column) => (
                            <TableCell
                                key={column.field}
                                align="center"
                                className="custom-table-header-cell"
         
                            >
                                {column.header}
                            </TableCell>
                        ))}

                        {actions && (
                            <TableCell
                                align="center"
                                sx={{
                                    fontWeight: "bold",
                                }}
                            >
                                الإجراءات
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow 
                        className="custom-table-row"
                        >
                            <TableCell
                                colSpan={columns.length + 1}
                                align="center"
                            >
                                <Typography py={3}
                                 className="custom-table-empty"
                                >
                                    {emptyMessage}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                className="custom-table-row"

                            >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.field}
                                        align="center"
                                        className="custom-table-cell"
                                    >
                                        {formatCellValue(row, column)}
                                    </TableCell>
                                ))}

                                {actions && (
                                    <TableCell align="center">
                                        <Box className="custom-table-actions">
                                            {actions(row)}
                                        </Box>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default CustomTable;



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

    return row[column.field];
};