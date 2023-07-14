import SEO from "@/components/SEO";
import { Metadata } from "next";

export const metadata: Metadata = SEO({
  title: "Developer Blog | BeatShot",
  type: "website",
  additionalKeywords: ["beatshot", "game", "unreal", "engine", "c++", "game", "developer"],
  clearDefaultKeywords: true,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default Layout;
