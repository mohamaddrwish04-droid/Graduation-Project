import { getUsers, getProviders } from "../../services/userService";
import { useState, useEffect } from "react";


export function useUserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const loadUsers = async () => {
        try {
            setLoading(true);
            const usersData = await getUsers();
            const providersData = await getProviders();

            const mergedUsers = usersData.items.filter((u) => u.role !== 1)
                .map((user) => ({
                    ...user,
                    provider:
                        providersData.items.find(
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

    const filteredUsers = users.filter((user) => {
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

    const totalUsers = users.length;

    const customers = users.filter(
        (u) => !u.hasProviderProfile
    ).length;

    const providers = users.filter(
        (u) => u.hasProviderProfile
    ).length;

    return {
        loading, search, setSearch, roleFilter,
        setRoleFilter, statusFilter, setStatusFilter,
        open, setOpen, selectedUser, filteredUsers, totalUsers,
        customers, providers, handleViewDetails
    }
}