import React from "react";

import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import "@/styles/Steam.scss";

const SteamSignIn = (): React.JSX.Element => {
	return (
		<Link className="link hover-blue steam-login-container" href={"/login/steam"}>
			<div className="steam-login-container-top">
				<p className="steam-login-text">sign in through</p>
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
};

export default SteamSignIn;
