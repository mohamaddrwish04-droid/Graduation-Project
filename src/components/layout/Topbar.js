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
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";

import {
  useThemeContext,
} from "../../context/ThemeContext";


export default function Topbar() {

  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useAuth();

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

  const currentTime =
    dateTime.toLocaleTimeString(
      "ar-EG"
    );

  const currentDate =
    dateTime.toLocaleDateString(
      "ar-EG"
    );

  const { mode, toggleTheme } =
    useThemeContext();

  return (
    <Box
      sx={{
        width: "100%",
        height: "10vh",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        background: "MuiAppBar.styleOverrides",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        backdropFilter: "blur(12px)",
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
          <NotificationsIcon
            sx={{
              fontSize: 28,
              cursor: "pointer",
              color: "text.primary",
            }}
          />

        </Badge>
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: "text.primary",
          }}
        >
          {
            mode === "dark"
              ? <LightModeIcon />
              : <DarkModeIcon />
          }
        </IconButton>

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
        <Chip
          label={user.name}
          color="primary"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
          }}
        />

        <Avatar
          sx={{
            width: 42,
            height: 42,
            background:"linear-gradient(135deg,#2F6BFF,#6C63FF)",
            fontWeight: 700,
            boxShadow:"0 0 20px rgba(47,107,255,0.45)",
          }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>

        <Button
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            minWidth: "auto",
            px: 1.5,
            py: 0.7,
            borderRadius: "10px",
            color: "#EF4444",
            fontWeight: 600,
            fontSize: "0.85rem",
            textTransform: "none",
            border: "1px solid rgba(239,68,68,0.35)",
            backgroundColor: "transparent",
            transition: "all .25s ease",
            "&:hover": {
              backgroundColor:"rgba(239,68,68,0.08)",
              border:"1px solid rgba(239,68,68,0.6)",
              transform:"translateY(-1px)",
            },
          }}
        >
          خروج
        </Button>
      </Box>
    </Box>
  );
}