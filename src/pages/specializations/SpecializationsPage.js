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

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import { useSpecializationsPage } from "./useSpecializationsPage";



function SpecializationsPage() {
    const {
        handleAdd, handleEdit, handleSubmit, handleToggleStatus,
        filteredSpecializations, openDialog, setOpenDialog,
        formData, setFormData, dialogMode,
        snackbar, setSnackbar, statusFilter, setStatusFilter,
        searchTerm, setSearchTerm, specializations, loading
    } = useSpecializationsPage();
    const { t } = useTranslation();




    const columns = [
        {
            field: "name",
            header: t("name"),
        },
        {
            field: "description",
            header: t("description"),
        },
        {
            field: "isActive",
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


    return (
        <>
            <PageHeader
                title={t("manage specializations")}
                subtitle={t("disc-specializations")}
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
                    title={t("all specializations")}
                    value={specializations.length}
                    icon={<CategoryIcon />}
                />

                <StatCard
                    title={t("active specializations")}
                    value={specializations.filter(
                        (s) => s.isActive
                    ).length}
                    icon={<CheckCircleIcon />}
                />

                <StatCard
                    title={t("inactive specializations")}
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