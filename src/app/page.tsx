import { DashboardOverview } from "@features/dashboard/components/dashboard-overview";
import { AppShell } from "@layouts/app-shell";

export default function HomePage() {
  return (
    <AppShell>
      <DashboardOverview />
    </AppShell>
  );
}
