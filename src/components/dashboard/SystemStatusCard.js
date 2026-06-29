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

export default function SystemStatusCard({
    summary,
}) {
    const items = [
        {
            title: "بانتظار عروض",
            value: summary?.waitingForOffersOrders ?? 0,
            color: "#F59E0B",
            icon: <PendingActionsIcon />,
        },
        {
            title: "قيد التنفيذ",
            value: summary?.inProgressOrders ?? 0,
            color: "#3B82F6",
            icon: <BuildCircleIcon />,
        },
        {
            title: "مكتملة",
            value: summary?.completedOrders ?? 0,
            color: "#22C55E",
            icon: <CheckCircleIcon />,
        },
        {
            title: "اشتراكات نشطة",
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
                حالة النظام
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