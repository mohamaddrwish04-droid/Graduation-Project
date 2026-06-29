import { Box, Button, Chip } from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/cards/StatCard";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import CustomTable from "../../components/tables/CustomTable";
import OrderDetailsDialog from "./OrderDetailsDialog";

import { useState } from "react";

function OrdersPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const getStatusChip = (status) => {
        const config = {
            Open: {
                label: "مفتوح",
                color: "primary",
            },
            InProgress: {
                label: "قيد التنفيذ",
                color: "warning",
            },
            Completed: {
                label: "مكتمل",
                color: "success",
            },
            Cancelled: {
                label: "ملغي",
                color: "error",
            },
        };

        return (
            <Chip
                label={config[status].label}
                color={config[status].color}
                size="small"
                sx={{
                    minWidth: 100,
                    fontWeight: 600,
                }}
            />
        );
    };
    const orders = [
        {
            id: "#101",
            specialization: "كهرباء",
            description: "إصلاح لوحة كهربائية",
            status: getStatusChip("Open"),
            createdAt: "2026-05-20",
        },

        {
            id: "#102",
            specialization: "سباكة",
            description: "إصلاح تسرب مياه",
            status: getStatusChip("InProgress"),
            createdAt: "2026-05-21",
        },

        {
            id: "#103",
            specialization: "تكييف",
            description: "صيانة مكيف",
            status: getStatusChip("Completed"),
            createdAt: "2026-05-22",
        },

        {
            id: "#104",
            specialization: "أجهزة منزلية",
            description: "إصلاح غسالة",
            status: getStatusChip("Cancelled"),
            createdAt: "2026-05-23",
        },
    ];
    const columns = [
        {
            field: "id",
            header: "رقم الطلب",
        },
        {
            field: "specialization",
            header: "التخصص",
        },
        {
            field: "description",
            header: "الوصف",
        },
        {
            field: "status",
            header: "الحالة",
        },
        {
            field: "createdAt",
            header: "تاريخ الإنشاء",
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
                title="إدارة الطلبات"
                subtitle="متابعة جميع طلبات الصيانة وإدارة حالتها."
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
                    title="إجمالي الطلبات"
                    value="120"
                    icon={<ReceiptLongIcon />}
                />

                <StatCard
                    title="مفتوحة"
                    value="40"
                    icon={<PendingActionsIcon />}
                />

                <StatCard
                    title="قيد التنفيذ"
                    value="35"
                    icon={<EngineeringIcon />}
                />

                <StatCard
                    title="مكتملة"
                    value="38"
                    icon={<TaskAltIcon />}
                />

                <StatCard
                    title="ملغاة"
                    value="7"
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
                    <SearchInput placeholder="ابحث عن طلب..." />
                </Box>
                <Box sx={{ width: 220 }}>
                    <FilterSelect
                        label="الحالة"
                        options={[
                            { value: "all", label: "الكل" },
                            { value: "open", label: "مفتوح" },
                            { value: "progress", label: "قيد التنفيذ" },
                            { value: "completed", label: "مكتمل" },
                            { value: "cancelled", label: "ملغي" },
                        ]}
                    />
                </Box>

                <Box sx={{ width: 220 }}>
                    <FilterSelect
                        label="التخصص"
                        options={[
                            { value: "all", label: "كل التخصصات" },
                            { value: "electricity", label: "كهرباء" },
                            { value: "plumbing", label: "سباكة" },
                            { value: "ac", label: "تكييف" },
                        ]}
                    />
                </Box>
            </Box>
            <CustomTable
                columns={columns}
                rows={orders}
                actions={tableActions}
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