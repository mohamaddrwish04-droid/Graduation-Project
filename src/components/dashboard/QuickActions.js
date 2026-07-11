import {
    Paper,
    Typography,
    Grid,
    Button,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HandymanIcon from "@mui/icons-material/Handyman";
import CategoryIcon from "@mui/icons-material/Category";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export default function QuickActions() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const actions = [
        {
            title: t("all users"),
            icon: <PeopleIcon />,
            path: "/users",
        },
        {
            title: t("orders"),
            icon: <AssignmentIcon />,
            path: "/orders",
        },
        {
            title: t("ratings"),
            icon: <HandymanIcon />,
            path: "/ratings",
        },
        {
            title: t("specializations"),
            icon: <CategoryIcon />,
            path: "/specializations",
        },
        {
            title: t("subscription-plans"),
            icon: <WorkspacePremiumIcon />,
            path: "/subscriptions",
        },
        {
            title: t("subscriptions"),
            icon: <RequestQuoteIcon />,
            path: "/subscriptions",
        },
    ];

    return (
        <Paper
            sx={{p: 3,}}>
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
            >
                {t("Quick actions")}
            </Typography>

            <Grid container spacing={2}>
                {actions.map((action) => (
                    <Grid
                        key={action.title}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                        }}
                    >
                        <Button
                            fullWidth
                            startIcon={action.icon}
                            onClick={() =>
                                navigate(action.path)
                            }
                            sx={{
                                height: 70,
                                borderRadius: "16px",
                                background:"linear-gradient(135deg,#2F6BFF,#5A8CFF)",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                transition: "0.3s",

                                "&:hover": {
                                    transform:
                                        "translateY(-3px)",
                                    boxShadow:
                                        "0 12px 28px rgba(47,107,255,.35)",
                                },

                                "& svg": {
                                    fontSize: 28,
                                },
                            }}
                        >
                            {action.title}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}