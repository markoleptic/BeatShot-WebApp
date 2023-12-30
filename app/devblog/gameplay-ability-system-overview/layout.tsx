import SEO from "@/components/SEO";
import { Metadata } from "next";
export const metadata: Metadata = SEO({
	title: "GAS in BeatShot | Developer Blog",
	ogTwitterTitle: "An Overview of Unreal's Gameplay Ability System in BeatShot",
	description:
		"Why is the Gameplay Ability System used in BeatShot? This article explains the role of GAS and provides a walkthrough of a common ability.",
	type: "article",
	url: "/devblog/gameplay-ability-system-overview",
	twitterCard: "summary_large_image",
	additionalKeywords: [
		"unreal",
		"engine",
		"ue",
		"gameplay",
		"ability",
		"system",
		"gas",
		"gameplay task",
		"ability system component",
		"gameplay ability system",
		"attribute",
		"gameplay effect",
		"delegate",
		"c++",
	],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};
export default Layout;
