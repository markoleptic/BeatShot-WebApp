"use client";
import { NavLink } from "../Navlink";
import Link from "next/link";
import logo from "@/public/logo.ico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";

const NavBar = () => {
	const [visible, setVisibility] = useState(false);
	const { auth } = useAuthContext();
	const [profileStateText, setProfileStateText] = useState<string>("Login");
	const [profileStatePath, setProfileStatePath] = useState<string>("/login");

	useEffect(() => {
		const signedIn = auth?.userID && auth?.accessToken;
		setProfileStatePath(signedIn ? "/logout" : "/login");
		setProfileStateText(signedIn ? "Logout" : "Login");
	}, [auth]);

	return (
		<div className="header-container">
			<header>
				<Link className="link" href="/">
					<Image className="logo" src={logo} alt="logo" />
				</Link>
				<div className="mobile-nav-toggle-background">
					<FontAwesomeIcon
						icon={faBars}
						onClick={() => setVisibility(!visible)}
						className="mobile-nav-toggle link blue-hover"
						aria-controls="primary-navigation"
						aria-expanded="false"
						data-visible={visible}
					></FontAwesomeIcon>
				</div>
				<nav>
					<ul id="primary-navigation" className="primary-navigation flex fs-300" data-visible={visible}>
						<li className="uppercase">
							<NavLink href="/devblog" className="hover-blue link" onClick={() => setVisibility(false)}>
								Dev Blog
							</NavLink>
						</li>
						<li className="uppercase">
							<NavLink
								href="/patchnotes"
								className="hover-blue link"
								onClick={() => setVisibility(false)}
							>
								Patch Notes
							</NavLink>
						</li>
						{auth?.userID && auth?.accessToken ? (
							<li className="uppercase">
								<NavLink
									href={`/profile/${auth.userID}`}
									className="hover-blue link"
									onClick={() => setVisibility(false)}
								>
									Profile
								</NavLink>
							</li>
						) : (
							""
						)}
						<li className="uppercase">
							<NavLink
								href={profileStatePath}
								className="hover-blue link"
								onClick={() => setVisibility(false)}
							>
								{profileStateText}
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
};

export default NavBar;
