import { Metadata } from "next";

import blogPostData from "@/components/blog/TargetSpawningSystemData";
import SEO from "@/components/SEO";

export const metadata: Metadata = SEO({
	title: blogPostData.titleShort,
	ogTwitterTitle: blogPostData.titleLong,
	description: blogPostData.description,
	type: "article",
	url: "/devblog/target-spawning-system",
	twitterCard: "summary_large_image",
	additionalKeywords: [
		"aim-training",
		"aim training",
		"target spawning system",
		"target management system",
		"game",
		"unreal",
		"engine",
		"ue",
		"c++",
		"component",
		"actor",
		"object",
		"delegate",
		"reinforcement learning",
		"state",
		"debug",
	],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};
export default Layout;
