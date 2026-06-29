import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import {
    Paper,
    Typography,
} from "@mui/material";

export default function UsersProvidersChart({
    summary,
}) {
    const data = [
        {
            name: "المستخدمون",
            العدد: summary?.totalUsers ?? 0,
        },
        {
            name: "مقدمو الخدمة",
            العدد: summary?.totalProviders ?? 0,
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
                مقارنة المستخدمين ومقدمي الخدمة
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >
                <BarChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.08)"
                    />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="العدد"
                        fill="#2F6BFF"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
}