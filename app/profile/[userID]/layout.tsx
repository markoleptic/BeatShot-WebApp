import ProfileSidebar from "../../../components/Profile/ProfileSidebar";
import { PlayerDataProvider } from "../../../context/PlayerDataContext";
import SEO from "@/components/SEO";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = SEO({
	title: "Profile | BeatShot",
	type: "website",
	url: "/profile",
});

export default function Profile({ children }: { children: React.ReactNode }) {
	return (
		<>
			<PlayerDataProvider>
				<div className="flex-container-row">
					<ProfileSidebar>
						<div className="flex-container-column gap-1rem padding-1rem-0rem">{children}</div>
					</ProfileSidebar>
				</div>
			</PlayerDataProvider>
		</>
	);
}
