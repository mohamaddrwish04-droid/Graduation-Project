import { Box, Button } from "@mui/material";
import { Switch } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import SpecializationDialog from "./SpecializationDialog";
import StatCard from "../../components/cards/StatCard";
import CustomTable from "../../components/tables/CustomTable";

import { useState, useEffect } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import {
    getSpecializations,
    createSpecialization,
    updateSpecialization,
    activateSpecialization,
    deactivateSpecialization,
} from "../../services/specializationService";

function SpecializationsPage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [specializations, setSpecializations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState("create");
    const [formData, setFormData] =
        useState({
            id: null,
            name: "",
            description: "",
        });

    const filteredSpecializations =
        specializations.filter((item) => {
            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    ) ||
                (
                    item.description || ""
                )
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

            const matchesStatus =
                statusFilter === "all"
                    ? true
                    : statusFilter ===
                        "active"
                        ? item.isActive
                        : !item.isActive;

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    const columns = [
        {
            field: "name",
            header: "اسم التخصص",
        },
        {
            field: "description",
            header: "الوصف",
        },
        {
            field: "isActive",
            header: "الحالة",
        },
        {
            field: "createdAt",
            header: "تاريخ الإنشاء",
        },
    ];
    const handleToggleStatus = async (row) => {
        try {
            if (row.isActive) {
                await deactivateSpecialization(row.id);
            } else {
                await activateSpecialization(row.id);
            }
            await loadSpecializations();
            setSnackbar({
                open: true,
                severity: "success",
                message: row.isActive ? "تم إلغاء التفعيل" : "تم التفعيل",
            });
        } catch {
            setSnackbar({
                open: true,
                severity: "error",
                message: "فشلت العملية",
            });

        }
    };
    const tableActions = (row) => (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
            }}
        >
            <Button
                variant="contained"
                size="small"
                startIcon={<EditIcon />}

                onClick={() => handleEdit(row)}
            >
                تعديل
            </Button>

            <Switch
                checked={row.isActive}
                onChange={() => {
                    handleToggleStatus(row);
                }}
                color="success"
                sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#22C55E",
                    },

                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#22C55E",
                    },
                }}
            />
        </Box>
    );
    const loadSpecializations =
        async () => {
            try {
                setLoading(true);
                const data = await getSpecializations();
                setSpecializations(data);
            } catch {
                setSnackbar({
                    open: true,
                    severity: "error",
                    message: "فشل تحميل التخصصات",
                });
            } finally {
                setLoading(false);
            }
        };
    const handleAdd = () => {
        setDialogMode("create");
        setFormData({ id: null, name: "", description: "", });
        setOpenDialog(true);
    }
    const handleEdit = (row) => {
        setDialogMode("edit");
        setFormData({ id: row.id, name: row.name, description: "" || row.description, });
        setOpenDialog(true);
    }
    const handleSubmit = async () => {
        try {
            if (!formData.name.trim()) { return; }
            setLoading(true);
            if (dialogMode === "create") {
                await createSpecialization(formData);
                setSnackbar({
                    open: true,
                    severity: "success",
                    message: "تم إنشاء التخصص بنجاح",
                });
            } else {
                await updateSpecialization(formData.id, formData);
                setSnackbar({
                    open: true,
                    severity: "success",
                    message: "تم تعديل التخصص بنجاح",
                });
            }
            setOpenDialog(false);
            await loadSpecializations();
        } catch {
            setSnackbar({
                open: true,
                severity: "error",
                message: "حدث خطأ أثناء الحفظ",
            });
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadSpecializations();
    }, []);

    return (
        <>
            <PageHeader
                title="إدارة التخصصات"
                subtitle="إدارة تخصصات الصيانة المتاحة والتحكم بحالتها."
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 3,
                    mb: 4,
                }}
            >
                <StatCard
                    title="إجمالي التخصصات"
                    value={specializations.length}
                    icon={<CategoryIcon />}
                />

                <StatCard
                    title="التخصصات النشطة"
                    value={specializations.filter(
                        (s) => s.isActive
                    ).length}
                    icon={<CheckCircleIcon />}
                />

                <StatCard
                    title="التخصصات المعطلة"
                    value={specializations.filter(
                        (s) => !s.isActive
                    ).length}
                    icon={<BlockIcon />}
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
                    <SearchInput
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                        placeholder="ابحث باسم التخصص أو الوصف..."
                    />
                </Box>

                <Box sx={{ width: 220 }}>
                    <FilterSelect
                        label="الحالة"
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                        }}
                        options={[
                            {
                                value: "all",
                                label: "الكل",
                            },
                            {
                                value: "active",
                                label: "نشط",
                            },
                            {
                                value: "inactive",
                                label: "معطل",
                            },
                        ]}
                    />
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        minWidth: 180,
                        background: "linear-gradient(135deg,#16A34A,#22C55E)",
                        textTransform: "none",
                        borderRadius: "12px",
                        fontWeight: 600,
                        boxShadow: "0 8px 20px rgba(34,197,94,0.25)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 12px 28px rgba(34,197,94,0.4)",
                        },
                    }}
                    onClick={handleAdd}
                >
                    إضافة تخصص
                </Button>
            </Box>

            <CustomTable
                columns={columns}
                rows={filteredSpecializations}
                actions={tableActions}
            />
            <SpecializationDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                mode={dialogMode}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false,
                    })
                }
            >
                <Alert
                    severity={
                        snackbar.severity
                    }
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default SpecializationsPage;