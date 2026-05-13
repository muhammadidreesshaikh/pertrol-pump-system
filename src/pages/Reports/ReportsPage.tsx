import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Chip,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Grid,
  useTheme,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useState } from "react";
import { EmptyState } from "@components/Common";

interface Report {
  id: string;
  name: string;
  type: string;
  generatedDate: string;
  period: string;
  status: "Ready" | "Processing" | "Failed";
}

const reportTypes = [
  {
    id: "sales",
    name: "Sales Report",
    icon: <MuiIcons.TrendingUp />,
    description: "Comprehensive sales data and revenue analysis",
  },
  {
    id: "inventory",
    name: "Inventory Report",
    icon: <MuiIcons.Inventory2 />,
    description: "Stock levels and fuel availability across pumps",
  },
  {
    id: "delivery",
    name: "Delivery Report",
    icon: <MuiIcons.LocalShipping />,
    description: "Delivery schedules, performance, and metrics",
  },
  {
    id: "financial",
    name: "Financial Report",
    icon: <MuiIcons.AttachMoney />,
    description: "Revenue, expenses, and profit analysis",
  },
  {
    id: "compliance",
    name: "Compliance Report",
    icon: <MuiIcons.CheckCircle />,
    description: "Regulatory compliance and audit logs",
  },
  {
    id: "customer",
    name: "Customer Report",
    icon: <MuiIcons.Business />,
    description: "Customer transactions and satisfaction metrics",
  },
];

const generatedReports: Report[] = [
  {
    id: "REP001",
    name: "Sales Report",
    type: "May 2026",
    generatedDate: "2026-05-12",
    period: "May 1-12, 2026",
    status: "Ready",
  },
  {
    id: "REP002",
    name: "Inventory Report",
    type: "Weekly",
    generatedDate: "2026-05-11",
    period: "May 5-11, 2026",
    status: "Ready",
  },
  {
    id: "REP003",
    name: "Delivery Report",
    type: "Monthly",
    generatedDate: "2026-05-10",
    period: "April 1-30, 2026",
    status: "Ready",
  },
  {
    id: "REP004",
    name: "Financial Report",
    type: "Quarterly",
    generatedDate: "2026-05-01",
    period: "Q1 2026",
    status: "Ready",
  },
];

export const ReportsPage = () => {
  const theme = useTheme();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("sales");
  const [reports, setReports] = useState<Report[]>(generatedReports);

  const handleGenerateReport = () => {
    const selectedType = reportTypes.find((t) => t.id === selectedReportType);
    if (selectedType && dateFrom && dateTo) {
      const newReport: Report = {
        id: `REP${String(reports.length + 1).padStart(3, "0")}`,
        name: selectedType.name,
        type: "Custom",
        generatedDate: new Date().toISOString().split("T")[0],
        period: `${dateFrom} to ${dateTo}`,
        status: "Ready",
      };
      setReports([newReport, ...reports]);
      setDateFrom("");
      setDateTo("");
      setSelectedReportType("sales");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "success";
      case "Processing":
        return "info";
      case "Failed":
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
        <Stack spacing={2}>
          <Box>
            <Chip label="Business Reports" sx={{ mb: 2, fontWeight: 800 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Reports & Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Generate and download comprehensive business reports for analysis
              and decision making.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Report Generator */}
      <Paper
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.5)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5 }}>
          Generate New Report
        </Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Report Type"
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
            >
              {reportTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              type="date"
              label="To Date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<MuiIcons.Download />}
              onClick={handleGenerateReport}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
              }}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Report Types Grid */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, mb: 3, letterSpacing: "-0.01em" }}
      >
        Available Report Types
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reportTypes.map((reportType) => (
          <Grid item xs={12} sm={6} md={4} key={reportType.id}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.info.main, 0.04)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: "all 200ms ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              }}
            >
              <CardContent>
                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
                      color: "#fff",
                      fontSize: 28,
                    }}
                  >
                    {reportType.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {reportType.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {reportType.description}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="outlined"
                    endIcon={<MuiIcons.ArrowRight />}
                    sx={{ borderRadius: "999px" }}
                  >
                    Generate
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Generated Reports Table */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, mb: 3, letterSpacing: "-0.01em" }}
      >
        Generated Reports
      </Typography>
      {reports.length > 0 ? (
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
                <TableCell sx={{ fontWeight: 800 }}>Report ID</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Period</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Generated On</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow
                  key={report.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>{report.id}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>{report.generatedDate}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={report.status}
                      size="small"
                      color={getStatusColor(report.status)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      title="Download Report"
                    >
                      <MuiIcons.Download />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="default"
                      title="View Report"
                    >
                      <MuiIcons.Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="default"
                      title="Share Report"
                    >
                      <MuiIcons.Share />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState
          title="No reports generated yet"
          message="Generate your first report using the form above."
          icon={<MuiIcons.Assessment />}
        />
      )}
    </Box>
  );
};
