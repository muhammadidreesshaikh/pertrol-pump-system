import { Box, Container } from "@mui/material";
import { ReactNode, useState } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <TopBar onMenuClick={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 9, md: 10.5 },
          pb: { xs: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
          width: "100%",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
              : `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            animation: "fadeUp 480ms ease both",
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};
