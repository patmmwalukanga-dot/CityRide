import { describe, expect, it } from "vitest";
import { dashboardFormSchema } from "./dashboard.schema";

describe("dashboardFormSchema", () => {
  it("accepts valid dashboard form values", () => {
    const result = dashboardFormSchema.safeParse({
      projectName: "Starter App",
      ownerEmail: "owner@example.com",
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing project name and invalid email", () => {
    const result = dashboardFormSchema.safeParse({
      projectName: "",
      ownerEmail: "not-an-email",
    });

    expect(result.success).toBe(false);
  });
});
