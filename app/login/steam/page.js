"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const navigate = useRouter();
  useEffect(() => {
    const handleSteamLogin = async () => {
      try {
        // TODO can use rewrite to hide redirect
        const response = await fetch("/api/login/steam", {
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
          method: "GET",
        });
        const data = await response.json();
        if (data.redirectUrl) {
          navigate.push(data.redirectUrl);
        }
      } catch (err) {
        setErrMsg("Login Failed");
        console.log(err);
      }
    };
    handleSteamLogin();
  }, [navigate]);

  return <></>;
};

export default Login;
