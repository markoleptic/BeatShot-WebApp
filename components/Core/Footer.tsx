import logo from "../../public/logo.ico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faSteam, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer = () => {
	return (
		<div className="footer-container">
			<footer>
				<div className="footer-brand-container">
					<Image className="footer-logo" src={logo} alt="logo" />
					<h2 className="footer-logo-text">BeatShot</h2>
					<p className="footer-description-text">the rhythm-based aim trainer</p>
				</div>
				<ul className="footer-icon-list">
					<li className="footer-icon-item">
						<Link
							className="footer-icon-link link hover-blue"
							href="https://store.steampowered.com/app/2126580/BeatShot/"
						>
							<FontAwesomeIcon icon={faSteam} />
						</Link>
					</li>
					<li className="footer-icon-item">
						<Link className="footer-icon-link link hover-blue" href="https://discord.gg/FKWGbtZXmU">
							<FontAwesomeIcon icon={faDiscord} />
						</Link>
					</li>
					<li className="footer-icon-item">
						<Link
							className="footer-icon-link link hover-blue"
							href="https://github.com/markoleptic/BeatShot"
						>
							<FontAwesomeIcon icon={faGithub} />
						</Link>
					</li>
				</ul>
			</footer>
		</div>
	);
};

export default Footer;
