"use client";
import React from "react";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = LinkProps & {
	children: React.ReactNode;
	activeClassName?: string;
	className?: string;
};

const NavLink = ({ children, activeClassName = "active", className, ...props }: NavLinkProps): React.JSX.Element => {
	const pathname = usePathname();
	const isActive = pathname?.startsWith(props.href.toString()) || pathname === props.as;

	return (
		<Link {...props} className={isActive ? className + " " + activeClassName : className}>
			{children}
		</Link>
	);
};

export default NavLink;
