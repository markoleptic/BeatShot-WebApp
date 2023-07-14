import SEO from "@/components/SEO";
import { Metadata } from "next";

export const metadata: Metadata = SEO({
  title: "Account Recovery | BeatShot",
  type: "website",
  additionalKeywords: ["forgot password", "expired confirmation email"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default Layout;
