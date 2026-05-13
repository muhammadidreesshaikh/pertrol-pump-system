# Development Guide

## 🎯 Quick Start

### 1. Setup
```bash
npm install
npm run dev
```

### 2. Create a New Feature Module

Example: Creating a new "Inventory" module

#### Step 1: Define Types

```typescript
// src/types/index.ts

export interface Inventory {
  id: string;
  pumpId: string;
  fuelType: FuelType;
  quantity: number;
  lastUpdated: string;
}
```

#### Step 2: Create Service

```typescript
// src/services/inventoryService.ts

import { apiClient } from './apiClient';
import { Inventory, PaginatedResponse } from '@types/index';

const ENDPOINTS = {
  INVENTORY: '/inventory',
};

export const inventoryService = {
  async getInventory(page: number = 1, limit: number = 10) {
    return apiClient.get<PaginatedResponse<Inventory>>(ENDPOINTS.INVENTORY, {
      page,
      limit,
    });
  },

  async getItem(id: string) {
    return apiClient.get<Inventory>(`${ENDPOINTS.INVENTORY}/${id}`);
  },

  async create(data: Partial<Inventory>) {
    return apiClient.post<Inventory>(ENDPOINTS.INVENTORY, data);
  },

  async update(id: string, data: Partial<Inventory>) {
    return apiClient.put<Inventory>(`${ENDPOINTS.INVENTORY}/${id}`, data);
  },

  async delete(id: string) {
    return apiClient.delete(`${ENDPOINTS.INVENTORY}/${id}`);
  },
};
```

#### Step 3: Create Components

```typescript
// src/components/Inventory/InventoryCard.tsx

import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Inventory } from '@types/index';

interface InventoryCardProps {
  data: Inventory;
  onEdit?: (item: Inventory) => void;
  onDelete?: (id: string) => void;
}

export const InventoryCard = ({ data, onEdit, onDelete }: InventoryCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{data.fuelType}</Typography>
        <Typography color="textSecondary">{data.quantity}L</Typography>
        <Box sx={{ mt: 2 }}>
          <Chip label="Active" color="success" size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};
```

#### Step 4: Create Page

```typescript
// src/pages/Inventory/InventoryListPage.tsx

import { Box, Button, Grid, Typography, Dialog, TextField } from '@mui/material';
import * as MuiIcons from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { MainLayout } from '@components/Layout';
import { InventoryCard } from '@components/Inventory/InventoryCard';
import { EmptyState } from '@components/Common';
import { inventoryService } from '@services/inventoryService';
import { Inventory } from '@types/index';

export const InventoryListPage = () => {
  const [items, setItems] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const data = await inventoryService.getInventory();
      setItems(data.data);
    } catch (error) {
      console.error('Failed to fetch inventory', error);
    }
    setLoading(false);
  };

  const handleAdd = async (data: Partial<Inventory>) => {
    try {
      const newItem = await inventoryService.create(data);
      setItems([...items, newItem]);
      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to add item', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await inventoryService.delete(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  };

  return (
    <MainLayout>
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Inventory Management</Typography>
          <Button
            variant="contained"
            startIcon={<MuiIcons.Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add Item
          </Button>
        </Box>

        {items.length > 0 ? (
          <Grid container spacing={3}>
            {items.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <InventoryCard data={item} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState
            title="No items"
            message="Add your first inventory item"
            icon={<MuiIcons.Inventory2 sx={{ fontSize: 48 }} />}
            action={{ label: 'Add Item', onClick: () => setOpenDialog(true) }}
          />
        )}
      </Box>
    </MainLayout>
  );
};
```

#### Step 5: Add Route

```typescript
// src/routes/index.tsx

const InventoryListPage = React.lazy(
  () => import('@pages/Inventory/InventoryListPage').then(m => ({ default: m.InventoryListPage }))
);

{
  path: '/inventory',
  element: (
    <ProtectedRoute>
      <React.Suspense fallback={<div>Loading...</div>}>
        <InventoryListPage />
      </React.Suspense>
    </ProtectedRoute>
  ),
}
```

#### Step 6: Add Navigation Item

```typescript
// src/constants/index.ts

export const NAVIGATION_ITEMS = [
  // ... existing items
  {
    id: 'inventory',
    label: 'Inventory',
    path: '/inventory',
    icon: 'inventory_2',
    permission: ['ADMIN', 'MANAGER'],
  },
];
```

## 📝 Common Tasks

### Adding a New Form with Validation

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string().required('Name is required').min(2),
  email: yup.string().email('Invalid email').required(),
  quantity: yup.number().positive('Must be positive'),
});

export const MyForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField
        {...register('name')}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        margin="normal"
      />

      <TextField
        {...register('email')}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin="normal"
      />

      <TextField
        {...register('quantity')}
        label="Quantity"
        type="number"
        error={!!errors.quantity}
        helperText={errors.quantity?.message}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};
```

### Adding a Data Table with Pagination

```typescript
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
} from '@mui/material';
import { useState } from 'react';

export const DataTable = ({ data, columns }: { data: any[]; columns: any[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Card}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            {columns.map(col => (
              <TableCell key={col.id} sx={{ fontWeight: 'bold' }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row, idx) => (
            <TableRow key={idx} hover>
              {columns.map(col => (
                <TableCell key={col.id}>
                  {col.render ? col.render(row) : row[col.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
```

### Using Custom Hooks

```typescript
// src/hooks/useApi.ts
import { useState, useEffect } from 'react';

export const useApi = <T,>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error');
      }
      setLoading(false);
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

// Usage:
const MyComponent = () => {
  const { data: items, loading } = useApi(
    () => inventoryService.getInventory(),
    []
  );

  return <div>{loading ? 'Loading...' : <p>{items?.data.length}</p>}</div>;
};
```

## 🔍 Debugging Tips

### Check Store State
```typescript
// In browser console
import { useAuthStore } from './src/store/authStore';
const state = useAuthStore.getState();
console.log(state);
```

### Log API Calls
```typescript
// Add to apiClient.ts interceptor
this.client.interceptors.request.use((config) => {
  console.log('📤 API Request:', config.url, config.data);
  return config;
});

this.client.interceptors.response.use((response) => {
  console.log('📥 API Response:', response.data);
  return response;
});
```

### Enable Redux DevTools for Zustand
```typescript
import { devtools } from 'zustand/middleware';

export const useStore = create<Store>(
  devtools((set) => ({
    // ... store implementation
  }))
);
```

## 📚 Documentation

- [React Docs](https://react.dev)
- [Material-UI Docs](https://mui.com/material-ui/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [React Hook Form Docs](https://react-hook-form.com/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

Happy Coding! 🚀
