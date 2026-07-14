import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppButton } from ".";
import { renderWithProviders } from "@test-utils/render-with-providers";

describe("AppButton", () => {
  it("renders button content", () => {
    renderWithProviders(<AppButton>Save</AppButton>);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
});
