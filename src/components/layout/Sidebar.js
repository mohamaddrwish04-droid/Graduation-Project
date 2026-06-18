import { NavLink } from "react-router-dom";

import {
    Drawer,
    Box,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";


import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";
import SettingsIcon from "@mui/icons-material/Settings";
import ClearAllIcon from '@mui/icons-material/ClearAll';

const drawerWidth = 260;

const navItems = [
    {
        text: "اللوحة الرئيسية",
        path: "/dashboard",
        icon: <DashboardIcon />,
    },
    {
        text: "المستخدمين",
        path: "/users",
        icon: <PeopleIcon />,
    },
    {
        text: "التخصصات",
        path: "/specializations",
        icon: <CategoryIcon />,
    },
    {
        text: "الطلبات",
        path: "/orders",
        icon: <ReceiptIcon />,
    },
    {
        text: "الاشتراكات",
        path: "/subscriptions",
        icon: <PaymentIcon />,
    },
    {
        text: "خطط الاشتراكات",
        path: "/subscription-plans",
        icon: <ClearAllIcon />,
    },
    {
        text: "التقييمات",
        path: "/ratings",
        icon: <StarIcon />,
    },
    {
        text: "الإعدادات",
        path: "/settings",
        icon: <SettingsIcon />,
    },
];

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    p: 2,
                },
            }}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    borderBottom:
                        "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <Box
                    component="img"
                    src={"/logo.png"}
                    alt="logo"
                    sx={{
                        width: 60,
                        height: 60,
                        objectFit: "contain",

                        filter:
                            "drop-shadow(0 0 12px rgba(47,107,255,.35))",
                    }}
                />

                <Box>


                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Admin Panel
                    </Typography>
                </Box>
            </Toolbar>
            <List>
                {navItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={NavLink}
                        to={item.path}
                        sx={{
                            borderRadius: "12px",
                            mb: 0.5,
                            color: "#fff",
                            "&.active": {
                                backgroundColor: "rgba(47,107,255,0.18)",
                                border: "1px solid rgba(47,107,255,0.25)",
                            },
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.05)",
                            },
                        }}>
                        <ListItemIcon
                            sx={{
                                color: "inherit",
                                minWidth: "40px",
                                "& svg": {
                                    fontSize: "25px",
                                },
                            }} >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;