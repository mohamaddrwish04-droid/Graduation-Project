
import { getOrders } from "../../services/orderService";
import { useState, useEffect } from "react";
import { getSpecializations } from "../../services/specializationService";





export function useRating() {
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });
    const [orders, setorders] = useState([]);
    const [specializationFilter, setspecializationsFilter] = useState("all");
    const [specializations, setSpecializations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");

    const ratedOrders = orders.filter((o) => o.hasRating);


    orders.map((order) => ({
        id: order.id,
        customerName: order.customerName,
        providerName:
            order.selectedProviderName,
        specializationName:
            order.specializationName,
        ratingValue: order.ratingValue,
        ratingCreatedAt:
            order.ratingCreatedAt,
    }));


    useEffect(() => {
        loadorders();
        loadSpecializations();
    }, []);

    const loadorders = async () => {
        try {
            setLoading(true);
            const data = await getOrders();
            setorders(data.items);
        } catch {
            setSnackbar({
                open: true,
                severity: "error",
                message:
                    "فشل تحميل الخطط",
            });
        } finally {
            setLoading(false);
        }
    };
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
    const totalRatings = ratedOrders.length;

    const averageRating =
        ratedOrders.length > 0
            ? (
                ratedOrders.reduce(
                    (sum, order) =>
                        sum +
                        order.ratingValue,
                    0
                ) /
                ratedOrders.length
            ).toFixed(1)
            : 0;

    const fiveStars =
        ratedOrders.filter(
            (order) =>
                order.ratingValue === 5
        ).length;

    const lowRatings =
        ratedOrders.filter(
            (order) =>
                order.ratingValue < 5
        ).length;

    return {
        lowRatings, totalRatings, fiveStars, averageRating,
        searchText, setSearchText, ratingFilter, setRatingFilter,
        specializationFilter, setspecializationsFilter,
        specializations, snackbar, setSnackbar, ratedOrders,
    }
}