import { useEffect, useMemo, useState } from "react";
import { getOrders } from "../../services/orderService";
import { getSpecializations } from "../../services/specializationService";


export function useOrders() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [specializationFilter, setSpecializationFilter] = useState("all");
    const [specializations, setSpecializations] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        loadOrders();
        loadSpecializations();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);

            const data = await getOrders();

            setOrders(data.items);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const loadSpecializations = async () => {
        try {
            const data =
                await getSpecializations();

            setSpecializations(data);
        } catch (error) {
            console.error(error);
        }
    };

    const statistics = useMemo(() => {
        return {
            total: orders.length,

            waiting: orders.filter(
                (o) => o.status === 0
            ).length,

            inProgress: orders.filter(
                (o) => o.status === 2
            ).length,

            completed: orders.filter(
                (o) => o.status === 4
            ).length,

            cancelled: orders.filter(
                (o) => o.status === 5
            ).length,
        };
    }, [orders]);
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch =
                order.customerName
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                order.description
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                order.id
                    .toString()
                    .includes(search);

            const matchesStatus =
                statusFilter === "all" ||
                order.status === statusFilter;

            const matchesSpecialization =
                specializationFilter ===
                "all" ||
                order.specializationId ===
                specializationFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesSpecialization
            );
        });
    }, [
        orders,
        search,
        statusFilter,
        specializationFilter,
    ]);
    const paginatedOrders = filteredOrders.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    useEffect(() => {
        setPage(0);
    }, [
        search,
        statusFilter,
        specializationFilter
    ]);

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return {
        handleRowsPerPageChange, paginatedOrders,
        filteredOrders, statistics, loadOrders,
        loadSpecializations, selectedOrder, setSelectedOrder,
        search, setSearch, openDialog, setOpenDialog,
        specializations, setSpecializations, specializationFilter,
        setSpecializationFilter, loading, statusFilter,
        setStatusFilter, rowsPerPage, setRowsPerPage,
        page, setPage, orders, setOrders
    }
}