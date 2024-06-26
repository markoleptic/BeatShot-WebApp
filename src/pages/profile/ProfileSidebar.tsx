"use client";
import { NavLink } from "@/components/Navlink";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import "@/styles/Sidebar.scss";

const ProfileSidebar = ({ children }: { children: React.ReactNode }) => {
	const { auth, profileInfo } = useAuthContext();
	return (
		<>
			<div className="sidebar-container centered">
				<div className="sidebar-main">
					<NavLink href={`/profile/${auth?.userID}`} className="profile-name-text">
						<p>{profileInfo?.displayName}</p>
					</NavLink>
					<ul>
						<li>
							<NavLink href={`/profile/${auth?.userID}/stats/overview`} className="hover-blue link">
								Overview
							</NavLink>
						</li>
						<li>
							<NavLink href={`/profile/${auth?.userID}/stats/defaultmodes`} className="hover-blue link">
								Default Modes
							</NavLink>
						</li>
						<li>
							<NavLink href={`/profile/${auth?.userID}/stats/custommodes`} className="hover-blue link">
								Custom Modes
							</NavLink>
						</li>
						<li>
							<NavLink href={`/profile/${auth?.userID}/stats/history`} className="hover-blue link">
								History
							</NavLink>
						</li>
						{!profileInfo || (profileInfo && profileInfo.steamLinked) ? null : (
							<li>
								<NavLink href={`/steamlink/${auth?.userID}`} className="hover-blue link">
									Link to Steam
								</NavLink>
							</li>
						)}
					</ul>
				</div>
			</div>
			{children}
		</>
	);
};
export default ProfileSidebar;
