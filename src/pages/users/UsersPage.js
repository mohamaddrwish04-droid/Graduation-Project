
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/cards/StatCard";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import CustomTable from "../../components/tables/CustomTable";
import UserDetailsDialog from "./UserDetailsDialog";
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import HandymanIcon from '@mui/icons-material/Handyman';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useUserPage } from "./useUserPage";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import{TablePagination} from "@mui/material"




export default function UsersPage() {
    const { user } = useAuth();
    console.log(user);

    const {
        search, setSearch, roleFilter,
        setRoleFilter, statusFilter, setStatusFilter,
        open, setOpen, selectedUser, filteredUsers, totalUsers,
        customers, providers, handleViewDetails, page, setPage,
        handleRowsPerPageChange, rowsPerPage
    } = useUserPage();

    const { t } = useTranslation();


    const columns = [
        {
            field: "fullName",
            header: t("name"),
        },
        {
            field: "email",
            header: t("email"),
        },
        {
            field: "phoneNumber",
            header: t("phone"),
        },
        {
            field: "isEmailVerified",
            header: t("status"),
        },
        {
            field: "createdAt",
            header: t("created at"),
        },
    ];

    return (
        <div>
            <PageHeader
                title={t("manage users")}
                subtitle={t("disc-users")}
            />
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={4}>
                    <StatCard
                        title={t("all users")}
                        value={totalUsers}
                        icon={<PeopleIcon />}
                    />
                </Grid>

                <Grid size={4}>
                    <StatCard
                        title={t("customers")}
                        value={customers}
                        icon={<PersonIcon />}
                    />
                </Grid>

                <Grid size={4}>
                    <StatCard
                        title={t("providers")}
                        value={providers}
                        icon={<HandymanIcon />}
                    />
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    mb: 3,
                }}>
                <SearchInput
                    placeholder="ابحث عن مستخدم..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <FilterSelect
                    label="الدور"
                    value={roleFilter}
                    onChange={(e) => {
                        setRoleFilter(e.target.value);
                    }}
                    options={[
                        { value: "all", label: "الكل" },
                        { value: "customer", label: "عميل" },
                        { value: "provider", label: "مقدم خدمة" },
                    ]}
                />
                <FilterSelect
                    label="الحالة"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                    }}
                    options={[
                        { value: "all", label: "الكل" },
                        { value: "verified", label: "مفعل" },
                        { value: "unverified", label: "غير مفعل" },
                    ]}
                />
            </Box>
            <CustomTable
                columns={columns}
                rows={filteredUsers}
                actions={(row) => (
                    row.provider && (
                        <Button
                            startIcon={<VisibilityIcon />}
                            variant="contained"
                            size="small"
                            onClick={() =>
                                handleViewDetails(row)
                            }
                        >
                            {t("view details")}
                        </Button>
                    )
                )}
            />
            <TablePagination
                component="div"
                count={filteredUsers.length}
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


            <UserDetailsDialog
                open={open}
                onClose={() => setOpen(false)}
                user={selectedUser}
            />
        </div>
    )
}