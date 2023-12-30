import SEO from "@/components/SEO";
import { Metadata } from "next";

export const metadata: Metadata = SEO({
	title: "Email Confirmation | BeatShot",
	type: "website",
	additionalKeywords: ["confirmation email"],
	url: "/confirmation",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};
export default Layout;
