import { render, type RenderOptions } from "@testing-library/react";
import { Providers } from "@/app/providers";

export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions,
) {
  return render(ui, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,
    ...options,
  });
}
