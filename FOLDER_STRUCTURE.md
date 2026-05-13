<!-- FuelHub Project Folder Structure -->

# 📁 FuelHub Dashboard - Complete Folder Structure

```
fuelhub-dashboard/
│
├── 📄 Core Configuration Files
│   ├── package.json                     # Dependencies & scripts
│   ├── vite.config.ts                   # Vite configuration
│   ├── tsconfig.json                    # TypeScript main config
│   ├── tsconfig.node.json               # TypeScript Vite config
│   ├── index.html                       # HTML entry point
│   └── .gitignore                       # Git ignore rules
│
├── 📋 Documentation (Read These!)
│   ├── README.md                        # Main documentation
│   ├── QUICK_START.md                   # 5-minute setup guide ⭐
│   ├── ARCHITECTURE.md                  # System design & patterns
│   ├── DEVELOPMENT.md                   # Dev guide with examples
│   ├── PROJECT_SUMMARY.md               # What's included
│   └── CHECKLIST.md                     # Completed & TODO items
│
├── 🌍 Environment
│   ├── .env.example                     # Environment template
│   └── .env.local                       # Local environment (ignored)
│
├── 🔐 Git
│   └── .git/                            # Git repository
│
├── 📦 Dependencies
│   └── node_modules/                    # Installed packages
│
├── 🏗️ Source Code (src/)
│   │
│   ├── 🎯 Entry Point
│   │   ├── App.tsx                      # Main app component
│   │   └── main.tsx                     # React DOM render
│   │
│   ├── 🎨 Styling
│   │   └── index.css                    # Global styles
│   │
│   ├── 📘 Types (src/types/)
│   │   └── index.ts                     # All TypeScript interfaces
│   │
│   ├── ⚙️ Constants (src/constants/)
│   │   └── index.ts                     # App constants & navigation
│   │
│   ├── 🎨 Theme (src/theme/)
│   │   ├── theme.tsx                    # MUI light/dark themes
│   │   └── index.ts                     # Theme exports
│   │
│   ├── 🛠️ Utilities (src/utils/)
│   │   ├── formatters.ts                # All utility functions
│   │   └── index.ts                     # Exports
│   │
│   ├── 🪝 Hooks (src/hooks/)
│   │   ├── useAuth.ts                   # Auth hook with helpers
│   │   └── index.ts                     # Exports
│   │
│   ├── 🏪 State Management (src/store/)
│   │   ├── authStore.ts                 # Authentication state
│   │   ├── uiStore.ts                   # UI state (theme, sidebar)
│   │   ├── dataStore.ts                 # Data cache state
│   │   └── index.ts                     # All store exports
│   │
│   ├── 🔌 Services (src/services/)
│   │   ├── apiClient.ts                 # Axios instance setup
│   │   ├── authService.ts               # Auth API calls
│   │   ├── petrolPumpService.ts         # Petrol pump API
│   │   ├── fuelPurchaseService.ts       # Fuel purchase API
│   │   ├── tankerService.ts             # Tanker API
│   │   ├── clientService.ts             # Client API
│   │   ├── deliveryService.ts           # Delivery API
│   │   ├── analyticsService.ts          # Analytics API
│   │   └── index.ts                     # All exports
│   │
│   ├── 🧩 Components (src/components/)
│   │   ├── 📐 Layout/
│   │   │   ├── MainLayout.tsx           # Main app wrapper
│   │   │   ├── Sidebar.tsx              # Side navigation
│   │   │   ├── TopBar.tsx               # Top navigation
│   │   │   └── index.ts                 # Exports
│   │   │
│   │   ├── 🎁 Common/
│   │   │   ├── StatCard.tsx             # Stat display card
│   │   │   ├── ConfirmDialog.tsx        # Confirmation modal
│   │   │   ├── EmptyState.tsx           # Empty state UI
│   │   │   ├── LoadingOverlay.tsx       # Loading indicator
│   │   │   ├── ProtectedRoute.tsx       # Route protection
│   │   │   └── index.ts                 # Exports
│   │   │
│   │   ├── 📊 Dashboard/
│   │   │   └── (Dashboard widgets go here)
│   │   │
│   │   ├── ⛽ PetrolPump/
│   │   │   └── (Petrol pump components)
│   │   │
│   │   ├── 🛢️ FuelPurchase/
│   │   │   ├── FuelPurchaseForm.tsx     # Complete form example
│   │   │   └── (Other purchase components)
│   │   │
│   │   ├── 🚛 Tanker/
│   │   │   └── (Tanker components)
│   │   │
│   │   ├── 👥 Client/
│   │   │   └── (Client components)
│   │   │
│   │   └── 📦 Delivery/
│   │       └── (Delivery components)
│   │
│   ├── 📄 Pages (src/pages/)
│   │   ├── 🔐 Auth/
│   │   │   ├── LoginPage.tsx            # Login page
│   │   │   └── (Other auth pages)
│   │   │
│   │   ├── 📊 Dashboard/
│   │   │   └── DashboardPage.tsx        # Main dashboard
│   │   │
│   │   ├── ⛽ PetrolPump/
│   │   │   ├── PetrolPumpListPage.tsx   # CRUD example
│   │   │   └── (Other pump pages)
│   │   │
│   │   ├── 🛢️ FuelPurchase/
│   │   │   └── (Purchase pages)
│   │   │
│   │   ├── 🚛 Tanker/
│   │   │   └── (Tanker pages)
│   │   │
│   │   ├── 👥 Client/
│   │   │   └── (Client pages)
│   │   │
│   │   ├── 📦 Delivery/
│   │   │   └── (Delivery pages)
│   │   │
│   │   ├── 📈 Sales/
│   │   │   └── (Sales/Analytics pages)
│   │   │
│   │   └── 📋 Reports/
│   │       └── (Report pages)
│   │
│   ├── 🛣️ Routes (src/routes/)
│   │   └── index.tsx                    # Route configuration
│   │
│   └── 🎨 Assets (src/assets/)
│       └── (Images, icons, etc.)
│
├── 🖼️ Public Assets
│   └── public/                          # Static files served
│
└── 📤 Build Output
    └── dist/                            # Production build (created by npm run build)
```

## 📊 Component Hierarchy

```
App
├── Router
│   ├── LoginPage
│   ├── DashboardPage
│   │   ├── MainLayout
│   │   │   ├── Sidebar
│   │   │   ├── TopBar
│   │   │   └── Main Content
│   │   │       ├── StatCards (StatCard)
│   │   │       ├── Charts (Recharts)
│   │   │       └── Tables
│   │   └── (Dashboard specific components)
│   ├── PetrolPumpListPage
│   │   ├── MainLayout
│   │   │   ├── Sidebar
│   │   │   ├── TopBar
│   │   │   └── Main Content
│   │   │       ├── Search (TextField)
│   │   │       ├── Table (DataTable)
│   │   │       └── Dialogs (Dialog)
│   │   └── (Petrol pump specific components)
│   └── (Other pages following same pattern)
```

## 📁 File Organization by Module

### Example: Petrol Pump Module

```
Components (Reusable)
└── src/components/PetrolPump/
    ├── PetrolPumpCard.tsx
    └── PetrolPumpForm.tsx

Pages (Full page views)
└── src/pages/PetrolPump/
    ├── PetrolPumpListPage.tsx       ⭐
    ├── PetrolPumpDetailPage.tsx
    └── PetrolPumpFormPage.tsx

Service (API calls)
└── src/services/
    └── petrolPumpService.ts         ⭐

Types (Data structures)
└── src/types/
    └── index.ts (PetrolPump interface)

Store (State)
└── src/store/
    └── dataStore.ts (petrolPumps array)

Routes
└── src/routes/
    └── index.tsx (routes definition)

Constants/Navigation
└── src/constants/
    └── index.ts (nav item)
```

## 🔄 Data Flow

```
User Interaction
        ↓
Component (Page/Dialog)
        ↓
Service Layer (API call)
        ↓
Backend API
        ↓
Response
        ↓
Store Update (Zustand)
        ↓
Component Re-render
```

## 📝 File Naming Conventions

### Components

- `ComponentName.tsx` - React components
- Use PascalCase
- Example: `PetrolPumpCard.tsx`

### Pages

- `PageName.tsx` - Page components
- Use PascalCase
- Example: `PetrolPumpListPage.tsx`

### Services

- `moduleName Service.ts` - API service modules
- Use camelCase
- Example: `petrolPumpService.ts`

### Utilities

- `utility Name.ts` - Utility functions
- Use camelCase
- Example: `formatters.ts`

### Types

- `index.ts` - Centralized types
- Use PascalCase for interfaces
- Example: `interface PetrolPump`

## 🎯 Common File Locations

| What            | Where                                         |
| --------------- | --------------------------------------------- |
| Add a new page  | `src/pages/ModuleName/ModuleNamePage.tsx`     |
| Add a component | `src/components/ModuleName/ComponentName.tsx` |
| Add API service | `src/services/moduleName Service.ts`          |
| Add type        | `src/types/index.ts`                          |
| Add constant    | `src/constants/index.ts`                      |
| Add utility     | `src/utils/utilityName.ts`                    |
| Add route       | `src/routes/index.tsx`                        |
| Add store       | `src/store/moduleName Store.ts`               |

## 🏃 Quick Navigation

### When you need to...

**Add a new feature module**

1. Create component: `src/components/FeatureName/`
2. Create page: `src/pages/FeatureName/FeatureNamePage.tsx`
3. Create service: `src/services/featureName Service.ts`
4. Create types: add to `src/types/index.ts`
5. Add route: `src/routes/index.tsx`
6. Add navigation: `src/constants/index.ts`

**Fix styling**
→ `src/theme/theme.tsx`

**Fix authentication**
→ `src/services/authService.ts` + `src/store/authStore.ts`

**Add a utility function**
→ `src/utils/formatters.ts`

**Add state**
→ `src/store/` (create new store or add to existing)

**Change API endpoint**
→ `.env.local` (VITE_API_URL)

---

**Happy Building! 🚀**
