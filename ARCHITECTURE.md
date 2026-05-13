# FuelHub Architecture & Best Practices

## 📐 Architecture Overview

```
User Interface (React Components)
         ↓
Route Layer (React Router)
         ↓
Custom Hooks (useAuth, etc)
         ↓
State Management (Zustand Stores)
         ↓
Services Layer (API calls)
         ↓
API Client (Axios)
         ↓
Backend API
```

## 🏗️ Component Architecture

### Layer 1: Layout Components
**Location**: `src/components/Layout/`

Provides the app shell structure:
- `MainLayout`: Main wrapper with sidebar and topbar
- `Sidebar`: Navigation menu
- `TopBar`: Header with user menu

### Layer 2: Common Components
**Location**: `src/components/Common/`

Reusable, generic components:
- `StatCard`: Display statistics
- `ConfirmDialog`: Confirmation modals
- `EmptyState`: Empty state placeholders
- `LoadingOverlay`: Loading indicators
- `ProtectedRoute`: Route protection

### Layer 3: Feature Components
**Location**: `src/components/[Feature]/`

Feature-specific components (not shared):
- Dashboard widgets
- Forms and input groups
- Feature-specific cards
- Data tables

### Layer 4: Page Components
**Location**: `src/pages/[Feature]/`

Full page templates that compose:
- Multiple feature components
- Layout components
- Business logic

## 📊 State Management Pattern

### Zustand Store Structure

```typescript
interface Store {
  // State
  data: Type[];
  loading: boolean;
  error: string | null;

  // Actions
  setData: (data: Type[]) => void;
  setLoading: (loading: boolean) => void;
  addItem: (item: Type) => void;
  removeItem: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  // Initial state
  data: [],
  loading: false,
  error: null,

  // Action implementations
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  // ...
}));
```

### When to Use Each Store

1. **authStore**: User authentication, login/logout, permissions
2. **uiStore**: Theme, sidebar state, notifications
3. **dataStore**: Business data (cached, not reactive)

## 🔄 Data Flow

### Fetching Data

```
User Action (click button)
         ↓
Hook calls service method
         ↓
Service makes API call
         ↓
Response received
         ↓
Store updates state
         ↓
Component re-renders
```

### Example:

```typescript
// Component
const MyComponent = () => {
  const { pumps, loading } = useDataStore();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await petrolPumpService.deletePetrolPump(id);
      useDataStore.getState().removePetrolPump(id);
      showSuccess('Deleted');
    } catch (error) {
      showError('Failed to delete');
    }
  };

  return (
    <div>
      {/* UI */}
    </div>
  );
};
```

## 🎯 Service Layer Pattern

### Service Structure

```typescript
// src/services/moduleService.ts

const ENDPOINTS = {
  LIST: '/resource',
  GET: '/resource/:id',
  CREATE: '/resource',
  UPDATE: '/resource/:id',
  DELETE: '/resource/:id',
};

export const moduleService = {
  async getList(page: number, limit: number) {
    return apiClient.get(ENDPOINTS.LIST, { page, limit });
  },

  async getOne(id: string) {
    return apiClient.get(`${ENDPOINTS.GET.replace(':id', id)}`);
  },

  async create(data: Partial<Type>) {
    return apiClient.post(ENDPOINTS.CREATE, data);
  },

  async update(id: string, data: Partial<Type>) {
    return apiClient.put(`${ENDPOINTS.UPDATE.replace(':id', id)}`, data);
  },

  async delete(id: string) {
    return apiClient.delete(`${ENDPOINTS.DELETE.replace(':id', id)}`);
  },
};
```

## 📝 TypeScript Best Practices

### Define Types First

```typescript
// src/types/index.ts

export interface MyEntity {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyEntityForm {
  name: string;
}

export enum MyEntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
```

### Use Enums for Constants

```typescript
// Good
enum DeliveryStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
}

// Avoid
const statuses = {
  PENDING: 'PENDING',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
};
```

## 🎨 Component Best Practices

### Props Interface Pattern

```typescript
interface MyComponentProps {
  // Required props
  title: string;
  onAction: () => void;

  // Optional props with defaults
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;

  // Children
  children?: ReactNode;
}

export const MyComponent = ({
  title,
  onAction,
  variant = 'default',
  size = 'medium',
  disabled = false,
  children,
}: MyComponentProps) => {
  return <div>{/* Component JSX */}</div>;
};
```

### Memoization

```typescript
// Use React.memo for pure components
export const MyPureComponent = React.memo(function MyComponent({ title }: Props) {
  return <div>{title}</div>;
});

// Use useMemo for expensive computations
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);

// Use useCallback for event handlers
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```

## 🔐 Authentication Flow

```
1. User navigates to /login
2. LoginPage component loads
3. User enters credentials
4. Login button clicked
5. authService.login() called
6. API returns token + user
7. Token stored in localStorage
8. User object stored in authStore
9. Router redirects to /dashboard
10. ProtectedRoute validates auth
11. MainLayout renders
```

## 📦 API Response Format

Expected API response format:

```typescript
// Success Response
{
  "success": true,
  "data": {
    // Entity data
  },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": "Error message",
  "status": 400
}

// Paginated Response
{
  "success": true,
  "data": [
    // Array of items
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🧪 Testing Approach

### Component Tests

```typescript
// Example test
describe('StatCard', () => {
  it('renders correctly', () => {
    render(
      <StatCard
        title="Test"
        value="100"
      />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## 🚀 Performance Tips

1. **Lazy Load Routes**
   ```typescript
   const LazyPage = React.lazy(() => import('./Page'));
   ```

2. **Memoize Components**
   ```typescript
   export const MyComponent = React.memo(Component);
   ```

3. **Use useCallback**
   ```typescript
   const handler = useCallback(() => {}, [deps]);
   ```

4. **Batch State Updates**
   ```typescript
   const updateMultiple = () => {
     set({
       field1: value1,
       field2: value2,
     });
   };
   ```

## 🐛 Debugging

### Browser DevTools
- React DevTools
- Redux DevTools (for Zustand)
- Network tab for API calls

### Logging

```typescript
// Good logging pattern
const handleAction = async () => {
  console.log('🚀 Action started');
  try {
    const result = await apiCall();
    console.log('✅ Success:', result);
    return result;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
};
```

## 📋 Code Organization

### File Naming
- Components: PascalCase (`MyComponent.tsx`)
- Pages: PascalCase (`MyPage.tsx`)
- Utils/Services: camelCase (`myService.ts`)
- Types: PascalCase interfaces, camelCase files (`types.ts`)

### Folder Organization
- Group related files together
- One component per file
- Shared components in `Common/`
- Feature-specific in feature folder

### Import Order
```typescript
// 1. External packages
import React from 'react';
import { Box, Button } from '@mui/material';

// 2. Aliases and internal imports
import { Component } from '@components/Common';
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/formatters';

// 3. Styles and assets
import styles from './MyComponent.module.css';
```

## 🔗 API Axios Configuration

The `apiClient` automatically:
- Adds Authorization header with JWT token
- Handles token expiration (401)
- Adds Content-Type headers
- Redirects to login on auth failure

## 📚 Common Patterns

### Form Submission

```typescript
const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await service.create(data);
      showSuccess();
    } catch (error) {
      showError();
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* form fields */}</form>;
};
```

### Data Table

```typescript
const DataTable = ({ data, loading, onEdit, onDelete }) => {
  return (
    <TableContainer component={Card}>
      <Table>
        <TableHead>
          {/* Header */}
        </TableHead>
        <TableBody>
          {data?.map(item => (
            <TableRow key={item.id}>
              {/* Cells */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
```

---

**Last Updated**: 2026
