import SEO from "@/components/SEO";
import { Metadata } from "next";

export const metadata: Metadata = SEO({
	title: "Redirect | BeatShot",
	type: "website",
	url: "/redirect",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};
export default Layout;
