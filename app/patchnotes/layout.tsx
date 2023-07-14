
import SEO from "@/components/SEO";
import { Metadata} from "next";
export const metadata: Metadata = SEO({title: 'Patch Notes | BeatShot', type: 'website', additionalKeywords: ["patch notes"]})

const Layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default Layout;
