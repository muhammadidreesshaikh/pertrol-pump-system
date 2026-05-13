import {
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  useTheme,
  alpha,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useState } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { month: "Jan", petrol: 45000, diesel: 38000, revenue: 8100000 },
  { month: "Feb", petrol: 42000, diesel: 36000, revenue: 7500000 },
  { month: "Mar", petrol: 52000, diesel: 44000, revenue: 9200000 },
  { month: "Apr", petrol: 48000, diesel: 40000, revenue: 8600000 },
  { month: "May", petrol: 58000, diesel: 49000, revenue: 10300000 },
  { month: "Jun", petrol: 61000, diesel: 52000, revenue: 10800000 },
];

const productSales = [
  { name: "Petrol", value: 58, fill: "#3b82f6" },
  { name: "Diesel", value: 35, fill: "#f59e0b" },
  { name: "Additives", value: 7, fill: "#10b981" },
];

const topClients = [
  { name: "ABC Petrol Pump", sales: 850000, orders: 45 },
  { name: "XYZ Logistics", sales: 680000, orders: 28 },
  { name: "Fast Delivery", sales: 920000, orders: 62 },
  { name: "Premium Fleet", sales: 450000, orders: 15 },
];

export const SalesAnalyticsPage = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedProduct, setSelectedProduct] = useState("all");

  const totalSales = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
  const avgMonthly = Math.round(totalSales / monthlyData.length);
  const totalVolume = monthlyData.reduce(
    (sum, m) => sum + m.petrol + m.diesel,
    0,
  );
  const topClient = topClients[0];

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
              label="Business Intelligence"
              sx={{ mb: 2, fontWeight: 800 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Sales & Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Comprehensive sales data, trends analysis, and performance
              metrics.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
              select
              size="small"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="1month">Last 1 Month</MenuItem>
              <MenuItem value="3months">Last 3 Months</MenuItem>
              <MenuItem value="6months">Last 6 Months</MenuItem>
              <MenuItem value="1year">Last 1 Year</MenuItem>
            </TextField>
            <TextField
              select
              size="small"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="all">All Products</MenuItem>
              <MenuItem value="petrol">Petrol Only</MenuItem>
              <MenuItem value="diesel">Diesel Only</MenuItem>
            </TextField>
          </Stack>
        </Stack>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              border: (theme) =>
                `1px solid ${alpha(theme.palette.divider, 0.75)}`,
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
              transition:
                "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
                borderColor: "rgba(37, 99, 235, 0.18)",
              },
            }}
          >
            <CardContent>
              <Stack spacing={1.5}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ fontWeight: 700 }}
                    >
                      Total Revenue
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>
                      ₹{(totalSales / 10000000).toFixed(1)}Cr
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
                      color: "#fff",
                    }}
                  >
                    <MuiIcons.TrendingUp />
                  </Box>
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  Over selected period
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              border: (theme) =>
                `1px solid ${alpha(theme.palette.divider, 0.75)}`,
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
              transition:
                "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
                borderColor: "rgba(37, 99, 235, 0.18)",
              },
            }}
          >
            <CardContent>
              <Stack spacing={1.5}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ fontWeight: 700 }}
                    >
                      Average Monthly
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>
                      ₹{(avgMonthly / 1000000).toFixed(1)}M
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.primary.main} 100%)`,
                      color: "#fff",
                    }}
                  >
                    <MuiIcons.BarChart />
                  </Box>
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  Monthly average
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              border: (theme) =>
                `1px solid ${alpha(theme.palette.divider, 0.75)}`,
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
              transition:
                "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
                borderColor: "rgba(37, 99, 235, 0.18)",
              },
            }}
          >
            <CardContent>
              <Stack spacing={1.5}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ fontWeight: 700 }}
                    >
                      Total Volume
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>
                      {(totalVolume / 1000).toFixed(0)}K L
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.info.main} 100%)`,
                      color: "#fff",
                    }}
                  >
                    <MuiIcons.LocalGasStation />
                  </Box>
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  Liters sold
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              border: (theme) =>
                `1px solid ${alpha(theme.palette.divider, 0.75)}`,
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
              transition:
                "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
                borderColor: "rgba(37, 99, 235, 0.18)",
              },
            }}
          >
            <CardContent>
              <Stack spacing={1.5}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ fontWeight: 700 }}
                    >
                      Top Client
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>
                      {topClient.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      color: "#fff",
                    }}
                  >
                    <MuiIcons.Business />
                  </Box>
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  {topClient.orders} orders
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Revenue Trend */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
              Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={theme.palette.primary.main}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={theme.palette.primary.main}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={alpha(theme.palette.divider, 0.5)}
                />
                <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: alpha(
                      theme.palette.background.paper,
                      0.95,
                    ),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Product Mix */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
              Product Sales Mix
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productSales}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productSales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: alpha(
                      theme.palette.background.paper,
                      0.95,
                    ),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 8,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Sales by Product */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
              Monthly Sales by Product
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={alpha(theme.palette.divider, 0.5)}
                />
                <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: alpha(
                      theme.palette.background.paper,
                      0.95,
                    ),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Bar
                  dataKey="petrol"
                  fill={theme.palette.primary.main}
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="diesel"
                  fill={theme.palette.secondary.main}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Top Clients */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
              Top Clients
            </Typography>
            <Grid container spacing={2}>
              {topClients.map((client, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.info.main, 0.04)} 100%)`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
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
                          }}
                        >
                          <MuiIcons.Business />
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {client.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {client.orders} orders
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: theme.palette.primary.main,
                          }}
                        >
                          ₹{(client.sales / 100000).toFixed(1)}L
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
