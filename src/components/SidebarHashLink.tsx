"use client";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const semiBold = " fw-semibold";
const activeClassName = "hover-blue link active";
const inactiveClassName = "hover-blue link";

type NavLinkProps = {
	children: React.ReactNode;
	hash: string;
	onScreen: boolean;
	topLevelLink?: boolean;
};

const SidebarHashLink = ({ children, hash, onScreen, topLevelLink = false }: NavLinkProps): React.JSX.Element => {
	const pathname = usePathname();

	const getSidebarClassName = () => {
		if (onScreen) {
			return topLevelLink ? activeClassName + semiBold : activeClassName;
		}
		return topLevelLink ? inactiveClassName + semiBold : inactiveClassName;
	};

	return (
		<Link
			href={pathname + hash}
			replace={true}
			scroll={true}
			className={"sidebar-hash-link " + getSidebarClassName()}
		>
			{children}
		</Link>
	);
};

export default SidebarHashLink;
