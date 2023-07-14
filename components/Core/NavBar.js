"use client";
import { NavLink } from "../Navlink";
import Link from "next/link";
import logo from "../../public/logo.ico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import Image from "next/image";

const NavBar = () => {
  const [visible, setVisibilty] = useState(false);
  const { auth } = useAuthContext();
  const Logout = useLogout();

  const signOut = async () => {
    await Logout();
  };

  return (
    <div className="header-container">
      <header className="primary-header flex">
        <Link className="link" href="/">
          <Image className="logo" src={logo} alt="logo" />
        </Link>
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setVisibilty(!visible)}
          className="mobile-nav-toggle link blue-hover"
          aria-controls="primary-navigation"
          aria-expanded="false"
        ></FontAwesomeIcon>
        <nav>
          <ul id="primary-navigation" className="primary-navigation flex fs-300" data-visible={visible}>
            <li className="uppercase">
              <NavLink href="/devblog" className="hover-blue link" onClick={() => setVisibilty(false)}>
                Dev Blog
              </NavLink>
            </li>
            <li className="uppercase">
              <NavLink href="/patchnotes" className="hover-blue link" onClick={() => setVisibilty(false)}>
                Patch Notes
              </NavLink>
            </li>
            {auth?.userID && auth?.accessToken ? (
              <li className="uppercase">
                <NavLink
                  href={`/profile/${auth.userID}`}
                  className="hover-blue link"
                  onClick={() => setVisibilty(false)}
                >
                  Profile
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <li className="uppercase">
              {auth?.userID && auth?.accessToken ? (
                <button
                  className="fake-button link text-white hover-blue"
                  onClick={() => {
                    setVisibilty(false);
                    signOut();
                  }}
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  href="/login"
                  className="fake-button link text-white hover-blue"
                  onClick={() => setVisibilty(false)}
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
