"use client";
import { NavLink } from "../Navlink";
import { useAuthContext } from "../../context/AuthContext";
import React from "react";

const ProfileSidebar = ({ children }: { children: React.ReactNode }) => {

  const { auth } = useAuthContext();
  return (
    <>
      <div className="sidebar-container centered">
        <div className="sidebar-main">
          <NavLink href={`/profile/${auth?.userID}`} className="profile-name-text">
            {auth?.displayName}
          </NavLink>
          <ul>
            <li>
              <NavLink href={`/profile/${auth?.userID}/stats/overview`} className="hover-blue link">
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink href={`/profile/${auth?.userID}/stats/defaultmodes`} className="hover-blue link">
                Default Modes
              </NavLink>
            </li>
            <li>
              <NavLink href={`/profile/${auth?.userID}/stats/custommodes`} className="hover-blue link">
                Custom Modes
              </NavLink>
            </li>
            <li>
              <NavLink href={`/profile/${auth?.userID}/stats/history`} className="hover-blue link">
                History
              </NavLink>
            </li>
            <li>
              <NavLink href={`/steamlink/${auth?.userID}`} className="hover-blue link">
                Link to Steam
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </>
  );
};
export default ProfileSidebar;

/*   const handleSteamLogin = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      const response = await fetch(`/api/steamlink/${auth?.userID}`, {
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        method: "GET",
      });
      if (!response) return;
      const data = await response.json();
      if (!data.redirectUrl) return;
      navigate.push(data.redirectUrl);
    } catch (err) {
      console.log(err);
      return;
    }
  }; */
