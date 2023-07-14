"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";

type NavLinkProps = React.PropsWithChildren<LinkProps> & {
  activeClassName?: string;
  className?: string;
};

export const NavLink = ({ children, activeClassName = "active", className, ...props }: NavLinkProps) => {

  const pathname = usePathname();
  const isActive = pathname.startsWith(props.href.toString()) || pathname === props.as;

  return (
    <Link {...props} className={isActive ? className + ' ' + activeClassName : className}>
      {children}
    </Link>
  );
};

