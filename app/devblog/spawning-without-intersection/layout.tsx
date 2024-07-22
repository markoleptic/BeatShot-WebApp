import { Metadata } from "next";

import blogPostData from "@/components/blog/SpawningWithoutIntersectionData";
import SEO from "@/components/SEO";

export const metadata: Metadata = SEO({
	title: blogPostData.titleShort,
	ogTwitterTitle: blogPostData.titleLong,
	description: blogPostData.description,
	type: "article",
	url: "/devblog/spawning-without-intersection",
	twitterCard: "summary_large_image",
	additionalKeywords: [
		"aim-training",
		"aim training",
		"target spawning system",
		"collision detection",
		"target intersection",
		"sphere trace",
		"spatial grid",
		"automation testing",
		"automation system",
		"FAutomationTestBase",
		"DispatchBeginPlay",
		"Session Frontend",
		"game",
		"unreal",
		"engine",
		"ue",
		"c++",
		"component",
		"actor",
		"object",
		"delegate",
		"debug",
	],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};
export default Layout;
