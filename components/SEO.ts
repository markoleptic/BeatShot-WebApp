import { Metadata } from "next";
import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

export interface SEOInterface {
  title?: string | undefined;
  ogTwitterTitle?: string | undefined;
  type: OpenGraphType | undefined;
  description?: string | undefined;
  url?: string | undefined;
  twitterCard?: "summary" | "summary_large_image" | undefined;
  additionalKeywords?: string[] | undefined;
  clearDefaultKeywords?: boolean;
}

export default function SEO(params: SEOInterface): Metadata {
  const host = process.env.NODE_ENV === "development" ? process.env.host_development : process.env.host_production;
  let {
    title,
    type,
    ogTwitterTitle,
    description,
    url,
    twitterCard,
    additionalKeywords,
    clearDefaultKeywords = false,
  } = params;
  title = title || "BeatShot";
  type = type || "website";
  description = description || "the rhythm-based aim trainer";
  url = url ? `${host}${url}` : `${host}`;
  const actualUrl = new URL(url);
  twitterCard = twitterCard || "summary";
  let keywords = ["beatshot","game","aim trainer","aim-trainer","rhythm","music"];
  if (clearDefaultKeywords) {
    keywords = [];
  }
  if (additionalKeywords) {
    keywords.push(...additionalKeywords);
  }

  return {
    title: title,
    description: description,
    metadataBase: actualUrl,
    keywords: keywords,
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
      },
    },
    openGraph: {
      title: ogTwitterTitle || title,
      description: description,
      url: actualUrl,
      siteName: "BeatShot",
      locale: "en_US",
      type: type,
    },
    twitter: {
      card: twitterCard,
      title: ogTwitterTitle || title,
      description: description,
    },
  };
}
