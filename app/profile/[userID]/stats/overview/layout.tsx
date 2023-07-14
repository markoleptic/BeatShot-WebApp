
import SEO from "@/components/SEO";
import { Metadata} from "next";
export const metadata: Metadata = SEO({title: 'Overview | Stats', type: 'website'})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
};
