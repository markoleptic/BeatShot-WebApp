"use client";
import React, { useEffect, useRef, useState } from "react";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import NavLink from "@/components/NavLink";
import { useAuthContext } from "@/context/AuthContext";

import "@/styles/NavBar.scss";

import logo from "public/logo.ico";

const NavBar = (): React.JSX.Element => {
	const [visible, setVisibility] = useState(false);
	const visibleRef = useRef(visible);
	const headerRef = useRef<HTMLElement>(null);
	const { auth } = useAuthContext();
	const [profileStateText, setProfileStateText] = useState<string>("Login");
	const [profileStatePath, setProfileStatePath] = useState<string>("/login");
	const lastScrollTop = useRef(0);
	const headerHeight = useRef(60);

	const handleScroll = () => {
		if (headerRef.current) {
			const currentScroll = window.scrollY || document.documentElement.scrollTop;
			if (currentScroll > lastScrollTop.current) {
				// User is scrolling down
				headerHeight.current -= currentScroll - lastScrollTop.current;
				if (headerHeight.current < 0) {
					headerHeight.current = 0;
				}
				if (visibleRef.current === true) {
					setVisibility(false);
				}
			} else {
				// User is scrolling up
				headerHeight.current += lastScrollTop.current - currentScroll;
				if (headerHeight.current > 60) {
					headerHeight.current = 60;
				}
			}
			headerRef.current.style.top = `-${60 - headerHeight.current}px`;
			lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
		}
	};

	useEffect(() => {
		visibleRef.current = visible;
	}, [visible]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const signedIn = auth?.userID && auth?.accessToken;
		setProfileStatePath(signedIn ? "/logout" : "/login");
		setProfileStateText(signedIn ? "Logout" : "Login");
	}, [auth]);

	return (
		<header ref={headerRef}>
			<div className="header-container">
				<Link className="link" href="/" onClick={() => setVisibility(false)}>
					<Image className="header-logo" src={logo} alt="logo" />
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
					<ul id="primary-navigation" className="primary-navigation" data-visible={visible}>
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
			</div>
		</header>
	);
};

export default NavBar;
