import Grid from "@mui/material/Grid";

import PeopleIcon from "@mui/icons-material/People";
import HandymanIcon from "@mui/icons-material/Handyman";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useTranslation } from "react-i18next";


import StatCard from "../cards/StatCard";


export default function SummaryCardsRow({ summary }) {
    const { t } = useTranslation();
    return (
        <Grid
            container
            spacing={3}
            sx={{ mb: 4 }}
        >
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <StatCard
                    title={t("all users")}
                    value={summary?.totalUsers ?? 0}
                    icon={<PeopleIcon />}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <StatCard
                    title={t("providers")}
                    value={summary?.totalProviders ?? 0}
                    icon={<HandymanIcon />}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <StatCard
                    title={t("all orders")}
                    value={summary?.totalOrders ?? 0}
                    icon={<AssignmentIcon />}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <StatCard
                    title={t("order pending ")}
                    value={summary?.waitingForOffersOrders ?? 0}
                    icon={<PendingActionsIcon />}
                />
            </Grid>
        </Grid>
    );
}