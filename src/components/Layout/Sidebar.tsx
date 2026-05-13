import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { NAVIGATION_ITEMS } from "@constants/index";
import { useAuth } from "@hooks/useAuth";
import { UserRole } from "@/types";

const DRAWER_WIDTH = 260;

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { hasRole } = useAuth();

  const filteredItems = NAVIGATION_ITEMS.filter((item) =>
    item.permission.some((perm) => hasRole(perm as UserRole)),
  );

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
            : `linear-gradient(180deg, #ffffff 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2.5,
          textAlign: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            mx: "auto",
            mb: 1.5,
            borderRadius: "18px",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
            boxShadow: "0 14px 28px rgba(37, 99, 235, 0.28)",
          }}
        >
          <MuiIcons.LocalGasStation />
        </Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          FuelHub
        </Typography>
        {/* <Chip
          size="small"
          label="Operations Suite"
          sx={{ mt: 1.25, fontWeight: 700 }}
        /> */}
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1, pt: 2, px: 1.25 }}>
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = (MuiIcons as Record<string, unknown>)[
            item.icon as keyof typeof MuiIcons
          ] as React.ElementType;

          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                selected={isActive}
                sx={{
                  px: 1.6,
                  py: 1.25,
                  borderRadius: 0,
                  backgroundColor: isActive
                    ? `${theme.palette.primary.main}14`
                    : "transparent",
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  border: isActive
                    ? `1px solid ${theme.palette.primary.main}20`
                    : "1px solid transparent",
                  boxShadow: isActive
                    ? `0 12px 26px ${theme.palette.primary.main}14`
                    : "none",
                  transition: "all 180ms ease",
                  "&:hover": {
                    backgroundColor: `${theme.palette.primary.main}10`,
                    transform: "translateX(2px)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}14`,
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.main}20`,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? theme.palette.primary.main : "inherit",
                  }}
                >
                  {IconComponent ? <IconComponent /> : null}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          textAlign: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © 2026 FuelHub Dashboard
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            display: { xs: "none", md: "flex" },
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: `0 8px 24px ${theme.palette.primary.main}1a`,
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: `0 8px 24px ${theme.palette.primary.main}1a`,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};
