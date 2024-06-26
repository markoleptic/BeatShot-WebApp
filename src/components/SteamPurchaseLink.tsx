import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSteam } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import "@/styles/Steam.scss";

export default function SteamSteamPurchaseLink() {
	return (
		<Link
			className="link hover-blue steam-login-container steam-purchase-container"
			href={"https://store.steampowered.com/app/2126580?utm_source=beatshotwebsite&utm_medium=web"}
		>
			<div className="steam-login-container-top">
				<p className="steam-login-text">view on</p>
				<div className="inline">
					<p className="steam-login-brand-text">STEAM</p>
					<p className="steam-login-tm">&#174;</p>
				</div>
				<FontAwesomeIcon className="steam-login-logo" icon={faSteam} />
			</div>
			<div className="steam-login-container-bottom">
				<p className="steam-login-text-bottom">This site is not associated with Valve Corp.</p>
			</div>
		</Link>
	);
}
