import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { useUIStore } from "@store/uiStore";
import { useAuth } from "@hooks/useAuth";
import { ThemeContextProvider } from "@theme/index";
import { useEffect } from "react";

function App() {
  const { isDarkMode } = useUIStore();
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Check authentication status on app load
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeContextProvider isDarkMode={isDarkMode}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </ThemeContextProvider>
  );
}

export default App;
