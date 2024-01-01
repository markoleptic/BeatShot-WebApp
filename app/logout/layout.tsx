import SEO from "@/components/SEO";
import { Metadata } from "next";
export const metadata: Metadata = SEO({
	title: "Log Out | BeatShot",
	type: "website",
	additionalKeywords: ["logout", "sign out", "steam"],
	url: "/logout",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};
export default Layout;
