
import { serialize } from "stylis";
import {
    getSpecializations,
    createSpecialization,
    updateSpecialization,
    activateSpecialization,
    deactivateSpecialization,
} from "../../services/specializationService";
import { useState, useEffect } from "react";






export function useSpecializationsPage() {
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
    const loadSpecializations = async () => {
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

    return {
        handleAdd, handleEdit, handleSubmit, handleToggleStatus,
        filteredSpecializations, openDialog, setOpenDialog,
        formData, setFormData, dialogMode, setDialogMode,
        snackbar, setSnackbar, statusFilter, setStatusFilter,
        searchTerm, setSearchTerm, specializations, loading
    }
}