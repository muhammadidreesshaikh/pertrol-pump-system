# FuelHub - Enterprise Fuel & Logistics Management Dashboard

A modern, professional, and scalable admin dashboard for managing fuel and logistics operations. Built with React, Vite, TypeScript, and Material UI.

## 🚀 Features

### Authentication Module
- ✅ Login with role-based access control (Admin, Manager, Accountant)
- ✅ Protected routes with permission checking
- ✅ Forgot password functionality
- ✅ Session management with JWT tokens

### Dashboard Overview
- 📊 Real-time KPI cards for all metrics
- 📈 Interactive charts (Line, Bar, Pie)
- 💰 Revenue and expense tracking
- 🚚 Active tanker monitoring
- 👥 Client outstanding amount tracking
- ⛽ Fuel stock management

### Petrol Pump Management
- ✅ Complete CRUD operations
- 📍 Location and manager tracking
- ⛽ Real-time fuel stock levels with alerts
- 📊 Daily sales records
- 💹 Profit/loss calculations

### Fuel Purchase Module
- 📝 Purchase order management
- 🚚 Tanker assignment
- 📄 Invoice upload and storage
- 💵 Automatic calculations
- 📥 PDF report download

### Tanker Management
- 🚛 Complete CRUD for tankers
- 📍 Real-time status tracking
- 🔄 Status management (Free, Filling, On Way, Delivered)
- 📊 Delivery timeline and history

### Client Management
- 👥 Client database
- 💳 Credit limits
- 💰 Outstanding tracking
- 📋 Purchase history
- 🔔 Payment reminders

### Delivery Management
- 📦 Delivery orders
- 🚚 Real-time status updates
- 💰 Payment collection
- 📄 Invoice generation
- 💳 Multiple payment methods

### Sales & Analytics
- 📊 Daily/Monthly sales reports
- 🏪 Pump-wise analysis
- 👥 Client-wise tracking
- 💹 Profit margins
- 📈 Consumption analytics

### Reports Module
- 📋 Sales, Purchase, Client reports
- 💰 Recovery reports
- 📊 Stock reports
- 📄 PDF export and printing

### UI/UX Features
- 🌙 Dark/Light theme support
- 📱 Fully responsive (desktop/tablet/mobile)
- ♿ Accessibility features
- 🎨 Material Design components
- ⚡ Optimized performance
- 🔔 Toast notifications
- ⏳ Loading states and skeletons

## 📋 Tech Stack

- **Frontend**: React 18+ with Vite
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Yup
- **Charts**: Recharts
- **HTTP**: Axios
- **PDF**: jspdf + html2canvas
- **Utilities**: date-fns, lodash-es

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/                      # Main layout components
│   │   ├── MainLayout.tsx          # Main wrapper
│   │   ├── Sidebar.tsx             # Side navigation
│   │   └── TopBar.tsx              # Top navigation
│   ├── Common/                      # Reusable components
│   │   ├── StatCard.tsx            # Statistics card
│   │   ├── ConfirmDialog.tsx        # Confirmation modal
│   │   ├── EmptyState.tsx           # Empty state UI
│   │   ├── LoadingOverlay.tsx       # Loading indicator
│   │   └── ProtectedRoute.tsx       # Route protection
│   ├── Dashboard/                   # Dashboard widgets
│   ├── PetrolPump/                  # Petrol pump components
│   ├── FuelPurchase/                # Purchase components
│   ├── Tanker/                      # Tanker components
│   ├── Client/                      # Client components
│   └── Delivery/                    # Delivery components
├── pages/
│   ├── Auth/
│   │   └── LoginPage.tsx
│   ├── Dashboard/
│   │   └── DashboardPage.tsx
│   ├── PetrolPump/
│   │   └── PetrolPumpListPage.tsx
│   ├── FuelPurchase/
│   ├── Tanker/
│   ├── Client/
│   ├── Delivery/
│   ├── Sales/
│   └── Reports/
├── services/
│   ├── apiClient.ts                 # Axios instance
│   ├── authService.ts
│   ├── petrolPumpService.ts
│   ├── fuelPurchaseService.ts
│   ├── tankerService.ts
│   ├── clientService.ts
│   ├── deliveryService.ts
│   ├── analyticsService.ts
│   └── index.ts
├── store/
│   ├── authStore.ts                 # Auth state
│   ├── uiStore.ts                   # UI state
│   ├── dataStore.ts                 # Data state
│   └── index.ts
├── hooks/
│   └── useAuth.ts                   # Auth hook
├── types/
│   └── index.ts                     # TypeScript types
├── constants/
│   └── index.ts                     # Constants
├── theme/
│   ├── theme.tsx                    # MUI themes
│   └── index.ts
├── utils/
│   └── formatters.ts                # Utilities
├── routes/
│   └── index.tsx                    # Routes config
├── assets/                          # Static files
├── App.tsx
└── main.tsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/fuelhub-dashboard.git
cd fuelhub-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start development server**
```bash
npm run dev
```

The app opens at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Lint Code

```bash
npm run lint
```

## 🔑 Demo Credentials

**Admin User**
- Email: `admin@fuelhub.com`
- Password: `password`
- Access: All features

**Manager User**
- Email: `manager@fuelhub.com`
- Password: `password`
- Access: Operations management

**Accountant User**
- Email: `accountant@fuelhub.com`
- Password: `password`
- Access: Financial reports

## 🎨 Customization

### Theme Colors

Edit `src/theme/theme.tsx`:

```typescript
const lightPalette = {
  primary: '#1976d2',      // Change primary color
  secondary: '#dc004e',    // Change secondary color
  success: '#4caf50',      // Success states
  error: '#f44336',        // Error states
  warning: '#ff9800',      // Warning states
  // ... more colors
};
```

### Navigation Items

Edit `src/constants/index.ts`:

```typescript
export const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
    permission: ['ADMIN', 'MANAGER', 'ACCOUNTANT'],
  },
  // Add more items...
];
```

## 📚 API Integration

All API calls through centralized service:

```typescript
import { petrolPumpService } from '@services/index';

// Get paginated list
const data = await petrolPumpService.getPetrolPumps(page, limit);

// Get single item
const pump = await petrolPumpService.getPetrolPump(id);

// Create
const newPump = await petrolPumpService.createPetrolPump(data);

// Update
const updated = await petrolPumpService.updatePetrolPump(id, data);

// Delete
await petrolPumpService.deletePetrolPump(id);
```

## 🏪 State Management with Zustand

```typescript
// Auth store
import { useAuthStore } from '@store/authStore';
const { user, isAuthenticated, login, logout } = useAuthStore();

// UI store
import { useUIStore } from '@store/uiStore';
const { isDarkMode, toggleDarkMode } = useUIStore();

// Data store
import { useDataStore } from '@store/dataStore';
const { petrolPumps, setPetrolPumps } = useDataStore();
```

## 📊 Creating New Pages

1. Create page in `src/pages/[Module]/`
2. Add route in `src/routes/index.tsx`
3. Add navigation in `src/constants/index.ts`
4. Wrap with `MainLayout`

Example:

```typescript
// src/pages/MyModule/MyModulePage.tsx
import { MainLayout } from '@components/Layout';
import { Box, Typography } from '@mui/material';

export const MyModulePage = () => {
  return (
    <MainLayout>
      <Box sx={{ py: 3 }}>
        <Typography variant="h4">My Module</Typography>
        {/* Content */}
      </Box>
    </MainLayout>
  );
};
```

## 🧩 Creating Components

Place reusable components in `src/components/[Category]/`:

```typescript
// src/components/Common/MyButton.tsx
import { Button, ButtonProps } from '@mui/material';

interface MyButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const MyButton = ({ isLoading, ...props }: MyButtonProps) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? 'Loading...' : props.children}
    </Button>
  );
};
```

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Protected routes with RBAC
- ✅ Secure API communication
- ✅ Input sanitization
- ✅ CORS handling
- ✅ Token refresh mechanism

## 📱 Responsive Breakpoints

- **xs**: 0px - Mobile
- **sm**: 600px - Small devices
- **md**: 960px - Tablets
- **lg**: 1280px - Desktops
- **xl**: 1920px - Large screens

## ⚡ Performance

- Code splitting with React.lazy()
- Optimized bundle size (Vite)
- Efficient re-renders (Zustand)
- Image optimization
- CSS-in-JS with MUI
- Route-based code splitting

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- Email: support@fuelhub.com
- Issues: GitHub Issues
- Docs: Check README sections

---

**Built with ❤️ for efficient fuel and logistics management**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
