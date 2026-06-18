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


export default function Topbar() {

  const navigate = useNavigate();
  const {user} = useAuth();
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

  return (
    <Box
      sx={{
        width: "100%",
        height: "10vh",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent:"space-between",
        px: 4,
        background:"linear-gradient(90deg,#111827,#1A1D2E,#222B45)",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
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
              color: "#fff",
            }}
          />
        </Badge>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.75)",
            fontWeight: 500,
          }}
        >
          {currentDate}
        </Typography>

        <Typography
          sx={{
            color: "#fff",
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

            background:
              "linear-gradient(135deg,#2F6BFF,#6C63FF)",

            fontWeight: 700,

            boxShadow:
              "0 0 20px rgba(47,107,255,0.45)",
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
            backgroundColor:
                "rgba(239,68,68,0.08)",

            border:
                "1px solid rgba(239,68,68,0.6)",

            transform:
                "translateY(-1px)",
        },
    }}
>
    خروج
</Button>
      </Box>
    </Box>
  );
}