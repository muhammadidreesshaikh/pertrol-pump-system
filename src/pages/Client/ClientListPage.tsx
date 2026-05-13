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

interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  outstandingAmount: number;
  status: "Active" | "Inactive" | "Blocked";
}

const sampleClients: Client[] = [
  {
    id: "CL001",
    name: "ABC Petrol Pump",
    contactPerson: "Ramesh Gupta",
    email: "ramesh@abcpump.com",
    phone: "9876543200",
    address: "Near City Center, Mumbai",
    totalOrders: 45,
    totalSpent: 2250000,
    outstandingAmount: 125000,
    status: "Active",
  },
  {
    id: "CL002",
    name: "XYZ Logistics",
    contactPerson: "Priya Sharma",
    email: "priya@xyzlogistics.com",
    phone: "9876543201",
    address: "Industrial Zone, Pune",
    totalOrders: 28,
    totalSpent: 1680000,
    outstandingAmount: 0,
    status: "Active",
  },
  {
    id: "CL003",
    name: "Fast Delivery Service",
    contactPerson: "Aditya Singh",
    email: "aditya@fastdelivery.com",
    phone: "9876543202",
    address: "Transport Nagar, Delhi",
    totalOrders: 62,
    totalSpent: 3720000,
    outstandingAmount: 250000,
    status: "Active",
  },
  {
    id: "CL004",
    name: "Premium Fleet Corp",
    contactPerson: "Vikram Patel",
    email: "vikram@premiumfleet.com",
    phone: "9876543203",
    address: "Port Area, Chennai",
    totalOrders: 15,
    totalSpent: 900000,
    outstandingAmount: 0,
    status: "Inactive",
  },
];

export const ClientListPage = () => {
  const theme = useTheme();
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleAddClient = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewClient({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const handleSaveClient = () => {
    if (
      newClient.name &&
      newClient.contactPerson &&
      newClient.email &&
      newClient.phone
    ) {
      const client: Client = {
        id: `CL${String(clients.length + 1).padStart(3, "0")}`,
        name: newClient.name,
        contactPerson: newClient.contactPerson,
        email: newClient.email,
        phone: newClient.phone,
        address: newClient.address,
        totalOrders: 0,
        totalSpent: 0,
        outstandingAmount: 0,
        status: "Active",
      };
      setClients([client, ...clients]);
      handleCloseDialog();
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      setClients(clients.filter((c) => c.id !== selectedId));
      setOpenConfirm(false);
      setSelectedId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "warning";
      case "Blocked":
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
            <Chip label="Customer Management" sx={{ mb: 2, fontWeight: 800 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Clients Directory
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage all client accounts, track orders, payments, and business
              relationships.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<MuiIcons.Add />}
            onClick={handleAddClient}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
            }}
          >
            Add Client
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      {clients.length > 0 ? (
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
                <TableCell sx={{ fontWeight: 800 }}>Client ID</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Contact Person</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">
                  Total Orders
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">
                  Total Spent
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">
                  Outstanding
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow
                  key={client.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>{client.id}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{client.name}</TableCell>
                  <TableCell>{client.contactPerson}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell align="right">{client.totalOrders}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    ₹{client.totalSpent.toLocaleString()}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color:
                        client.outstandingAmount > 0
                          ? theme.palette.warning.main
                          : "inherit",
                    }}
                  >
                    ₹{client.outstandingAmount.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={client.status}
                      size="small"
                      color={getStatusColor(client.status)}
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
                      onClick={() => handleDeleteClick(client.id)}
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
          title="No clients added yet"
          message="Add your first client to start managing orders and payments."
          icon={<MuiIcons.Business />}
        />
      )}

      {/* Add Client Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Add New Client</DialogTitle>
        <DialogContent
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="Company Name"
            value={newClient.name}
            onChange={(e) =>
              setNewClient({ ...newClient, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Contact Person"
            value={newClient.contactPerson}
            onChange={(e) =>
              setNewClient({ ...newClient, contactPerson: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={newClient.email}
            onChange={(e) =>
              setNewClient({ ...newClient, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Phone"
            value={newClient.phone}
            onChange={(e) =>
              setNewClient({ ...newClient, phone: e.target.value })
            }
            placeholder="10-digit phone number"
          />
          <TextField
            fullWidth
            label="Address"
            multiline
            rows={2}
            value={newClient.address}
            onChange={(e) =>
              setNewClient({ ...newClient, address: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveClient}
            variant="contained"
            sx={{ borderRadius: "999px" }}
          >
            Add Client
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={openConfirm}
        title="Delete Client"
        message="Are you sure you want to delete this client record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </Box>
  );
};
