import SEO from "@/components/SEO";
import { Metadata } from "next";
export const metadata: Metadata = SEO({
	title: "Change Password | BeatShot",
	type: "website",
	url: "/recover",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};
export default Layout;
