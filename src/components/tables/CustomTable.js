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
} from "@mui/material";
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
            sx={{
                backgroundColor: "#1A1D2E",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: "#141726",
                        }}
                    >
                        {columns.map((column) => (
                            <TableCell
                                key={column.field}
                                align="center"
                                sx={{
                                    color: "#FFFFFF",
                                    fontWeight: "bold",
                                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                {column.header}
                            </TableCell>
                        ))}

                        {actions && (
                            <TableCell
                                align="center"
                                sx={{
                                    color: "#FFFFFF",
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
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + 1}
                                align="center"
                            >
                                <Typography py={3}>
                                    {emptyMessage}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                sx={{
                                    transition: "0.25s",

                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(47,107,255,0.08)",
                                    },
                                }}
                            >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.field}
                                        align="center"
                                    >
                                        {
                                            column.field === "isActive" 
                                                ? row.isActive
                                                    ? (<CheckCircleIcon color="success" fontSize="small"/>)
                                                    : (<CancelIcon color="error" fontSize="small"/>)

                                                : column.field === "createdAt"
                                                    ? new Date(
                                                        row.createdAt
                                                    ).toLocaleString(
                                                        "ar-EG",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )

                                                    : column.field === "price"
                                                        ? `$${row.price}`

                                        : column.field === "durationInDays"
                                        ? `${row.durationInDays} يوم`

                                        : row[column.field]
    }
                                    </TableCell>
                                ))}

                                {actions && (
                                    <TableCell align="center">
                                        <Box>
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