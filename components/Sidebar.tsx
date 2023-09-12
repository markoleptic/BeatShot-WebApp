"use client";
import React, { ReactNode, useEffect } from "react";

interface SidebarProps {
  children: ReactNode;
}

const scrollHash = () => {
  const sidebarContainer = document.querySelector<HTMLElement>(".sidebar-main");
  if (sidebarContainer) {
    const hashLinks = document.querySelectorAll(".sidebar-hash-link.link.active");
    let lastLink = hashLinks[hashLinks.length - 1];
    if (lastLink instanceof HTMLElement) {
      lastLink.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  useEffect(() => {
    const handleScroll = () => {
      const sidebarContainer = document.querySelector<HTMLElement>(".sidebar-main");
      const footer = document.querySelector<HTMLElement>(".footer-container");

      if (sidebarContainer && footer) {
        const rect = footer.getBoundingClientRect();
        const visibleRectHeight = window.innerHeight - rect.top;
        const maxSidebarHeight = window.innerHeight - rect.height * 2;

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

    const handleHashLinkScroll = () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
      timer = setTimeout(scrollHash, 111);
    };

    let timer: ReturnType<typeof setTimeout>;
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleHashLinkScroll);
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
