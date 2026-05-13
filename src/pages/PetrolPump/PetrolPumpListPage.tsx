import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useState } from "react";
import { EmptyState } from "@components/Common";
import { ConfirmDialog } from "@components/Common";

// Sample data
const samplePumps = [
  {
    id: "1",
    name: "Pump A - Delhi",
    location: "New Delhi",
    managerName: "Rajesh Kumar",
    contactNumber: "9876543210",
    petrolCapacity: 5000,
    dieselCapacity: 4000,
    currentPetrolStock: 3500,
    currentDieselStock: 2800,
  },
  {
    id: "2",
    name: "Pump B - Gurgaon",
    location: "Gurgaon",
    managerName: "Priya Singh",
    contactNumber: "9876543211",
    petrolCapacity: 6000,
    dieselCapacity: 5000,
    currentPetrolStock: 4200,
    currentDieselStock: 3500,
  },
  {
    id: "3",
    name: "Pump C - Noida",
    location: "Noida",
    managerName: "Amit Patel",
    contactNumber: "9876543212",
    petrolCapacity: 4500,
    dieselCapacity: 3500,
    currentPetrolStock: 1200,
    currentDieselStock: 1500,
  },
];

export default function PetrolPumpListPage() {
  const [pumps, setPumps] = useState(samplePumps);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPump, setSelectedPump] = useState<
    (typeof samplePumps)[0] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    managerName: "",
    contactNumber: "",
    petrolCapacity: 0,
    dieselCapacity: 0,
  });

  const handleOpenDialog = (pump?: (typeof samplePumps)[0]) => {
    if (pump) {
      setFormData(pump);
      setSelectedPump(pump);
    } else {
      setFormData({
        name: "",
        location: "",
        managerName: "",
        contactNumber: "",
        petrolCapacity: 0,
        dieselCapacity: 0,
      });
      setSelectedPump(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: "",
      location: "",
      managerName: "",
      contactNumber: "",
      petrolCapacity: 0,
      dieselCapacity: 0,
    });
  };

  const handleSave = () => {
    if (selectedPump) {
      setPumps(
        pumps.map((p) =>
          p.id === selectedPump.id ? { ...selectedPump, ...formData } : p,
        ),
      );
    } else {
      setPumps([
        ...pumps,
        {
          ...formData,
          id: Date.now().toString(),
          currentPetrolStock: formData.petrolCapacity * 0.7,
          currentDieselStock: formData.dieselCapacity * 0.7,
        } as (typeof samplePumps)[0],
      ]);
    }
    handleCloseDialog();
  };

  const handleDeleteClick = (pump: (typeof samplePumps)[0]) => {
    setSelectedPump(pump);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPump) {
      setPumps(pumps.filter((p) => p.id !== selectedPump.id));
    }
    setOpenDeleteDialog(false);
  };

  const filteredPumps = pumps.filter(
    (pump) =>
      pump.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pump.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStockLevel = (
    current: number,
    capacity: number,
  ): "high" | "medium" | "low" => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 70) return "high";
    if (percentage >= 30) return "medium";
    return "low";
  };

  const getStockColor = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return "success";
      case "medium":
        return "warning";
      case "low":
        return "error";
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <div>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Petrol Pump Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage and monitor all petrol pumps
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<MuiIcons.Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Pump
        </Button>
      </Box>

      {/* Search Box */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by pump name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <MuiIcons.Search sx={{ mr: 1, color: "action.active" }} />
            ),
          }}
          size="small"
        />
      </Paper>

      {/* Table */}
      {filteredPumps.length > 0 ? (
        <TableContainer component={Card}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Pump Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell align="center">Petrol Stock</TableCell>
                <TableCell align="center">Diesel Stock</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPumps.map((pump) => {
                const petrolLevel = getStockLevel(
                  pump.currentPetrolStock,
                  pump.petrolCapacity,
                );
                const dieselLevel = getStockLevel(
                  pump.currentDieselStock,
                  pump.dieselCapacity,
                );
                const petrolPercentage = Math.round(
                  (pump.currentPetrolStock / pump.petrolCapacity) * 100,
                );
                const dieselPercentage = Math.round(
                  (pump.currentDieselStock / pump.dieselCapacity) * 100,
                );

                return (
                  <TableRow key={pump.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{pump.name}</TableCell>
                    <TableCell>{pump.location}</TableCell>
                    <TableCell>{pump.managerName}</TableCell>
                    <TableCell align="center">
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold" }}
                        >
                          {pump.currentPetrolStock}/{pump.petrolCapacity}L
                        </Typography>
                        <Chip
                          label={`${petrolPercentage}%`}
                          size="small"
                          color={getStockColor(petrolLevel)}
                          variant="outlined"
                          sx={{ display: "block", mt: 0.5 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold" }}
                        >
                          {pump.currentDieselStock}/{pump.dieselCapacity}L
                        </Typography>
                        <Chip
                          label={`${dieselPercentage}%`}
                          size="small"
                          color={getStockColor(dieselLevel)}
                          variant="outlined"
                          sx={{ display: "block", mt: 0.5 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="Active" color="success" size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenDialog(pump)}
                        startIcon={<MuiIcons.Edit />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="text"
                        onClick={() => handleDeleteClick(pump)}
                        startIcon={<MuiIcons.Delete />}
                        sx={{ ml: 1 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState
          title="No petrol pumps found"
          message="Create your first petrol pump to get started"
          icon={<MuiIcons.LocalGasStation sx={{ fontSize: 48 }} />}
          action={{ label: "Add Pump", onClick: () => handleOpenDialog() }}
        />
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedPump ? "Edit Petrol Pump" : "Add New Petrol Pump"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Pump Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Manager Name"
            value={formData.managerName}
            onChange={(e) =>
              setFormData({ ...formData, managerName: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contact Number"
            value={formData.contactNumber}
            onChange={(e) =>
              setFormData({ ...formData, contactNumber: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Petrol Capacity (Liters)"
            type="number"
            value={formData.petrolCapacity}
            onChange={(e) =>
              setFormData({
                ...formData,
                petrolCapacity: parseInt(e.target.value),
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Diesel Capacity (Liters)"
            type="number"
            value={formData.dieselCapacity}
            onChange={(e) =>
              setFormData({
                ...formData,
                dieselCapacity: parseInt(e.target.value),
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete Petrol Pump"
        message={`Are you sure you want to delete ${selectedPump?.name}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenDeleteDialog(false)}
        isDangerous={true}
        confirmText="Delete"
      />
    </Box>
  );
}
