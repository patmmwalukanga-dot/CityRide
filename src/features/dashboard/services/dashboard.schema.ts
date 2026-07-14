import { z } from "zod";

export const dashboardFormSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  ownerEmail: z.string().email("Enter a valid email"),
});

export type DashboardFormValues = z.infer<typeof dashboardFormSchema>;
