import SEO from "@/components/SEO";
import { Metadata } from "next";
export const metadata: Metadata = SEO({
  title: "Steam Sign In | BeatShot",
  type: "website",
  url: "/login/steam"
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default Layout;
