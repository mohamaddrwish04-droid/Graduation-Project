import { Box, Button, Chip } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TablePagination from "@mui/material/TablePagination";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/cards/StatCard";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import CustomTable from "../../components/tables/CustomTable";
import OrderDetailsDialog from "./OrderDetailsDialog";

import { useTranslation } from "react-i18next";
import { useOrders } from "./useOrders";


function OrdersPage() {
    const {
        handleRowsPerPageChange, paginatedOrders,
        filteredOrders, statistics,
        selectedOrder, setSelectedOrder,
        search, setSearch, openDialog, setOpenDialog,
        specializations, specializationFilter,
        setSpecializationFilter, statusFilter,
        setStatusFilter, rowsPerPage,
        page, setPage,
    } = useOrders();

    const { t } = useTranslation();



    const columns = [
        {
            field: "id",
            header: t("ID"),
        },
        {
            field: "customerName",
            header: t("customer"),
        },
        {
            field: "specializationName",
            header: t("specialization"),
        },
        {
            field: "status",
            header: t("status"),
        },
        {
            field: "createdAt",
            header: t("created at"),
        },
    ];
    const tableActions = (row) => (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
            }}
        >
            <Button
                startIcon={<VisibilityIcon />}
                variant="contained"
                size="small"
                onClick={() => {
                    setSelectedOrder(row);
                    setOpenDialog(true);
                }}

            >
                عرض
            </Button>
            <Button
                startIcon={<LocalOfferIcon />}
                variant="contained"
                size="small"
                sx={{
                    background: "linear-gradient(135deg,#10B981,#34D399)",
                    borderRadius: "10px",
                    textTransform: "none",
                    boxShadow: "0 6px 18px rgba(16,185,129,0.25)",
                    "&:hover": {
                        transform: "translateY(-2px)",
                    },
                }}>
                العروض
            </Button>
        </Box>
    );

    return (
        <>
            <PageHeader
                title={t("manage orders")}
                subtitle={t("disc-orders")}
            />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5,1fr)",
                    gap: 3,
                    mb: 4,
                }}
            >
                <StatCard
                    title={t("all orders")}
                    value={statistics.total}
                    icon={<ReceiptLongIcon />}
                />

                <StatCard
                    title={t("orders pending")}
                    value={statistics.waiting}
                    icon={<PendingActionsIcon />}
                />

                <StatCard
                    title={t("orders in progress")}
                    value={statistics.inProgress}
                    icon={<EngineeringIcon />}
                />

                <StatCard
                    title={t("orders completed")}
                    value={statistics.completed}
                    icon={<TaskAltIcon />}
                />

                <StatCard
                    title={t("orders canceled")}
                    value={statistics.cancelled}
                    icon={<CancelIcon />}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <SearchInput placeholder="ابحث عن طلب..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>
                <Box sx={{ width: 220 }}>
                    <FilterSelect
                        label="الحالة"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        options={[
                            { value: "all", label: "الكل" },
                            { value: 0, label: "بانتظار العروض" },
                            { value: 1, label: "تمت المعاينة" },
                            { value: 2, label: "قيد التنفيذ" },
                            { value: 3, label: "بانتظار تأكيد الإنجاز", },
                            { value: 4, label: "مكتمل" },
                            { value: 5, label: "ملغي" },
                        ]}
                    />
                </Box>

                <Box sx={{ width: 220 }}>
                    <FilterSelect
                        label="التخصص"
                        value={specializationFilter}
                        onChange={(e) =>
                            setSpecializationFilter(
                                e.target.value
                            )
                        }
                        options={[
                            {
                                value: "all",
                                label: "كل التخصصات",
                            },

                            ...specializations.map((s) => ({
                                value: s.id,
                                label: s.name,
                            })),
                        ]}
                    />
                </Box>
            </Box>
            <CustomTable
                columns={columns}
                rows={paginatedOrders}
                actions={tableActions}
            />

            <TablePagination
                component="div"
                count={filteredOrders.length}
                page={page}
                onPageChange={(event, newPage) =>
                    setPage(newPage)
                }
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[10, 25, 50, 100]}
                labelRowsPerPage="عدد العناصر:"
                sx={{
                    borderTop:
                        "1px solid rgba(255,255,255,0.08)",

                    "& .MuiTablePagination-toolbar": {
                        color: "text.primary",
                    },

                    "& .MuiIconButton-root": {
                        color: "text.primary",
                    },

                    "& .MuiSelect-select": {
                        color: "text.primary",
                    },
                }}
            />



            <OrderDetailsDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                order={selectedOrder}
            />
        </>
    );
}

export default OrdersPage;