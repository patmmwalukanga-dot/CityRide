import { appLinks } from "@config/app-links";
import { apiClient } from "@services/api-client";

export type HealthResponse = {
  ok: boolean;
  service: string;
  timestamp: string;
};

export function getHealth() {
  return apiClient<HealthResponse>(appLinks.api.health);
}
