import {
    Paper,
    Typography,
    Stack,
    Box,
} from "@mui/material";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTranslation } from "react-i18next";

export default function SystemStatusCard({summary,}) {
    const { t } = useTranslation();
    const items = [
        {
            title: t("orders pending"),
            value: summary?.waitingForOffersOrders ?? 0,
            color: "#F59E0B",
            icon: <PendingActionsIcon />,
        },
        {
            title: t("orders in progress"),
            value: summary?.inProgressOrders ?? 0,
            color: "#3B82F6",
            icon: <BuildCircleIcon />,
        },
        {
            title: t("orders completed"),
            value: summary?.completedOrders ?? 0,
            color: "#22C55E",
            icon: <CheckCircleIcon />,
        },
        {
            title: t("Active subscriptions"),
            value: summary?.activeSubscriptions ?? 0,
            color: "#8B5CF6",
            icon: <WorkspacePremiumIcon />,
        },
    ];

    return (
        <Paper
            sx={{
                p: 3,
                height: "100%",

            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
            >
                {t("System status")}
            </Typography>

            <Stack spacing={2}>
                {items.map((item) => (
                    <Box
                        key={item.title}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 2,
                            borderRadius: 3,
                            background:
                                "rgba(255,255,255,0.03)",
                            borderLeft: `5px solid ${item.color}`,
                        }}
                    >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            color: item.color,
                            display: "flex",
                            alignItems: "center",

                            "& svg": {
                                fontSize: 32,
                            },
                        }}
                    >
                        {item.icon}
                    </Box>

                    <Typography>
                        {item.title}
                    </Typography>
                </Box>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    color={item.color}
                >
                    {item.value}
                </Typography>
            </Box>
                ))}
        </Stack>
        </Paper >
    );
}