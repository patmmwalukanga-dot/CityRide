export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Next.js Project Template",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
} as const;
