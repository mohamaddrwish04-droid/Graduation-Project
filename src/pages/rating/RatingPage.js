import { Box, } from "@mui/material";

import StarRateIcon from "@mui/icons-material/StarRate";
import GradeIcon from "@mui/icons-material/Grade";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/cards/StatCard";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import CustomTable from "../../components/tables/CustomTable";
import { getOrders } from "../../services/orderService";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getSpecializations } from "../../services/specializationService";
import { useTranslation } from "react-i18next";
import { combine } from "stylis";

function RatingsPage() {
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
    const { t } = useTranslation();




    const ratedOrders = orders.filter((o) => o.hasRating);

    const tableRows = ratedOrders.filter((order) => {
        const search = searchText.toLowerCase();
        const matchesSearch =
            order.customerName
                .toLowerCase()
                .includes(search) ||
            order.selectedProviderName
                .toLowerCase()
                .includes(search);

        const matchesSpecialization =
            specializationFilter === "all" ||
            order.specializationId ===
            Number(specializationFilter);

        const matchesRating =
            ratingFilter === "all" ||
            order.ratingValue === Number(ratingFilter);

        return (
            matchesSearch &&
            matchesSpecialization &&
            matchesRating
        );
    })
        .map((order) => ({
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
    const columns = [
        {
            field: "id",
            header: t("ID"),
        },
        {
            field: "customerName",
            header: t("customer"),
        },
        {
            field: "providerName",
            header: t("provider"),
        },
        {
            field: "specializtionName",
            header: t("specialization"),
        },
        {
            field: "ratingValue",
            header: t("rating"),
        },
        {
            field: "ratingcreatedAt",
            header: t("rating date"),
        },
    ];

    useEffect(() => {
        loadorders();
        loadSpecializations();
    }, []);

    const loadorders = async () => {
        try {
            setLoading(true);
            const data = await getOrders();
            setorders(data);
        } catch {
            setSnackbar({
                open: true,
                severity: "error",
                message:
                    "فشل تحميل الخطط",
            });
        }finally{
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
        }finally{
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

    return (
        <>
            <PageHeader
                title={t("manage ratings")}
                subtitle={t("disc-ratings")}
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: 3,
                    mb: 4,
                }}
            >
                <StatCard
                    title={t("all ratings")}
                    value={totalRatings}
                    icon={<StarRateIcon />}
                />

                <StatCard
                    title={t("average rating")}
                    value={averageRating}
                    icon={<GradeIcon />}
                />

                <StatCard
                    title={t("five stars")} 
                    value={fiveStars}
                    icon={<ThumbUpAltIcon />}
                />

                <StatCard
                    title={t("low ratings")}
                    value={lowRatings}
                    icon={<WarningAmberIcon />}
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
                    <SearchInput placeholder="ابحث عن تقييم..."
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </Box>

                <Box sx={{ width: 220 }}>
                    <FilterSelect
                        label="التقييم"
                        value={ratingFilter}
                        onChange={(e) => {
                            setRatingFilter(e.target.value);
                        }}
                        options={[
                            {
                                value: "all",
                                label: "الكل",
                            },
                            {
                                value: "5",
                                label: "5 نجوم",
                            }, {
                                value: "4",
                                label: "4 نجوم",
                            },
                            {
                                value: "3",
                                label: "3 نجوم",
                            },
                            {
                                value: "2",
                                label: "نجمتان",
                            },
                            {
                                value: "1",
                                label: "نجمة واحدة",
                            },
                        ]}
                    />
                </Box>

                <Box sx={{ width: 220 }}>
                    <FilterSelect
                        label="التخصص"
                        value={specializationFilter}
                        onChange={(e) =>
                            setspecializationsFilter(e.target.value)
                        }
                        options={[
                            {
                                value: "all",
                                label: "الكل",
                            },

                            ...specializations.map((sp) => ({
                                value: sp.id,
                                label: sp.name,
                            })),
                        ]}
                    />
                </Box>
            </Box>

            <CustomTable
                columns={columns}
                rows={tableRows}
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

export default RatingsPage;