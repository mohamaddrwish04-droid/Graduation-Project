import Grid from "@mui/material/Grid";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";

import StatCard from "../../components/cards/StatCard";

function DashboardHome() {
    return (
        <Grid container spacing={3}>
            <Grid size={3}>
                <StatCard
                    title="إجمالي المستخدمين"
                    value="1,250"
                    icon={<PeopleIcon />}
                />
            </Grid>

            <Grid size={3}>
                <StatCard
                    title="إجمالي الطلبات"
                    value="487"
                    icon={<ReceiptIcon />}
                />
            </Grid>

            <Grid size={3}>
                <StatCard
                    title="الاشتراكات النشطة"
                    value="92"
                    icon={<PaymentIcon />}
                />
            </Grid>

            <Grid size={3}>
                <StatCard
                    title="متوسط التقييم"
                    value="4.8"
                    icon={<StarIcon />}
                />
            </Grid>
        </Grid>
    );
}

export default DashboardHome;