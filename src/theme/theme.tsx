import { alpha, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { ReactNode } from "react";

const typography = {
  fontFamily: '"Manrope", "Segoe UI", sans-serif',
  h1: {
    fontSize: "3rem",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
  },
  h2: {
    fontSize: "2.5rem",
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.035em",
  },
  h3: {
    fontSize: "2rem",
    fontWeight: 800,
    lineHeight: 1.12,
    letterSpacing: "-0.03em",
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: 1.18,
    letterSpacing: "-0.02em",
  },
  h5: { fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.25 },
  h6: { fontSize: "1rem", fontWeight: 700, lineHeight: 1.3 },
  body1: { fontSize: "1rem", lineHeight: 1.65 },
  body2: { fontSize: "0.92rem", lineHeight: 1.6 },
  button: { textTransform: "none" as const, fontWeight: 700 },
};

const buildTheme = (mode: "light" | "dark") => {
  const isDark = mode === "dark";
  const primary = isDark ? "#60a5fa" : "#2563eb";
  const primaryDark = isDark ? "#2563eb" : "#1d4ed8";
  const secondary = isDark ? "#fbbf24" : "#f59e0b";
  const surface = isDark ? "#0f172a" : "#ffffff";
  const background = isDark ? "#07111f" : "#f3f7fc";
  const backgroundAlt = isDark ? "#0b1729" : "#eaf1fb";
  const text = isDark ? "#e2e8f0" : "#0f172a";
  const textSecondary = isDark ? "#94a3b8" : "#475569";
  const border = isDark ? "#20314d" : "#d8e1ee";
  const borderStrong = isDark ? "#304764" : "#c7d3e3";

  const options: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: primary,
        dark: primaryDark,
        light: alpha(primary, 0.18),
        contrastText: "#fff",
      },
      secondary: { main: secondary },
      success: { main: "#10b981" },
      error: { main: "#ef4444" },
      warning: { main: "#f59e0b" },
      info: { main: "#06b6d4" },
      background: { default: background, paper: surface },
      text: { primary: text, secondary: textSecondary },
      divider: border,
    },
    shape: { borderRadius: 18 },
    typography,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: isDark
              ? `radial-gradient(circle at top left, ${alpha(primary, 0.16)}, transparent 32%), radial-gradient(circle at top right, ${alpha(secondary, 0.12)}, transparent 26%), linear-gradient(180deg, ${background} 0%, ${backgroundAlt} 100%)`
              : `radial-gradient(circle at top left, ${alpha(primary, 0.14)}, transparent 30%), radial-gradient(circle at top right, ${alpha(secondary, 0.12)}, transparent 26%), linear-gradient(180deg, ${background} 0%, ${backgroundAlt} 100%)`,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 999,
            padding: "12px 20px",
            fontWeight: 700,
            transition: "transform 180ms ease, box-shadow 180ms ease",
            "&:hover": { transform: "translateY(-1px)" },
          },
          sizeLarge: { padding: "14px 24px" },
          containedPrimary: {
            backgroundImage: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)`,
            boxShadow: `0 14px 30px ${alpha(primary, 0.28)}`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            border: `1px solid ${alpha(border, 0.75)}`,
            backgroundImage: isDark
              ? `linear-gradient(180deg, ${alpha("#111c32", 0.96)} 0%, ${alpha(surface, 0.96)} 100%)`
              : `linear-gradient(180deg, ${alpha("#ffffff", 0.98)} 0%, ${alpha("#f8fbff", 0.94)} 100%)`,
            boxShadow: `0 18px 55px ${isDark ? "rgba(2, 8, 23, 0.35)" : "rgba(15, 23, 42, 0.08)"}`,
            overflow: "hidden",
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: { paddingBottom: 8 },
          title: { fontWeight: 800, letterSpacing: "-0.02em" },
          subheader: { color: textSecondary },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: 20, border: `1px solid ${alpha(border, 0.7)}` },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: alpha(surface, 0.74),
            color: text,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: `1px solid ${alpha(border, 0.75)}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: isDark
              ? `linear-gradient(180deg, ${alpha(surface, 0.98)} 0%, ${alpha(backgroundAlt, 0.98)} 100%)`
              : `linear-gradient(180deg, ${alpha("#ffffff", 0.98)} 0%, ${alpha(backgroundAlt, 0.98)} 100%)`,
            borderRight: `1px solid ${alpha(border, 0.8)}`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined", fullWidth: true },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: alpha(surface, isDark ? 0.55 : 0.85),
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(primary, 0.45),
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: primary,
              borderWidth: 2,
              boxShadow: `0 0 0 4px ${alpha(primary, 0.12)}`,
            },
          },
          notchedOutline: { borderColor: alpha(borderStrong, 0.9) },
          input: { padding: "14px 16px" },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { fontWeight: 600 },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            border: `1px solid ${alpha(border, 0.9)}`,
            boxShadow: `0 20px 60px ${isDark ? "rgba(2, 8, 23, 0.5)" : "rgba(15, 23, 42, 0.14)"}`,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            margin: "4px 8px",
            transition: "transform 160ms ease",
            "&:hover": { transform: "translateX(2px)" },
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: 999, fontWeight: 700 } },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            border: `1px solid ${alpha(border, 0.75)}`,
            boxShadow: `0 24px 80px ${isDark ? "rgba(2, 8, 23, 0.55)" : "rgba(15, 23, 42, 0.18)"}`,
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            border: `1px solid ${alpha(border, 0.7)}`,
            overflow: "hidden",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-head": {
              background: isDark
                ? alpha(backgroundAlt, 0.95)
                : alpha(backgroundAlt, 0.85),
              fontWeight: 800,
              color: text,
              letterSpacing: "0.02em",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: { borderBottom: `1px solid ${alpha(border, 0.6)}` },
        },
      },
    },
  };

  return createTheme(options);
};

export const lightTheme = buildTheme("light");
export const darkTheme = buildTheme("dark");

interface ThemeContextProviderProps {
  children: ReactNode;
  isDarkMode: boolean;
}

export const ThemeContextProvider = ({
  children,
  isDarkMode,
}: ThemeContextProviderProps) => {
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          minHeight: "100vh",
          background:
            theme.palette.mode === "dark"
              ? `radial-gradient(circle at top left, ${alpha(theme.palette.primary.main, 0.14)}, transparent 28%), radial-gradient(circle at top right, ${alpha(theme.palette.secondary.main, 0.12)}, transparent 24%), linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
              : `radial-gradient(circle at top left, ${alpha(theme.palette.primary.main, 0.12)}, transparent 28%), radial-gradient(circle at top right, ${alpha(theme.palette.secondary.main, 0.1)}, transparent 24%), linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
          color: theme.palette.text.primary,
          transition: "background 240ms ease, color 240ms ease",
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};
