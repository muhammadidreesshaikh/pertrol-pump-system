import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { StatCard, EmptyState } from "@components/Common";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data
const salesData = [
  { name: "Jan", petrol: 4000, diesel: 3000 },
  { name: "Feb", petrol: 3500, diesel: 3500 },
  { name: "Mar", petrol: 5000, diesel: 4000 },
  { name: "Apr", petrol: 4500, diesel: 3500 },
  { name: "May", petrol: 6000, diesel: 5000 },
  { name: "Jun", petrol: 5500, diesel: 4500 },
];

const stockData = [
  { name: "Petrol", value: 35, fill: "#1976d2" },
  { name: "Diesel", value: 25, fill: "#dc004e" },
  { name: "Free Capacity", value: 40, fill: "#e0e0e0" },
];

const pumpPerformance = [
  { name: "Pump A", sales: 4500 },
  { name: "Pump B", sales: 3800 },
  { name: "Pump C", sales: 5200 },
  { name: "Pump D", sales: 4100 },
  { name: "Pump E", sales: 3900 },
];

export const DashboardPage = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Paper
        sx={{
          mb: 4,
          p: { xs: 2.5, md: 3.5 },
          background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(14, 165, 233, 0.08) 45%, rgba(245, 158, 11, 0.08) 100%)",
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
              label="Operations at a glance"
              sx={{ mb: 2, fontWeight: 800 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Dashboard Overview
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Welcome back. Here is a clean summary of your business, stock and
              logistics.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <Chip label="Live stock" color="primary" variant="outlined" />
            <Chip label="Sales trend" color="secondary" variant="outlined" />
            <Chip label="Delivery ops" color="success" variant="outlined" />
          </Stack>
        </Stack>
      </Paper>

      {/* KPI Cards Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Petrol Stock"
            value="45,230 L"
            icon={<MuiIcons.LocalGasStation />}
            color="primary"
            subtitle="↑ 12% from last week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Diesel Stock"
            value="32,150 L"
            icon={<MuiIcons.LocalGasStation />}
            color="secondary"
            subtitle="↓ 5% from last week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value="₹18.5L"
            icon={<MuiIcons.TrendingUp />}
            color="success"
            subtitle="↑ 22% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Recoveries"
            value="₹4.2L"
            icon={<MuiIcons.Receipt />}
            color="warning"
            subtitle="From 8 clients"
          />
        </Grid>
      </Grid>

      {/* KPI Cards Row 2 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Tankers"
            value="3"
            icon={<MuiIcons.DirectionsBus />}
            color="info"
            subtitle="2 on way, 1 filling"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Free Tankers"
            value="1"
            icon={<MuiIcons.DirectionsBus />}
            color="success"
            subtitle="Ready for next delivery"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Clients"
            value="12"
            icon={<MuiIcons.People />}
            color="info"
            subtitle="3 new this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Operating Pumps"
            value="5/5"
            icon={<MuiIcons.VerifiedUser />}
            color="success"
            subtitle="All active"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Sales Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Monthly Sales Trend"
              subheader="Petrol vs Diesel"
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="petrol"
                    stroke="#1976d2"
                    name="Petrol Sales"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="diesel"
                    stroke="#dc004e"
                    name="Diesel Sales"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Stock Distribution Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="Stock Distribution"
              subheader="Current inventory"
            />
            <CardContent sx={{ textAlign: "center" }}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stockData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pump Performance */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Pump-wise Sales Performance"
              subheader="Top performing pumps"
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pumpPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="sales"
                    fill="#1976d2"
                    name="Sales (₹)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Recent Activities" />
            <CardContent>
              <EmptyState
                title="No recent activities"
                message="Activities will appear here as they happen"
                icon={<MuiIcons.History sx={{ fontSize: 48 }} />}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
