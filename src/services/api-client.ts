import { appConfig } from "@config/app-config";
import type { ApiResult } from "@/types/common";

export type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly payload: unknown,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiClient<T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<ApiResult<T>> {
  const url = path.startsWith("http")
    ? path
    : `${appConfig.apiBaseUrl}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...options.headers,
    },
    body:
      options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiClientError("Request failed", response.status, payload);
  }

  return {
    data: payload as T,
    status: response.status,
  };
}
