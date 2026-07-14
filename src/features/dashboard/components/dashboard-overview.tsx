"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { observer } from "mobx-react-lite";
import { AppButton } from "@components/ui/button";
import { useAppTranslation } from "@hooks/use-app-translation";
import { useStore } from "@state/root-store";
import { formatDate } from "@utils/format-date";
import { useDashboardHealth } from "../hooks/use-dashboard-health";

export const DashboardOverview = observer(function DashboardOverview() {
  const { t } = useAppTranslation();
  const { sessionStore } = useStore();
  const health = useDashboardHealth();

  return (
    <Stack spacing={4}>
      <Stack spacing={1.5}>
        <Chip label="Next.js App Router" color="primary" sx={{ width: "fit-content" }} />
        <Typography component="h1" variant="h3" fontWeight={800}>
          {t("heroTitle")}
        </Typography>
        <Typography color="text.secondary" maxWidth={720}>
          {t("heroDescription")}
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 3,
        }}
      >
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h6" fontWeight={800}>
            Starter wiring
          </Typography>
          <Typography color="text.secondary">
            MobX is ready. Sidebar state is currently{" "}
            {sessionStore.sidebarOpen ? "open" : "closed"}.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <AppButton onClick={sessionStore.toggleSidebar}>
              Toggle MobX state
            </AppButton>
            <AppButton
              color="secondary"
              onClick={health.checkHealth}
              disabled={health.status === "loading"}
            >
              {health.status === "loading" ? "Checking..." : t("cta")}
            </AppButton>
          </Stack>
          {health.status === "success" && (
            <Typography color="success.main">
              {t("healthReady")} Last checked{" "}
              {formatDate(health.data.timestamp)}.
            </Typography>
          )}
          {health.status === "error" && (
            <Typography color="error.main">
              {t("healthFailed")} {health.error}
            </Typography>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
});
