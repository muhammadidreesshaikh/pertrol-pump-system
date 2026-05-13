import { Box, Typography, Button } from "@mui/material";
import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({
  title,
  message,
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 8,
        textAlign: "center",
        px: 2,
      }}
    >
      {icon && (
        <Box
          sx={{
            width: 72,
            height: 72,
            mb: 2,
            display: "grid",
            placeItems: "center",
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(14, 165, 233, 0.08))",
            color: "primary.main",
          }}
        >
          {icon}
        </Box>
      )}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 420 }}>
        {message}
      </Typography>
      {action && (
        <Button variant="contained" onClick={action.onClick} size="large">
          {action.label}
        </Button>
      )}
    </Box>
  );
};
