import SEO from "@/components/SEO";
import { Metadata } from "next";
export const metadata: Metadata = SEO({
  title: "Target Spawning System | Developer Blog",
  ogTwitterTitle: "A look into BeatShot's target spawning system",
  description:
    "How are spawn locations decided for targets? How are targets managed? This article goes into detail about how this is accomplished in Unreal.",
  type: "article",
  url: "/devblog/target-spawning-system",
  twitterCard: "summary_large_image",
  additionalKeywords: [
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
