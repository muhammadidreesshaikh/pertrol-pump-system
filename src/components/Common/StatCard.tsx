import {
  alpha,
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  subtitle?: string;
  loading?: boolean;
}

export const StatCard = ({
  title,
  value,
  icon,
  color = "primary",
  subtitle,
  loading = false,
}: StatCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.75)}`,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.96)} 0%, ${alpha(
                theme.palette.background.default,
                0.96,
              )} 100%)`
            : `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(
                theme.palette.background.default,
                0.92,
              )} 100%)`,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: (theme) =>
            `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.12)}, transparent 28%)`,
          pointerEvents: "none",
        },
        transition:
          "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
          borderColor: "rgba(37, 99, 235, 0.18)",
        },
      }}
    >
      <CardContent sx={{ pb: 2.25, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="body2"
              sx={{ fontWeight: 700 }}
            >
              {title}
            </Typography>
            {loading ? (
              <Skeleton width={100} height={40} variant="text" />
            ) : (
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, mt: 0.5, letterSpacing: "-0.03em" }}
              >
                {value}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block", fontWeight: 700 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "16px",
                display: "grid",
                placeItems: "center",
                fontSize: "1.4rem",
                color: `${color}.main`,
                backgroundColor: `${color}.main`,
                opacity: 0.12,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
