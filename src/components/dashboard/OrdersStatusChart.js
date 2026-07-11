import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import {
    Paper,
    Typography,
} from "@mui/material";
import {useTranslation} from "react-i18next";


const COLORS = [
    "#F59E0B",
    "#3B82F6",
    "#22C55E",
    "#EF4444",
];

export default function OrdersStatusChart({summary,}) {
    const {t} = useTranslation();
    const data = [
        {
            name: t("orders pending"),
            value:
                summary?.waitingForOffersOrders ?? 0,
        },
        {
            name: t("orders in progress"),
            value:
                summary?.inProgressOrders ?? 0,
        },
        {
            name: t("orders completed"),
            value:
                summary?.completedOrders ?? 0,
        },
        {
            name: t("orders canceled"),
            value: Math.max(
                0,
                (summary?.totalOrders ?? 0) -
                (summary?.waitingForOffersOrders ?? 0) -
                (summary?.inProgressOrders ?? 0) -
                (summary?.completedOrders ?? 0)
            ),
        },
    ];

    return (
        <Paper
            sx={{
                p: 3,
                height: 420,

            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
            >
                {t("Orders Status")}
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        innerRadius={65}
                        paddingAngle={4}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={
                                    COLORS[
                                    index %
                                    COLORS.length
                                    ]
                                }
                            />
                        ))}
                    </Pie>

                    <Tooltip />

                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
}