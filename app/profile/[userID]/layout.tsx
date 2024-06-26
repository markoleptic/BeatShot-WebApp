import ProfileSidebar from "@/components/profile/ProfileSidebar";
import SEO from "@/components/SEO";
import { PlayerDataProvider } from "@/context/PlayerDataContext";
import { Metadata } from "next";

export const metadata: Metadata = SEO({
	title: "Profile | BeatShot",
	type: "website",
	url: "/profile",
});

export default function Profile({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="flex-container-row">
				<PlayerDataProvider>
					<ProfileSidebar>
						<div className="flex-container-column gap-1rem padding-1rem-0rem">{children}</div>
					</ProfileSidebar>
				</PlayerDataProvider>
			</div>
		</>
	);
}
