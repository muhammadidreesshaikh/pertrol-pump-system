# ⚡ Quick Start Guide

Get the FuelHub dashboard running in 5 minutes!

## 1️⃣ Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app opens automatically at `http://localhost:3000`

## 2️⃣ Login

Use demo credentials:

- **Email**: admin@fuelhub.com
- **Password**: password

## 3️⃣ Explore

Click around and explore:

- 📊 Dashboard with charts
- ⛽ Petrol Pump management
- 🌙 Dark mode toggle (top right)
- 👤 User menu (top right)

## 🏗️ Project Structure at a Glance

```
src/
├── pages/              # Full page components
├── components/         # Reusable UI components
├── services/           # API calls
├── store/              # State management (Zustand)
├── types/              # TypeScript interfaces
├── constants/          # App constants
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── theme/              # MUI theme config
└── routes/             # Route definitions
```

## 🛠️ Common Tasks

### Add a New Page

1. Create file: `src/pages/MyModule/MyModulePage.tsx`
2. Add route in `src/routes/index.tsx`
3. Add to navigation in `src/constants/index.ts`

```typescript
// Example page
import { MainLayout } from '@components/Layout';
import { Box, Typography } from '@mui/material';

export const MyModulePage = () => {
  return (
    <MainLayout>
      <Box sx={{ py: 3 }}>
        <Typography variant="h4">My Module</Typography>
      </Box>
    </MainLayout>
  );
};
```

### Use State Management

```typescript
// Auth store
import { useAuthStore } from "@store/authStore";
const { user, isAuthenticated, login, logout } = useAuthStore();

// UI store
import { useUIStore } from "@store/uiStore";
const { isDarkMode, toggleDarkMode } = useUIStore();

// Custom hook
import { useAuth } from "@hooks/useAuth";
const { user, hasRole } = useAuth();
```

### Call an API

```typescript
// Import service
import { petrolPumpService } from '@services/index';

// Use in component
const MyComponent = () => {
  const [pumps, setPumps] = useState([]);

  useEffect(() => {
    const fetchPumps = async () => {
      const data = await petrolPumpService.getPetrolPumps();
      setPumps(data.data);
    };
    fetchPumps();
  }, []);

  return <div>{/* render pumps */}</div>;
};
```

### Create a Form

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

## 📚 Key Files to Understand

### `src/types/index.ts`

All TypeScript interfaces - defines your data structures

### `src/services/apiClient.ts`

Axios instance - handles all API communication

### `src/store/authStore.ts`

Example of Zustand store - follow this pattern for other stores

### `src/components/Layout/MainLayout.tsx`

Main app shell - wraps all pages

### `src/pages/Auth/LoginPage.tsx`

Login example - good reference for page structure

### `src/pages/Dashboard/DashboardPage.tsx`

Dashboard example - good reference for charts

### `src/pages/PetrolPump/PetrolPumpListPage.tsx`

CRUD example - follow this for other modules

## 🎨 Customize Theme

Edit `src/theme/theme.tsx`:

```typescript
const lightPalette = {
  primary: "#1976d2", // Your primary color
  secondary: "#dc004e", // Your secondary color
  success: "#4caf50",
  error: "#f44336",
  warning: "#ff9800",
};
```

## 🔌 Connect Your API

Edit `.env.local`:

```env
VITE_API_URL=https://your-api.com/api
```

The API client automatically adds JWT tokens to requests.

## 📚 Documentation

- **README.md** - Full feature overview
- **ARCHITECTURE.md** - System design and patterns
- **DEVELOPMENT.md** - Detailed development guide
- **PROJECT_SUMMARY.md** - What's included

## ⚙️ Build for Production

```bash
npm run build
npm run preview
```

## 🐛 Troubleshooting

### "Cannot find module" error

- Check path aliases in `vite.config.ts`
- Restart dev server: `Ctrl+C` then `npm run dev`

### State not updating

- Check store implementation in `src/store/`
- Ensure using correct hook: `useAuthStore`, `useUIStore`, etc.

### Styling issues

- Check MUI theme in `src/theme/theme.tsx`
- Use `sx` prop for styling components
- Media queries: `{ xs: '100%', md: '50%' }`

### API calls failing

- Check `.env.local` for correct `VITE_API_URL`
- Check browser console for error details
- Verify backend is running

## 💡 Tips

1. **Use TypeScript** - Let IDE catch errors
2. **Follow Existing Patterns** - Check similar components
3. **Read Type Definitions** - Interfaces tell you what's needed
4. **Check Documentation** - See DEVELOPMENT.md for examples
5. **Use VS Code** - Get great TypeScript support

## 🎯 Next Steps

1. ✅ Get app running (npm run dev)
2. ✅ Login with demo credentials
3. ✅ Explore the UI and features
4. ✅ Read through the code
5. ✅ Create a new page/feature
6. ✅ Connect to your backend

## 📞 Need Help?

- Check existing page implementations
- Look at similar components
- Read the documentation files
- Type checking: `npm run type-check`

---

**You're all set! Start building. 🚀**
