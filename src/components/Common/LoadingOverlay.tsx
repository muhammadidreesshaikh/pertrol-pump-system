import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const LoadingOverlay = ({
  isVisible,
  message = "Loading...",
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(2, 6, 23, 0.52)",
        backdropFilter: "blur(12px)",
        zIndex: 9999,
      }}
    >
      <CircularProgress color="primary" thickness={4} />
      <Typography sx={{ mt: 2, color: "common.white", fontWeight: 700 }}>
        {message}
      </Typography>
    </Box>
  );
};
