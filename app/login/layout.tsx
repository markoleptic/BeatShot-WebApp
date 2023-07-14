import SEO from "@/components/SEO";
import { Metadata } from "next";
export const metadata: Metadata = SEO({
  title: "Sign In | BeatShot",
  type: "website",
  additionalKeywords: ["login", "sign in", "log in", "steam"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default Layout;
