import SEO from "@/components/SEO";
import { Metadata } from "next";

export const metadata: Metadata = SEO({
	title: "BeatShot's Target Spawning System: Part 1 | Developer Blog",
	ogTwitterTitle: "BeatShot's Target Spawning System: Part 1 - Core Classes, State, and Conventions", // Building the Core System
	description:
		"In this first part of the series, I introduce the foundation used to build the Target Spawning System in " +
		"BeatShot. You’ll learn about the classes, state management systems, and some of the conventions used to " +
		"make the game function smoothly, alongside insights into the decision-making process that guided their " +
		"selection and implementation.",
	type: "article",
	url: "/devblog/target-spawning-system",
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
