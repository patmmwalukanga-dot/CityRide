import type { Metadata } from "next";
import { appConfig } from "@config/app-config";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createMetadata(input: MetadataInput): Metadata {
  const url = new URL(input.path || "/", appConfig.url);

  return {
    title: input.title,
    description: input.description,
    metadataBase: new URL(appConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: appConfig.name,
      type: "website",
    },
  };
}
