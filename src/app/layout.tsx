import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./providers";
import { createMetadata } from "@lib/seo";
import "./globals.css";

export const metadata: Metadata = createMetadata({
  title: "Next.js Project Template",
  description:
    "A reusable Next.js starter with TypeScript, MUI, styled-components, MobX, Zod, i18n, and native fetch.",
  path: "",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#2563eb" showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
