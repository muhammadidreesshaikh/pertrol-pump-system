import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  Switch,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import * as MuiIcons from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useUIStore } from "@store/uiStore";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  onMenuClick?: () => void;
}

export const TopBar = ({ onMenuClick }: TopBarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useUIStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate("/login");
  };

  const userInitials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ml: { md: 260 },
        width: { md: "calc(100% - 260px)" },
        backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.72),
        borderBottom: (theme) =>
          `1px solid ${alpha(theme.palette.divider, 0.8)}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 76,
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <IconButton
            color="primary"
            onClick={onMenuClick}
            sx={{
              display: { xs: "flex", md: "none" },
              backgroundColor: "rgba(37, 99, 235, 0.08)",
              "&:hover": { backgroundColor: "rgba(37, 99, 235, 0.14)" },
            }}
          >
            <MuiIcons.Menu />
          </IconButton>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              Fuel operations
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              Dashboard
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.75,
              borderRadius: 999,
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.08),
              border: (theme) =>
                `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
            }}
          >
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size="small"
              icon={<MuiIcons.LightMode sx={{ fontSize: 18 }} />}
              checkedIcon={<MuiIcons.DarkMode sx={{ fontSize: 18 }} />}
            />
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "text.secondary" }}
            >
              {isDarkMode ? "Dark" : "Light"}
            </Typography>
          </Box>

          <IconButton
            color="inherit"
            sx={{
              position: "relative",
              backgroundColor: "rgba(37, 99, 235, 0.08)",
              "&:hover": { backgroundColor: "rgba(37, 99, 235, 0.14)" },
            }}
          >
            <MuiIcons.Notifications />
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 9,
                height: 9,
                background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)",
                borderRadius: "50%",
                boxShadow: "0 0 0 3px rgba(255,255,255,0.7)",
              }}
            />
          </IconButton>

          <IconButton
            onClick={handleMenuOpen}
            sx={{
              p: 0,
              ml: 0.25,
              borderRadius: 999,
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
                backgroundImage:
                  "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
                boxShadow: "0 10px 22px rgba(37, 99, 235, 0.28)",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              {userInitials}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            PaperProps={{
              sx: {
                mt: 1.25,
                minWidth: 240,
                p: 1,
              },
            }}
          >
            <MenuItem disabled sx={{ opacity: 1, py: 1.25 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.role}
                </Typography>
              </Box>
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleMenuClose}>
              <MuiIcons.Person sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <MuiIcons.Settings sx={{ mr: 2 }} />
              Settings
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <MuiIcons.Logout sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
