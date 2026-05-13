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
  LinearProgress,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useState } from "react";
import { EmptyState, ConfirmDialog } from "@components/Common";

interface Delivery {
  id: string;
  orderId: string;
  client: string;
  origin: string;
  destination: string;
  fuelType: "Petrol" | "Diesel";
  quantity: number;
  startDate: string;
  expectedDate: string;
  driver: string;
  tanker: string;
  status: "Pending" | "In Transit" | "Delivered" | "Cancelled";
  progress: number;
}

const sampleDeliveries: Delivery[] = [
  {
    id: "DEL001",
    orderId: "ORD001",
    client: "ABC Petrol Pump",
    origin: "Central Depot",
    destination: "South Mumbai",
    fuelType: "Petrol",
    quantity: 5000,
    startDate: "2026-05-12",
    expectedDate: "2026-05-12",
    driver: "Raj Kumar",
    tanker: "TK001",
    status: "In Transit",
    progress: 65,
  },
  {
    id: "DEL002",
    orderId: "ORD002",
    client: "XYZ Logistics",
    origin: "Central Depot",
    destination: "Pune",
    fuelType: "Diesel",
    quantity: 3500,
    startDate: "2026-05-11",
    expectedDate: "2026-05-11",
    driver: "Amir Khan",
    tanker: "TK002",
    status: "Delivered",
    progress: 100,
  },
  {
    id: "DEL003",
    orderId: "ORD003",
    client: "Fast Delivery Service",
    origin: "Central Depot",
    destination: "Delhi",
    fuelType: "Petrol",
    quantity: 4000,
    startDate: "2026-05-13",
    expectedDate: "2026-05-14",
    driver: "Priya Singh",
    tanker: "TK003",
    status: "Pending",
    progress: 0,
  },
  {
    id: "DEL004",
    orderId: "ORD004",
    client: "Premium Fleet",
    origin: "Central Depot",
    destination: "Bangalore",
    fuelType: "Diesel",
    quantity: 6000,
    startDate: "2026-05-10",
    expectedDate: "2026-05-11",
    driver: "Vikram Patel",
    tanker: "TK004",
    status: "Cancelled",
    progress: 0,
  },
];

export const DeliveryManagementPage = () => {
  const theme = useTheme();
  const [deliveries, setDeliveries] = useState<Delivery[]>(sampleDeliveries);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newDelivery, setNewDelivery] = useState({
    orderId: "",
    client: "",
    destination: "",
    fuelType: "Petrol",
    quantity: "",
    driver: "",
    tanker: "",
  });

  const handleAddDelivery = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewDelivery({
      orderId: "",
      client: "",
      destination: "",
      fuelType: "Petrol",
      quantity: "",
      driver: "",
      tanker: "",
    });
  };

  const handleSaveDelivery = () => {
    if (
      newDelivery.orderId &&
      newDelivery.client &&
      newDelivery.destination &&
      newDelivery.quantity &&
      newDelivery.driver &&
      newDelivery.tanker
    ) {
      const delivery: Delivery = {
        id: `DEL${String(deliveries.length + 1).padStart(3, "0")}`,
        orderId: newDelivery.orderId,
        client: newDelivery.client,
        origin: "Central Depot",
        destination: newDelivery.destination,
        fuelType: newDelivery.fuelType as "Petrol" | "Diesel",
        quantity: parseInt(newDelivery.quantity),
        startDate: new Date().toISOString().split("T")[0],
        expectedDate: new Date(Date.now() + 86400000)
          .toISOString()
          .split("T")[0],
        driver: newDelivery.driver,
        tanker: newDelivery.tanker,
        status: "Pending",
        progress: 0,
      };
      setDeliveries([delivery, ...deliveries]);
      handleCloseDialog();
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      setDeliveries(deliveries.filter((d) => d.id !== selectedId));
      setOpenConfirm(false);
      setSelectedId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "In Transit":
        return "info";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Paper
        sx={{
          mb: 4,
          p: { xs: 2.5, md: 3.5 },
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
            <Chip
              label="Logistics Operations"
              sx={{ mb: 2, fontWeight: 800 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Delivery Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Track deliveries in real-time, manage routes, and optimize
              logistics operations.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<MuiIcons.Add />}
            onClick={handleAddDelivery}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
            }}
          >
            New Delivery
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      {deliveries.length > 0 ? (
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
                <TableCell sx={{ fontWeight: 800 }}>Delivery ID</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Client</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Route</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">
                  Quantity (L)
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Driver</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Expected</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Progress</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow
                  key={delivery.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>{delivery.id}</TableCell>
                  <TableCell>{delivery.orderId}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {delivery.client}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="body2">{delivery.origin}</Typography>
                      <MuiIcons.ArrowRightAlt fontSize="small" />
                      <Typography variant="body2">
                        {delivery.destination}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    {delivery.quantity.toLocaleString()}
                  </TableCell>
                  <TableCell>{delivery.driver}</TableCell>
                  <TableCell>{delivery.expectedDate}</TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <LinearProgress
                        variant="determinate"
                        value={delivery.progress}
                        sx={{
                          height: 6,
                          borderRadius: "999px",
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.12,
                          ),
                          "& .MuiLinearProgress-bar": {
                            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        align="center"
                        sx={{ fontWeight: 700 }}
                      >
                        {delivery.progress}%
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={delivery.status}
                      size="small"
                      color={getStatusColor(delivery.status)}
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
                      onClick={() => handleDeleteClick(delivery.id)}
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
          title="No deliveries scheduled"
          message="Create a new delivery to get started with order management."
          icon={<MuiIcons.LocalShipping />}
        />
      )}

      {/* Add Delivery Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Create New Delivery</DialogTitle>
        <DialogContent
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="Order ID"
            value={newDelivery.orderId}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, orderId: e.target.value })
            }
            placeholder="e.g., ORD001"
          />
          <TextField
            fullWidth
            label="Client Name"
            value={newDelivery.client}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, client: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Destination"
            value={newDelivery.destination}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, destination: e.target.value })
            }
          />
          <TextField
            fullWidth
            select
            label="Fuel Type"
            value={newDelivery.fuelType}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, fuelType: e.target.value })
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
            label="Quantity (Liters)"
            type="number"
            value={newDelivery.quantity}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, quantity: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Driver Name"
            value={newDelivery.driver}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, driver: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Tanker ID"
            value={newDelivery.tanker}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, tanker: e.target.value })
            }
            placeholder="e.g., TK001"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveDelivery}
            variant="contained"
            sx={{ borderRadius: "999px" }}
          >
            Create Delivery
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={openConfirm}
        title="Delete Delivery"
        message="Are you sure you want to delete this delivery record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </Box>
  );
};
