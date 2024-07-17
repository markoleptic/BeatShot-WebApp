"use client";
import React, { ReactNode, useEffect } from "react";

import "@/styles/Sidebar.scss";

type SidebarProps = {
	children: ReactNode;
};

const Sidebar = ({ children }: SidebarProps): React.JSX.Element => {
	const handleScroll = () => {
		const sidebarContainer = document.querySelector<HTMLElement>(".sidebar-container");
		const footer = document.querySelector<HTMLElement>(".footer-container");

		if (sidebarContainer && footer) {
			const rect = footer.getBoundingClientRect();
			const visibleRectHeight = window.innerHeight - rect.top;
			if (visibleRectHeight < 0) {
				sidebarContainer.style.height = `${window.innerHeight - 60}px`;
				return;
			}
			if (rect.top < window.innerHeight) {
				sidebarContainer.style.height = `${window.innerHeight - 120}px`;
			} else if (sidebarContainer.style.height != `${window.innerHeight - 60}px`) {
				sidebarContainer.style.height = `${window.innerHeight - 60}px`;
			}
		}
	};

	const scrollHash = () => {
		const sidebarContainer = document.querySelector<HTMLElement>(".sidebar-main");
		if (sidebarContainer) {
			const hashLinks = document.querySelectorAll(".sidebar-hash-link.link.active");
			let lastLink = hashLinks[hashLinks.length - 1];
			if (lastLink instanceof HTMLElement) {
				lastLink.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "nearest",
				});
			}
		}
	};
	useEffect(() => {
		const handleHashLinkScroll = () => {
			if (timer !== undefined) {
				clearTimeout(timer);
			}
			timer = setTimeout(scrollHash, 250);
		};

		let timer: ReturnType<typeof setTimeout>;

		if (window.innerWidth > 640) {
			window.addEventListener("scroll", handleScroll);
			window.addEventListener("scroll", handleHashLinkScroll);
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("scroll", handleHashLinkScroll);
		};
	}, []);

	return (
		<div className="sidebar-container left">
			<div className="sidebar-main">{children}</div>
		</div>
	);
};

export default Sidebar;
