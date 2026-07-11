import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import {useTranslation} from "react-i18next";

import {
    Paper,
    Typography,
} from "@mui/material";

export default function UsersProvidersChart({summary,}) {
    const {t} = useTranslation();
    const data = [
        {
            name: t("users"),
            العدد: summary?.totalUsers ?? 0,
        },
        {
            name: t("providers"),
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
               {t("Users and Providers")}
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