"use client";
import React, { ReactNode, useEffect } from "react";

interface SidebarProps {
  activeLinks?: string[];
  children: ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({ activeLinks = [], children }) => {
  const handleHashLinkScroll = () => {
    const sidebarContainer = document.querySelector<HTMLElement>(".sidebar-main");
    if (sidebarContainer) {
      // Loop through the activeLinks and scroll them into view
      const hashLinks = document.querySelectorAll(".sidebar-hash-link.link.active");
      let lastLink = hashLinks[length - 1];
      if (lastLink instanceof HTMLElement) {
        lastLink.scrollIntoView({ behavior: "instant" });
      }
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const sidebarContainer = document.querySelector<HTMLElement>(".sidebar-main");
      const footer = document.querySelector<HTMLElement>(".footer-container");

      if (sidebarContainer && footer) {

        const rect = footer.getBoundingClientRect();
        const visibleRectHeight = window.innerHeight - rect.top;
        const maxSidebarHeight = window.innerHeight - rect.height * 2;
        console.log(sidebarContainer.offsetHeight, maxSidebarHeight);

        if (visibleRectHeight < 0) {
          if (sidebarContainer.style.marginTop != "0px") {
            sidebarContainer.style.marginTop = "0px";
          }
          return;
        }

        if (sidebarContainer.offsetHeight <= maxSidebarHeight && sidebarContainer.style.marginTop === "0px") {

            if (sidebarContainer.style.marginTop != "0px") {
              sidebarContainer.style.marginTop = "0px";
            }
            return;
          }

        if (rect.top < window.innerHeight) {
          sidebarContainer.style.marginTop = visibleRectHeight + "px";
        } else if (sidebarContainer.style.marginTop != "0px") {
          sidebarContainer.style.marginTop = "0px";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeLinks]);

  return (
    <div className="sidebar-container left">
      <div className="sidebar-main">{children}</div>
    </div>
  );
};

export default Sidebar;
