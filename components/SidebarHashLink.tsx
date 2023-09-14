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
        /*onClick={(e) => onBtnClick(e, pathname + hash, hash)}*/
        className={"sidebar-hash-link " + getSidebarClassName()}
      >
        {text}
        {children}
      </Link>
  );
};

/*  const onBtnClick = (e: React.MouseEvent<HTMLAnchorElement> , href: string, inHash?: string) => {
    e.preventDefault();
    if (!inHash) return;
    const element = document.getElementById(inHash.replace('#',''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    navigate.push(href);
  }; */
