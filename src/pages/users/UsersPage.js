
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/cards/StatCard";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import CustomTable from "../../components/tables/CustomTable";
import UserDetailsDialog from "./UserDetailsDialog";
import { getUsers, getProviders } from "../../services/userService";

import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import HandymanIcon from '@mui/icons-material/Handyman';
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";





export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };
    const totalUsers = users.length;

    const customers =
        users.filter(
            (u) => !u.hasProviderProfile
        ).length;

    const providers =
        users.filter(
            (u) => u.hasProviderProfile
        ).length;

    const loadUsers = async () => {
        try {
            setLoading(true);

            const usersData =
                await getUsers();

            const providersData =
                await getProviders();

            const mergedUsers =
                usersData
                    .filter(
                        (u) => u.role !== 1
                    )
                    .map((user) => ({
                        ...user,

                        provider:
                            providersData.find(
                                (p) =>
                                    p.userId ===
                                    user.id
                            ) || null,
                    }));

            setUsers(mergedUsers);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers =
        users.filter((user) => {

            const matchesSearch =
                user.fullName
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesRole =
                roleFilter === "all"
                    ? true
                    : roleFilter ===
                        "provider"
                        ? user.hasProviderProfile
                        : !user.hasProviderProfile;

            const matchesStatus =
                statusFilter === "all"
                    ? true
                    : statusFilter ===
                        "verified"
                        ? user.isEmailVerified
                        : !user.isEmailVerified;

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });
    const formattedUsers = filteredUsers.map(
        (user) => ({
            ...user,
            status: user.isEmailVerified
                ? (<CheckCircleIcon color="success" fontSize="small" />)
                : (<CancelIcon color="error" fontSize="small" />)
        })
    );
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
            <UserDetailsDialog
                open={open}
                onClose={() => setOpen(false)}
                user={selectedUser}
            />
        </div>
    )
}