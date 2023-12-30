import SEO from "@/components/SEO";
import { Metadata } from "next";
export const metadata: Metadata = SEO({
	title: "Overview | Stats",
	type: "website",
	url: "/profile",
});

export default function Layout({ children }: { children: React.ReactNode }) {
	return children;
}
