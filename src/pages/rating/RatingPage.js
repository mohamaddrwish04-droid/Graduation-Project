import { Box, Button, Rating } from "@mui/material";

import StarRateIcon from "@mui/icons-material/StarRate";
import GradeIcon from "@mui/icons-material/Grade";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from "@mui/icons-material/Visibility";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/cards/StatCard";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import CustomTable from "../../components/tables/CustomTable";

function RatingsPage() {
    const ratings = [
        {
            id: "#R001",
            customer: "أحمد محمد",
            provider: "خالد علي",
            rating: <Rating value={5} readOnly />,
            comment: "خدمة ممتازة وسريعة.",
            createdAt: "2026-05-20",
        },

        {
            id: "#R002",
            customer: "سارة أحمد",
            provider: "محمد حسن",
            rating: <Rating value={4} readOnly />,
            comment: "جيد جداً والتعامل محترم.",
            createdAt: "2026-05-21",
        },

        {
            id: "#R003",
            customer: "عمر خالد",
            provider: "أحمد محمود",
            rating: <Rating value={3} readOnly />,
            comment: "الخدمة جيدة لكن تأخر بالحضور.",
            createdAt: "2026-05-22",
        },

        {
            id: "#R004",
            customer: "لينا يوسف",
            provider: "علي سعيد",
            rating: <Rating value={1} readOnly />,
            comment: "لم يتم حل المشكلة.",
            createdAt: "2026-05-23",
        },
    ];

    const columns = [
        {
            field: "id",
            header: "رقم التقييم",
        },
        {
            field: "customer",
            header: "العميل",
        },
        {
            field: "provider",
            header: "مقدم الخدمة",
        },
        {
            field: "rating",
            header: "التقييم",
        },
        {
            field: "comment",
            header: "التعليق",
        },
        {
            field: "createdAt",
            header: "تاريخ التقييم",
        },
    ];

    const tableActions = () => (
        <Button
            startIcon={<VisibilityIcon />}
            variant="contained"
            size="small"
            sx={{
                background:
                    "linear-gradient(135deg,#2F6BFF,#4D7CFE)",

                borderRadius: "10px",

                textTransform: "none",

                boxShadow:
                    "0 6px 18px rgba(47,107,255,0.25)",

                transition: "0.3s",

                "&:hover": {
                    transform: "translateY(-2px)",

                    boxShadow:
                        "0 10px 24px rgba(47,107,255,0.4)",
                },
            }}
        >
            عرض
        </Button>
    );

    return (
        <>
            <PageHeader
                title="إدارة التقييمات"
                subtitle="متابعة تقييمات العملاء وتحليل جودة الخدمات المقدمة."
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
                    title="إجمالي التقييمات"
                    value="850"
                    icon={<StarRateIcon />}
                />

                <StatCard
                    title="متوسط التقييم"
                    value="4.7"
                    icon={<GradeIcon />}
                />

                <StatCard
                    title="5 نجوم"
                    value="620"
                    icon={<ThumbUpAltIcon />}
                />

                <StatCard
                    title="تقييمات منخفضة"
                    value="35"
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
                    <SearchInput placeholder="ابحث عن تقييم..." />
                </Box>

                <Box sx={{ width: 220 }}>
                    <FilterSelect
                        label="التقييم"
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
                        options={[
                            {
                                value: "all",
                                label: "كل التخصصات",
                            },
                            {
                                value: "electricity",
                                label: "كهرباء",
                            },
                            {
                                value: "plumbing",
                                label: "سباكة",
                            },
                            {
                                value: "ac",
                                label: "تكييف",
                            },
                        ]}
                    />
                </Box>
            </Box>

            <CustomTable
                columns={columns}
                rows={ratings}
                actions={tableActions}
            />
        </>
    );
}

export default RatingsPage;