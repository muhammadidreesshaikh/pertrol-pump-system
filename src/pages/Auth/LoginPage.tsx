import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
  Stack,
  Chip,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        px: 2,
        py: 4,
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(37, 99, 235, 0.24), transparent 28%), radial-gradient(circle at bottom right, rgba(245, 158, 11, 0.18), transparent 24%), linear-gradient(180deg, #07111f 0%, #0b1220 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "8% auto auto 5%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.10)",
          filter: "blur(24px)",
          animation: "floatSlow 7s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: "auto 6% 10% auto",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(245, 158, 11, 0.10)",
          filter: "blur(28px)",
          animation: "floatSlow 9s ease-in-out infinite",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            borderRadius: 1,
            border: "1px solid rgba(148, 163, 184, 0.22)",
            background:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.92) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 30px 90px rgba(2, 8, 23, 0.45)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            }}
          >
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                color: "#e2e8f0",
                background:
                  "linear-gradient(160deg, rgba(37, 99, 235, 0.95) 0%, rgba(14, 165, 233, 0.85) 100%)",
                position: "relative",
                minHeight: { xs: 220, md: 560 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Chip
                  label="Fuel logistics platform"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.18)",
                    color: "#fff",
                    fontWeight: 700,
                    mb: 3,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 4,
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "rgba(255,255,255,0.16)",
                    }}
                  >
                    <MuiIcons.LocalGasStation sx={{ fontSize: 30 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
                    >
                      FuelHub
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                      Smart operations for petrol pumps, tankers and deliveries
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Stack spacing={2} sx={{ mt: 6 }}>
                {[
                  "Inventory, logistics and recovery in one place",
                  "Professional dashboards with live business insights",
                  "Built for fast day-to-day operations",
                ].map((line) => (
                  <Box
                    key={line}
                    sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        boxShadow: "0 0 0 4px rgba(255,255,255,0.16)",
                      }}
                    />
                    <Typography variant="body2" sx={{ opacity: 0.95 }}>
                      {line}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                p: { xs: 3, md: 5 },
                backgroundColor: "rgba(255,255,255,0.02)",
                color: "#e2e8f0",
              }}
            >
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.24em", color: "#94a3b8" }}
              >
                Admin access
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mt: 0.5,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#f8fafc",
                }}
              >
                Sign in to your workspace
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#cbd5e1" }}
                style={{ marginTop: 10, marginBottom: 24 }}
              >
                Manage operations, stock and deliveries from a clean
                professional dashboard.
              </Typography>

              {error && (
                <Alert
                  severity="error"
                  sx={{ width: "100%", mb: 2.5 }}
                  onClose={clearError}
                >
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%" }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  autoFocus
                  sx={{
                    "& .MuiInputLabel-root": { color: "#94a3b8" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
                    "& .MuiOutlinedInput-root": {
                      color: "#e2e8f0",
                      backgroundColor: "rgba(15, 23, 42, 0.45)",
                      "& fieldset": {
                        borderColor: "rgba(148, 163, 184, 0.22)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(96, 165, 250, 0.55)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
                    },
                    "& .MuiFormHelperText-root": { color: "#94a3b8" },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: "#94a3b8" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
                    "& .MuiOutlinedInput-root": {
                      color: "#e2e8f0",
                      backgroundColor: "rgba(15, 23, 42, 0.45)",
                      "& fieldset": {
                        borderColor: "rgba(148, 163, 184, 0.22)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(96, 165, 250, 0.55)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
                    },
                    "& .MuiFormHelperText-root": { color: "#94a3b8" },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.65 }}
                  type="submit"
                  disabled={loading}
                  size="large"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Link
                    href="/forgot-password"
                    sx={{
                      textDecoration: "none",
                      color: "#cbd5e1",
                      cursor: "pointer",
                      fontWeight: 700,
                      "&:hover": {
                        color: "#93c5fd",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
              </Box>

              <Paper
                sx={{
                  mt: 4,
                  p: 2.5,
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(148, 163, 184, 0.18)",
                  color: "#e2e8f0",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 800, color: "#cbd5e1" }}
                >
                  Demo Credentials
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  <strong>Admin:</strong> admin@fuelhub.com / password
                </Typography>
                <Typography variant="caption" display="block">
                  <strong>Manager:</strong> manager@fuelhub.com / password
                </Typography>
                <Typography variant="caption" display="block">
                  <strong>Accountant:</strong> accountant@fuelhub.com / password
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
