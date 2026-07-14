import { createTheme } from "@mui/material/styles";
import { theme } from "./theme";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.primary,
      dark: theme.colors.primaryDark,
    },
    secondary: {
      main: theme.colors.accent,
    },
    background: {
      default: theme.colors.background,
      paper: theme.colors.surface,
    },
    text: {
      primary: theme.colors.text,
      secondary: theme.colors.textMuted,
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: theme.typography.fontFamily,
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
