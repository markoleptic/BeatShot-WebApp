"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const semiBold = " fw-semibold";
const activeClassName = "hover-blue link active";
const inactiveClassName = "hover-blue link";

type NavLinkProps = React.PropsWithChildren<LinkProps> & {
	hash: string;
	onScreen: boolean;
	text: string;
	topLevelLink?: boolean;
};

export const SidebarHashLink = ({ children, hash, text, onScreen, topLevelLink, ...props }: NavLinkProps) => {
	const pathname = usePathname();

	const getSidebarClassName = () => {
		if (onScreen) {
			return topLevelLink ? activeClassName + semiBold : activeClassName;
		}
		return topLevelLink ? inactiveClassName + semiBold : inactiveClassName;
	};

	return (
		<Link
			{...props}
			href={pathname + hash}
			replace={true}
			passHref
			scroll={true}
			className={"sidebar-hash-link " + getSidebarClassName()}
		>
			{text}
			{children}
		</Link>
	);
};
