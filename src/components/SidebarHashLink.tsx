"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const semiBold = " fw-semibold";
const activeClassName = "hover-blue link active";
const inactiveClassName = "hover-blue link";

type NavLinkProps = React.PropsWithChildren & {
	hash: string;
	onScreen: boolean;
	topLevelLink?: boolean;
};

export const SidebarHashLink: React.FC<NavLinkProps> = ({
	children,
	hash,
	onScreen,
	topLevelLink = false,
	...props
}) => {
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
			scroll={true}
			className={"sidebar-hash-link " + getSidebarClassName()}
		>
			{children}
		</Link>
	);
};
