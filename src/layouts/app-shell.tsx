import { PageSection, PageShell } from "@components/styled/page-shell";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <PageSection>{children}</PageSection>
    </PageShell>
  );
}
