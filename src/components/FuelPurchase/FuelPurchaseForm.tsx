import {
  Box,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FuelPurchase, FuelType, PurchaseStatus } from "@/types";
import { FUEL_TYPE_OPTIONS } from "@constants/index";
import { calculateGrandTotal, formatCurrency } from "@utils/formatters";
import { useEffect, useState } from "react";

const validationSchema = yup.object({
  fuelType: yup.string().required("Fuel type is required"),
  quantity: yup.number().required("Quantity is required").positive(),
  purchaseRate: yup.number().required("Purchase rate is required").positive(),
  supplierName: yup.string().required("Supplier name is required"),
  transportationCharges: yup.number().default(0),
  driverCharges: yup.number().default(0),
  otherCharges: yup.number().default(0),
  petrolPumpDestination: yup.string().required("Destination is required"),
  tankerAssigned: yup.string().required("Tanker is required"),
});

type FuelPurchaseFormData = yup.InferType<typeof validationSchema>;

interface FuelPurchaseFormProps {
  onSubmit: (data: Partial<FuelPurchase>) => Promise<void>;
  initialData?: FuelPurchase;
  isLoading?: boolean;
}

export const FuelPurchaseForm = ({
  onSubmit,
  initialData,
  isLoading = false,
}: FuelPurchaseFormProps) => {
  const [totalCost, setTotalCost] = useState(0);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FuelPurchaseFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData || {
      fuelType: "",
      quantity: 0,
      purchaseRate: 0,
      transportationCharges: 0,
      driverCharges: 0,
      otherCharges: 0,
      supplierName: "",
      petrolPumpDestination: "",
      tankerAssigned: "",
    },
  });

  // Watch quantity and rate to calculate total
  const quantity = watch("quantity");
  const purchaseRate = watch("purchaseRate");
  const transportationCharges = watch("transportationCharges");
  const driverCharges = watch("driverCharges");
  const otherCharges = watch("otherCharges");

  // Calculate total cost
  useEffect(() => {
    const total = calculateGrandTotal(
      quantity || 0,
      purchaseRate || 0,
      transportationCharges || 0,
      driverCharges || 0,
      otherCharges || 0,
    );
    setTotalCost(total);
  }, [
    quantity,
    purchaseRate,
    transportationCharges,
    driverCharges,
    otherCharges,
  ]);

  const handleFormSubmit = async (data: FuelPurchaseFormData) => {
    await onSubmit({
      ...data,
      fuelType: data.fuelType as FuelType,
      totalCost,
      purchaseDate: new Date().toISOString(),
      status: PurchaseStatus.PENDING,
    });
  };

  return (
    <Card>
      <CardHeader
        title="Fuel Purchase Order"
        subheader="Create a new fuel purchase"
      />
      <Divider />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={3}>
            {/* Row 1 */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="fuelType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Fuel Type"
                    fullWidth
                    error={!!errors.fuelType}
                    helperText={errors.fuelType?.message}
                  >
                    {FUEL_TYPE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Quantity (Liters)"
                    type="number"
                    fullWidth
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                    inputProps={{ step: "0.01" }}
                  />
                )}
              />
            </Grid>

            {/* Row 2 */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="purchaseRate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Purchase Rate (₹/L)"
                    type="number"
                    fullWidth
                    error={!!errors.purchaseRate}
                    helperText={errors.purchaseRate?.message}
                    inputProps={{ step: "0.01" }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="supplierName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Supplier Name"
                    fullWidth
                    error={!!errors.supplierName}
                    helperText={errors.supplierName?.message}
                  />
                )}
              />
            </Grid>

            {/* Row 3 */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="transportationCharges"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Transportation Charges (₹)"
                    type="number"
                    fullWidth
                    error={!!errors.transportationCharges}
                    helperText={errors.transportationCharges?.message}
                    inputProps={{ step: "0.01" }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="driverCharges"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Driver Charges (₹)"
                    type="number"
                    fullWidth
                    error={!!errors.driverCharges}
                    helperText={errors.driverCharges?.message}
                    inputProps={{ step: "0.01" }}
                  />
                )}
              />
            </Grid>

            {/* Row 4 */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="otherCharges"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Other Charges (₹)"
                    type="number"
                    fullWidth
                    error={!!errors.otherCharges}
                    helperText={errors.otherCharges?.message}
                    inputProps={{ step: "0.01" }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="tankerAssigned"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tanker Number"
                    fullWidth
                    error={!!errors.tankerAssigned}
                    helperText={errors.tankerAssigned?.message}
                  />
                )}
              />
            </Grid>

            {/* Row 5 */}
            <Grid item xs={12}>
              <Controller
                name="petrolPumpDestination"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Petrol Pump Destination"
                    fullWidth
                    error={!!errors.petrolPumpDestination}
                    helperText={errors.petrolPumpDestination?.message}
                  />
                )}
              />
            </Grid>

            {/* Cost Summary */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ backgroundColor: "#f5f5f5" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Box>
                        <Typography color="textSecondary" variant="caption">
                          Base Cost
                        </Typography>
                        <Typography variant="h6">
                          {formatCurrency(
                            (quantity || 0) * (purchaseRate || 0),
                          )}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box>
                        <Typography color="textSecondary" variant="caption">
                          Additional Charges
                        </Typography>
                        <Typography variant="h6">
                          {formatCurrency(
                            (transportationCharges || 0) +
                              (driverCharges || 0) +
                              (otherCharges || 0),
                          )}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <Typography color="textSecondary" variant="caption">
                          Total Cost
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: "bold", color: "primary.main" }}
                        >
                          {formatCurrency(totalCost)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Purchase Order"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
