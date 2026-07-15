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
import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";
import SettingsIcon from "@mui/icons-material/Settings";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";

const drawerWidth = 260;

const navItems = [
    {
        text: "page home",
        path: "/dashboard",
        icon: <DashboardIcon />,
    },
    {
        text: "users",
        path: "/users",
        icon: <PeopleIcon />,
    },
    {
        text: "specializations",
        path: "/specializations",
        icon: <CategoryIcon />,
    },

    {
        text: "subscriptions",
        path: "/subscriptions",
        icon: <PaymentIcon />,
    },
    {
        text: "subscription-plans",
        path: "/subscription-plans",
        icon: <ClearAllIcon />,
    },
    {
        text: "ratings",
        path: "/ratings",
        icon: <StarIcon />,
    },
];

function Sidebar() {
    const { direction } = useLanguage();
    const { t } = useTranslation();




    return (
        <Drawer
            variant="permanent"
            anchor={direction === "rtl" ? "left" : "right"}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    p: 2,
                },
            }}>
            <Toolbar id="sidebar-toolbar">
                <Box
                    component="img"
                    src={"/logo.png"}
                    alt="logo"
                    id="sidebar-logo"
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
                        sx={{mb: 0.5,}}
                        >
                        <ListItemIcon
                            sx={{
                                color: "inherit",
                                minWidth: "40px",
                                "& svg": {
                                    fontSize: "20px",
                                },
                            }} >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={t(item.text)} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;