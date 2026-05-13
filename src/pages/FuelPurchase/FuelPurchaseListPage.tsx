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

interface FuelPurchase {
  id: string;
  supplier: string;
  quantity: number;
  fuelType: "Petrol" | "Diesel";
  pricePerLiter: number;
  totalCost: number;
  date: string;
  status: "Pending" | "Completed" | "Invoiced";
}

const samplePurchases: FuelPurchase[] = [
  {
    id: "FP001",
    supplier: "IndianOil Corporation",
    quantity: 5000,
    fuelType: "Petrol",
    pricePerLiter: 96.5,
    totalCost: 482500,
    date: "2026-05-12",
    status: "Completed",
  },
  {
    id: "FP002",
    supplier: "BPCL Ltd",
    quantity: 3500,
    fuelType: "Diesel",
    pricePerLiter: 87.2,
    totalCost: 305200,
    date: "2026-05-11",
    status: "Completed",
  },
  {
    id: "FP003",
    supplier: "Hindustan Petroleum",
    quantity: 4000,
    fuelType: "Petrol",
    pricePerLiter: 96.2,
    totalCost: 384800,
    date: "2026-05-10",
    status: "Invoiced",
  },
  {
    id: "FP004",
    supplier: "IndianOil Corporation",
    quantity: 2500,
    fuelType: "Diesel",
    pricePerLiter: 87.0,
    totalCost: 217500,
    date: "2026-05-09",
    status: "Pending",
  },
];

export const FuelPurchaseListPage = () => {
  const theme = useTheme();
  const [purchases, setPurchases] = useState<FuelPurchase[]>(samplePurchases);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newPurchase, setNewPurchase] = useState({
    supplier: "",
    quantity: "",
    fuelType: "Petrol",
    pricePerLiter: "",
  });

  const handleAddPurchase = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPurchase({
      supplier: "",
      quantity: "",
      fuelType: "Petrol",
      pricePerLiter: "",
    });
  };

  const handleSavePurchase = () => {
    if (
      newPurchase.supplier &&
      newPurchase.quantity &&
      newPurchase.pricePerLiter
    ) {
      const purchase: FuelPurchase = {
        id: `FP${String(purchases.length + 1).padStart(3, "0")}`,
        supplier: newPurchase.supplier,
        quantity: parseInt(newPurchase.quantity),
        fuelType: newPurchase.fuelType as "Petrol" | "Diesel",
        pricePerLiter: parseFloat(newPurchase.pricePerLiter),
        totalCost:
          parseInt(newPurchase.quantity) *
          parseFloat(newPurchase.pricePerLiter),
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
      };
      setPurchases([purchase, ...purchases]);
      handleCloseDialog();
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      setPurchases(purchases.filter((p) => p.id !== selectedId));
      setOpenConfirm(false);
      setSelectedId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Invoiced":
        return "primary";
      case "Pending":
        return "warning";
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
            <Chip
              label="Procurement Management"
              sx={{ mb: 2, fontWeight: 800 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Fuel Purchases
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage fuel purchases from suppliers. Track quantity, pricing, and
              delivery status.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<MuiIcons.Add />}
            onClick={handleAddPurchase}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
            }}
          >
            New Purchase
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      {purchases.length > 0 ? (
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
                <TableCell sx={{ fontWeight: 800 }}>Purchase ID</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Supplier</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">
                  Quantity (L)
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Fuel Type</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">
                  Price/L
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">
                  Total Cost
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchases.map((purchase) => (
                <TableRow
                  key={purchase.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>{purchase.id}</TableCell>
                  <TableCell>{purchase.supplier}</TableCell>
                  <TableCell align="right">
                    {purchase.quantity.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={purchase.fuelType}
                      size="small"
                      variant="outlined"
                      color={
                        purchase.fuelType === "Petrol" ? "primary" : "secondary"
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    ₹{purchase.pricePerLiter.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    ₹{purchase.totalCost.toLocaleString()}
                  </TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={purchase.status}
                      size="small"
                      color={getStatusColor(purchase.status)}
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
                      onClick={() => handleDeleteClick(purchase.id)}
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
          title="No fuel purchases yet"
          message="Create your first fuel purchase record to get started."
          icon={<MuiIcons.LocalGasStation />}
        />
      )}

      {/* Add Purchase Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800 }}>New Fuel Purchase</DialogTitle>
        <DialogContent
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="Supplier Name"
            value={newPurchase.supplier}
            onChange={(e) =>
              setNewPurchase({ ...newPurchase, supplier: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Quantity (Liters)"
            type="number"
            value={newPurchase.quantity}
            onChange={(e) =>
              setNewPurchase({ ...newPurchase, quantity: e.target.value })
            }
          />
          <TextField
            fullWidth
            select
            label="Fuel Type"
            value={newPurchase.fuelType}
            onChange={(e) =>
              setNewPurchase({ ...newPurchase, fuelType: e.target.value })
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
            label="Price per Liter (₹)"
            type="number"
            value={newPurchase.pricePerLiter}
            onChange={(e) =>
              setNewPurchase({ ...newPurchase, pricePerLiter: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSavePurchase}
            variant="contained"
            sx={{ borderRadius: "999px" }}
          >
            Create Purchase
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={openConfirm}
        title="Delete Purchase"
        message="Are you sure you want to delete this fuel purchase record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </Box>
  );
};
