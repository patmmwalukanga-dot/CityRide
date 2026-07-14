export const theme = {
  colors: {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    accent: "#10b981",
    background: "#f7f9fc",
    surface: "#ffffff",
    text: "#172033",
    textMuted: "#64748b",
    border: "#d8e0ec",
    danger: "#dc2626",
    white: "#ffffff",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    circle: "999px",
  },
  shadows: {
    sm: "0 1px 3px rgba(15, 23, 42, 0.08)",
    md: "0 10px 25px rgba(15, 23, 42, 0.08)",
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
  },
} as const;

export type AppTheme = typeof theme;
