import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../services/dashboardService";
import SummaryCardsRow from "../../components/dashboard/SummaryCardsRow";
import OrdersStatusChart from "../../components/dashboard/OrdersStatusChart";
import UsersProvidersChart from "../../components/dashboard/UsersProvidersChart";
import SystemStatusCard from "../../components/dashboard/SystemStatusCard";
import QuickActions from "../../components/dashboard/QuickActions";
import PageHeader from "../../components/common/PageHeader";
import { Grid } from "@mui/material";




function DashboardHome() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);

            const data = await getDashboardSummary();

            setSummary(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <PageHeader
                title="لوحة التحكم الرئيسية"
                subtitle="نظرة شاملة على مؤشرات النظام وإحصائيات المنصة مع وصول سريع إلى أهم العمليات الإدارية."
            />
            <SummaryCardsRow summary={summary} />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <OrdersStatusChart summary={summary} />
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <UsersProvidersChart summary={summary} />
                </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <SystemStatusCard
                    summary={summary}
                />
            </Grid>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <QuickActions />
                </Grid>
            </Grid>
        </>
    );
}

export default DashboardHome;