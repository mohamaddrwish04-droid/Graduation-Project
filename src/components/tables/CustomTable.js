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
import "./tables.css";
import { HelperTable } from "./helperTable";

function CustomTable({ columns,rows,actions,emptyMessage = "لا توجد بيانات",}) {
    const{formatCellValue}=HelperTable();
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