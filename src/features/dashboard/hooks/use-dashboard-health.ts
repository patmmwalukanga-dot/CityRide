"use client";

import { useCallback, useState } from "react";
import { getHealth, type HealthResponse } from "@api/health";

type HealthState =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: HealthResponse; error: null }
  | { status: "error"; data: null; error: string };

export function useDashboardHealth() {
  const [state, setState] = useState<HealthState>({
    status: "idle",
    data: null,
    error: null,
  });

  const checkHealth = useCallback(async () => {
    setState({ status: "loading", data: null, error: null });

    try {
      const result = await getHealth();
      setState({ status: "success", data: result.data, error: null });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown API error";
      setState({ status: "error", data: null, error: message });
    }
  }, []);

  return {
    ...state,
    checkHealth,
  };
}
