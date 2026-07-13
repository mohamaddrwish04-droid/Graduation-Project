import { serialize } from "stylis";
import {
    getSubscriptionPlans,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    activateSubscriptionPlan,
    deactivateSubscriptionPlan,
} from "../../services/subscriptionPlanService";
import { useState, useEffect } from "react";






export function useSubscriptionPlanPage() {

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState("create");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        price: "",
        durationInDays: "",
    });
    const handleAdd = () => {
        setDialogMode("create");
        setFormData({
            id: null,
            name: "",
            price: "",
            durationInDays: "",
        });

        setOpenDialog(true);
    };
    const handleEdit = (row) => {
        setDialogMode("edit");
        setFormData({
            id: row.id,
            name: row.name,
            price: row.price,
            durationInDays:
                row.durationInDays,
        });

        setOpenDialog(true);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (dialogMode === "create") {
                await createSubscriptionPlan(formData);
            } else {
                await updateSubscriptionPlan(formData.id, formData);
            }

            await loadPlans();

            setOpenDialog(false);

            setSnackbar({
                open: true,
                severity: "success",
                message:
                    dialogMode ===
                        "create"
                        ? "تمت إضافة الخطة"
                        : "تم تعديل الخطة",
            });
        } catch {
            setSnackbar({
                open: true,
                severity: "error",
                message:
                    "فشلت العملية",
            });
        } finally {
            setLoading(false);
        }
    };
    const handleToggleStatus = async (row) => {
        try {
            if (row.isActive) {
                await deactivateSubscriptionPlan(row.id);
            } else {
                await activateSubscriptionPlan(row.id);
            }
            await loadPlans();
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
    const filteredPlans = plans.filter((plan) => {
        const matchesSearch =
            plan.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all"
                ? true
                : statusFilter === "active"
                    ? plan.isActive
                    : !plan.isActive;

        return (
            matchesSearch &&
            matchesStatus
        );
    });
    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            const data =
                await getSubscriptionPlans();

            setPlans(data);
        } catch {
            setSnackbar({
                open: true,
                severity: "error",
                message:
                    "فشل تحميل الخطط",
            });
        }
    };

    const totalPlans = plans.length;
    const activePlans = plans.filter(
        (plan) => plan.isActive
    ).length;

    const inactivePlans = plans.filter(
        (plan) => !plan.isActive
    ).length;

    const averagePrice = totalPlans > 0
        ? (
            plans.reduce(
                (sum, plan) =>
                    sum + plan.price,
                0
            ) / totalPlans
        ).toFixed(2)
        : 0;


    return {
        averagePrice, inactivePlans, activePlans, totalPlans,
        handleEdit, handleAdd, handleSubmit, handleToggleStatus,
        filteredPlans, searchTerm, setSearchTerm,
        snackbar, setSnackbar, statusFilter, setStatusFilter,
        dialogMode, setDialogMode, loading,
        openDialog, setOpenDialog, formData, setFormData,
    }
}