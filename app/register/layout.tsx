
import SEO from "@/components/SEO";
import { Metadata} from "next";

export const metadata: Metadata = SEO({title: 'Register | BeatShot', type: 'website', url:"/register"})

const Layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default Layout;
