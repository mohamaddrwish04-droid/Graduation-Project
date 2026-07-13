

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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SubscriptionDialog from "./SubscriptionDialog";
import { useSubscriptionPlanPage } from "./useSubscriptionp=PlanPage";
import { useTranslation } from "react-i18next";

function SubscriptionsPage() {
  const { t } = useTranslation();
  const {
    averagePrice, inactivePlans, activePlans, totalPlans,
    handleEdit, handleAdd, handleSubmit, handleToggleStatus,
    filteredPlans, searchTerm, setSearchTerm,
    snackbar, setSnackbar, statusFilter, setStatusFilter,
    dialogMode, loading,
    formData,setFormData,
    openDialog, setOpenDialog
  } = useSubscriptionPlanPage();



  const columns = [
    {
      field: "name",
      header: t("specialization"),
    },
    {
      field: "price",
      header: t("amount"),
    },
    {
      field: "durationInDays",
      header: t("duration"),
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
        variant="outlined"
        size="small"
        startIcon={<EditIcon />}
        onClick={() => {
          handleEdit(row);
        }}
        sx={{
          textTransform: "none",
          borderRadius: "10px",
          boxShadow: "0 6px 18px rgba(47,107,255,0.25)",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        {t("edit")}
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



  return (
    <>
      <PageHeader
        title={t("manage specializations-plans")}
        subtitle={t("disc-specializations-plans")}
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
          title={t("plans")}
          value={totalPlans}
          icon={<WorkspacePremiumIcon />}
        />

        <StatCard
          title={t("active specializations")}
          value={activePlans}
          icon={<CheckCircleIcon />}
        />
        <StatCard
          title={t("inactive specializations")}
          value={inactivePlans}
          icon={<BlockIcon />}
        />

        <StatCard
          title={t("average price")}
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
          sx={{
            minWidth: 180,
            textTransform: "none",
            borderRadius: "12px",
            fontWeight: 600,
            boxShadow: "0 8px 20px rgba(84, 217, 132, 0.25)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow:
                "0 12px 28px rgba(34,197,94,0.4)",
            },
          }}
        >
          {t("add new plan")}
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