import SEO from "@/components/SEO";
import { Metadata } from "next";

const titleShort = "Spawning Targets Without Intersection | Developer Blog";
const titleLong = "Spawning Targets Without Intersection";
const description = "TODO";

export const metadata: Metadata = SEO({
	title: titleShort,
	ogTwitterTitle: titleLong,
	description: description,
	type: "article",
	url: "/devblog/spawning-without-intersection",
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
