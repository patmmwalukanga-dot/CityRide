"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { I18nextProvider } from "react-i18next";
import { StoreProvider } from "@state/store-provider";
import i18n from "@lib/i18n";
import { muiTheme } from "@styles/mui-theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <StoreProvider>{children}</StoreProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </I18nextProvider>
  );
}
