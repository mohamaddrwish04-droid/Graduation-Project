

import { Box } from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/cards/StatCard";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CustomTable from "../../components/tables/CustomTable";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SubscriptionDialog from "./SubscriptionDialog";
import {
  getSubscriptionPlans,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  activateSubscriptionPlan,
  deactivateSubscriptionPlan,
} from "../../services/subscriptionPlanService";

function SubscriptionsPage() {
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

  const handleSubmit =
    async () => {
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

  const handleToggleStatus =
    async (row) => {
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
          message:"فشلت العملية",
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


  const columns = [
    {
      field: "name",
      header: "اسم التخصص",
    },
    {
      field: "price",
      header: "السعر",
    },
    {
      field: "durationInDays",
      header: "المدة",
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
  const tableActions = (row) => (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        justifyContent: "center",
      }}
    >
      <Button
        variant="outlined"
        size="small"
        startIcon={<EditIcon />}
        onClick={() => {
          handleEdit(row);
        }}
        sx={{
          textTransform: "none",
          borderRadius: "10px",
          boxShadow:"0 6px 18px rgba(47,107,255,0.25)",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        تعديل
      </Button>
      <Switch
        defaultChecked={row.status === "نشط"}
        color="success"
        checked={row.isActive}
        onChange={() => {
          handleToggleStatus(row);
        }}
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

  const activePlans =
    plans.filter(
      (plan) => plan.isActive
    ).length;

  const inactivePlans =
    plans.filter(
      (plan) => !plan.isActive
    ).length;

  const averagePrice =
    totalPlans > 0
      ? (
        plans.reduce(
          (sum, plan) =>
            sum + plan.price,
          0
        ) / totalPlans
      ).toFixed(2)
      : 0;

  return (
    <>
      <PageHeader
        title="إدارة خطط الاشتراك"
        subtitle="إدارة الخطط المتاحة والتحكم بحالة التفعيل."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 3,
          mb: 5,
        }}
      >
        <StatCard
          title="إجمالي الخطط"
          value={totalPlans}
          icon={<WorkspacePremiumIcon />}
        />

        <StatCard
          title="الخطط المعطلة"
          value={activePlans}
          icon={<CheckCircleIcon />}
        />
        <StatCard
          title="الخطط المعطلة"
          value={inactivePlans}
          icon={<BlockIcon />}
        />

        <StatCard
          title="متوسط السعر"
          value={averagePrice}
          icon={<AttachMoneyIcon />}
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="ابحث عن تخصص..." />
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
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{minWidth: 180,
            textTransform: "none",
            borderRadius: "12px",
            fontWeight: 600,
            boxShadow:"0 8px 20px rgba(84, 217, 132, 0.25)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow:
                "0 12px 28px rgba(34,197,94,0.4)",
            },
          }}
        >
          إضافة تخصص
        </Button>
      </Box>

      <CustomTable
        columns={columns}
        rows={filteredPlans}
        actions={tableActions}
      />

      <SubscriptionDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
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

export default SubscriptionsPage;