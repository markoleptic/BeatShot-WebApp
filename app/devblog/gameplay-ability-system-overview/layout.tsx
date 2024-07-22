import { Metadata } from "next";

import blogPostData from "@/components/blog/GameplayAbilitySystemData";
import SEO from "@/components/SEO";

export const metadata: Metadata = SEO({
	title: blogPostData.titleShort,
	ogTwitterTitle: blogPostData.titleLong,
	description: blogPostData.description,
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
		"execution calculation",
		"delegate",
		"c++",
	],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};
export default Layout;
