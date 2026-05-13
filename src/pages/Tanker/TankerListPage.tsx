import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  useTheme,
  alpha,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useState } from "react";
import { EmptyState, ConfirmDialog } from "@components/Common";

interface Tanker {
  id: string;
  registrationNumber: string;
  capacity: number;
  currentFuel: number;
  fuelType: "Petrol" | "Diesel";
  driver: string;
  driverPhone: string;
  location: string;
  lastService: string;
  status: "Available" | "On Delivery" | "Under Maintenance";
}

const sampleTankers: Tanker[] = [
  {
    id: "TK001",
    registrationNumber: "MH01AB2345",
    capacity: 10000,
    currentFuel: 8500,
    fuelType: "Petrol",
    driver: "Raj Kumar",
    driverPhone: "9876543210",
    location: "Depot A",
    lastService: "2026-04-15",
    status: "Available",
  },
  {
    id: "TK002",
    registrationNumber: "MH01AC5678",
    capacity: 12000,
    currentFuel: 0,
    fuelType: "Diesel",
    driver: "Amir Khan",
    driverPhone: "9876543211",
    location: "On Route",
    lastService: "2026-04-20",
    status: "On Delivery",
  },
  {
    id: "TK003",
    registrationNumber: "MH01AD9012",
    capacity: 10000,
    currentFuel: 10000,
    fuelType: "Petrol",
    driver: "Priya Singh",
    driverPhone: "9876543212",
    location: "Service Center",
    lastService: "2026-05-05",
    status: "Under Maintenance",
  },
  {
    id: "TK004",
    registrationNumber: "MH01AE3456",
    capacity: 12000,
    currentFuel: 11200,
    fuelType: "Diesel",
    driver: "Vikram Patel",
    driverPhone: "9876543213",
    location: "Depot B",
    lastService: "2026-03-10",
    status: "Available",
  },
];

export const TankerListPage = () => {
  const theme = useTheme();
  const [tankers, setTankers] = useState<Tanker[]>(sampleTankers);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newTanker, setNewTanker] = useState({
    registrationNumber: "",
    capacity: "",
    driver: "",
    driverPhone: "",
    fuelType: "Petrol",
  });

  const handleAddTanker = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewTanker({
      registrationNumber: "",
      capacity: "",
      driver: "",
      driverPhone: "",
      fuelType: "Petrol",
    });
  };

  const handleSaveTanker = () => {
    if (
      newTanker.registrationNumber &&
      newTanker.capacity &&
      newTanker.driver &&
      newTanker.driverPhone
    ) {
      const tanker: Tanker = {
        id: `TK${String(tankers.length + 1).padStart(3, "0")}`,
        registrationNumber: newTanker.registrationNumber,
        capacity: parseInt(newTanker.capacity),
        currentFuel: 0,
        fuelType: newTanker.fuelType as "Petrol" | "Diesel",
        driver: newTanker.driver,
        driverPhone: newTanker.driverPhone,
        location: "Depot",
        lastService: new Date().toISOString().split("T")[0],
        status: "Available",
      };
      setTankers([tanker, ...tankers]);
      handleCloseDialog();
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      setTankers(tankers.filter((t) => t.id !== selectedId));
      setOpenConfirm(false);
      setSelectedId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "success";
      case "On Delivery":
        return "info";
      case "Under Maintenance":
        return "warning";
      default:
        return "default";
    }
  };

  const getFuelPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Paper
        sx={{
          mb: 4,
          p: { xs: 2.5, md: 3.5 },
          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 45%, ${alpha(theme.palette.info.main, 0.08)} 100%)`,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Chip label="Fleet Management" sx={{ mb: 2, fontWeight: 800 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Tanker Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Monitor and manage your fuel tanker fleet. Track capacity, driver
              assignments, and maintenance schedules.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<MuiIcons.Add />}
            onClick={handleAddTanker}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
            }}
          >
            Add Tanker
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      {tankers.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                }}
              >
                <TableCell sx={{ fontWeight: 800 }}>Tanker ID</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Registration</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">
                  Capacity (L)
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Fuel Level
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Driver</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Last Service</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tankers.map((tanker) => (
                <TableRow
                  key={tanker.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>{tanker.id}</TableCell>
                  <TableCell>{tanker.registrationNumber}</TableCell>
                  <TableCell align="right">
                    {tanker.capacity.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Stack alignItems="center" spacing={0.5}>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {tanker.currentFuel.toLocaleString()}L
                      </Typography>
                      <Box
                        sx={{
                          width: 100,
                          height: 6,
                          backgroundColor: alpha(
                            theme.palette.text.primary,
                            0.12,
                          ),
                          borderRadius: "999px",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            width: `${getFuelPercentage(tanker.currentFuel, tanker.capacity)}%`,
                            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
                            transition: "width 300ms ease",
                          }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {getFuelPercentage(tanker.currentFuel, tanker.capacity)}
                        %
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{tanker.driver}</TableCell>
                  <TableCell>{tanker.location}</TableCell>
                  <TableCell>{tanker.lastService}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={tanker.status}
                      size="small"
                      color={getStatusColor(tanker.status)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary">
                      <MuiIcons.Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(tanker.id)}
                    >
                      <MuiIcons.Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState
          title="No tankers registered"
          message="Add your first tanker to get started with fleet management."
          icon={<MuiIcons.LocalShipping />}
        />
      )}

      {/* Add Tanker Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Register New Tanker</DialogTitle>
        <DialogContent
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="Registration Number"
            value={newTanker.registrationNumber}
            onChange={(e) =>
              setNewTanker({ ...newTanker, registrationNumber: e.target.value })
            }
            placeholder="e.g., MH01AB1234"
          />
          <TextField
            fullWidth
            label="Capacity (Liters)"
            type="number"
            value={newTanker.capacity}
            onChange={(e) =>
              setNewTanker({ ...newTanker, capacity: e.target.value })
            }
          />
          <TextField
            fullWidth
            select
            label="Fuel Type"
            value={newTanker.fuelType}
            onChange={(e) =>
              setNewTanker({ ...newTanker, fuelType: e.target.value })
            }
            SelectProps={{
              native: true,
            }}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </TextField>
          <TextField
            fullWidth
            label="Driver Name"
            value={newTanker.driver}
            onChange={(e) =>
              setNewTanker({ ...newTanker, driver: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Driver Phone"
            value={newTanker.driverPhone}
            onChange={(e) =>
              setNewTanker({ ...newTanker, driverPhone: e.target.value })
            }
            placeholder="10-digit phone number"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveTanker}
            variant="contained"
            sx={{ borderRadius: "999px" }}
          >
            Register Tanker
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={openConfirm}
        title="Delete Tanker"
        message="Are you sure you want to delete this tanker record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </Box>
  );
};
