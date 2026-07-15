import {
  Box,
  Avatar,
  Chip,
  Typography,
  Button,
  Badge,
  Divider
} from "@mui/material";
import {
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import PersonIcon from '@mui/icons-material/Person';
import ProfileDialog from "../profile/ProfileDialog";
import ChangePasswordDialog from "../profile/ChangePassworDialog";
import { buildImageUrl } from "../../utils/buildImageUrl"
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] =useState(false);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
          label={user.fullName}
          color="primary"
        />



        <Avatar
          id="user-avatar"
          onClick={handleOpenMenu}
          sx={{
            cursor: "pointer",
            width: 42,
            height: 42,
          }}
          src={
            buildImageUrl(
              user?.profileImageUrl
            )}
        >
          {!user?.profileImageUrl &&
            user?.fullName?.charAt(0).toUpperCase()}
        </Avatar>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          transformOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
        >
          <MenuItem
            onClick={() => {
              setProfileOpen(true);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>

            عرض البروفايل
          </MenuItem>

          <MenuItem
            onClick={() => {
              setPasswordOpen(true);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <LockResetIcon fontSize="small" />
            </ListItemIcon>

            تغيير كلمة المرور
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleLogout();
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>

           تسجيل الخروج
          </MenuItem>
        </Menu>


      </Box>
      <ProfileDialog
        open={profileOpen}
        onClose={() =>
          setProfileOpen(false)
        }
        user={user}
      />

      <ChangePasswordDialog
        open={passwordOpen}
        onClose={() =>
          setPasswordOpen(false)
        }
      />
    </Box >
  );
}