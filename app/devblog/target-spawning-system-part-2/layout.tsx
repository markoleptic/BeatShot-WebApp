import SEO from "@/components/SEO";
import { Metadata } from "next";

export const metadata: Metadata = SEO({
	title: "BeatShot's Target Spawning System: Part 2 | Developer Blog",
	ogTwitterTitle: "BeatShot's Target Spawning System: Part 2 - Target Lifecycle Timeline",
	description:
		"In this second part of the series, I'll explain how the core systems from Part 1 work together. " +
		"I walk through the lifecycle of targets, outlining the key functions and their roles. I also discuss " +
		"some challenging problems I encountered and how I solved them.",
	type: "article",
	url: "/devblog/target-spawning-system-part-2",
	twitterCard: "summary_large_image",
	additionalKeywords: [
		"aim-training",
		"aim training",
		"game",
		"unreal",
		"engine",
		"ue",
		"c++",
		"component",
		"actor",
		"object",
		"delegate",
		"ability system component",
		"gameplay ability system",
		"attribute",
		"spawning",
		"debug",
	],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};
export default Layout;
