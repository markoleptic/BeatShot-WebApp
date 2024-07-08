import { Metadata } from "next";
import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

export type SEOInterface = {
	title?: string;
	ogTwitterTitle?: string | undefined;
	type: OpenGraphType | undefined;
	description?: string | undefined;
	url?: string | undefined;
	twitterCard?: "summary" | "summary_large_image" | undefined;
	additionalKeywords?: string[] | undefined;
	clearDefaultKeywords?: boolean;
	isRoot?: boolean;
};

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
		isRoot = false,
	} = params;
	title = title || "BeatShot";
	type = type || "website";
	description = description || "the rhythm-based aim trainer";
	twitterCard = twitterCard || "summary";
	let keywords = ["beatshot", "beat shot", "game", "aim training", "aim trainer", "aim-trainer", "rhythm", "music"];
	if (clearDefaultKeywords) {
		keywords = [];
	}
	if (additionalKeywords) {
		keywords.push(...additionalKeywords);
	}

	if (isRoot)
		return {
			title: title,
			description: description,
			metadataBase: new URL(`${host}`),
			keywords: keywords,
			openGraph: {
				title: ogTwitterTitle || title,
				description: description,
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
	return {
		title: title,
		description: description,
		keywords: keywords,
		openGraph: {
			title: ogTwitterTitle || title,
			description: description,
			url: url,
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
