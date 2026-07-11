import {
  Box,
  Avatar,
  Chip,
  Typography,
  Button,
  Badge,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

import "./layout.css";

export default function Topbar() {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useAuth();
  const { mode, toggleTheme } = useThemeContext();
  const { language, changeLanguage } = useLanguage();
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const currentTime = dateTime.toLocaleTimeString("ar-EG");
  const currentDate = dateTime.toLocaleDateString("ar-EG");

  return (
    <Box id="topbar"
      sx={{
        px: 4,
        background: "MuiAppBar.styleOverrides",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Badge
          badgeContent={3}
          color="error"
        >
          <NotificationsIcon id="notification-icon" />
        </Badge>

        <IconButton
          onClick={toggleTheme}
          sx={{ color: "text.primary", }}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Button
          variant="contained"
          onClick={() =>
            changeLanguage(
              language === "ar"
                ? "en"
                : "ar"
            )
          }
        >
          {language === "ar"
            ? "English"
            : "العربية"}
        </Button>



        <Typography
          sx={{
            color: "text.primary",
            fontWeight: 500,
          }}
        >
          {currentDate}
        </Typography>

        <Typography
          sx={{
            color: "text.primary",
            fontWeight: 700,
          }}
        >
          {currentTime}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Chip id="user-chip"
          label={user.name}
          color="primary"
        />

        <Avatar id="user-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>

        <Button
          id="logout-button"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            px: 1.5,
            py: 0.7,
            color: "error.main",
          }}
        >
          {t("logout")}
        </Button>
      </Box>
    </Box>
  );
}