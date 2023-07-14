"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import useRefreshToken from "@/hooks/useRefreshToken";

const PlayerDataContext = createContext({});

export const usePlayerDataContext = () => useContext(PlayerDataContext);

// provides the Authorization Bearer header to access protected player data
export const PlayerDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const { auth, setAuth } = useAuthContext();
  const refresh = useRefreshToken();

  useEffect(() => {
    const initializePlayerData = async () => {
      // TEMP SCUFFED SOLUTION
      if (auth && auth?.exp < Date.now() / 1000) {
        const freshAuthData = await refresh();
        setAuth(freshAuthData);
      }

      try {
        const response = await fetch(`/api/profile/${auth?.userID}/getscores`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          method: "GET",
        });
        /* this is where we make changes to importing from the database after adding a newly tracked category,
         * such as setting the difficulty to None so that legacy scores will still be shown in some category */
        const responseData = await response.json();
        if (response.status === 200) {
          for (let scores in responseData) {
            if (responseData[scores].difficulty === "" || responseData[scores].difficulty === null) {
              responseData[scores].difficulty = "None";
            }
          }
          console.log(responseData)
          setData(responseData);
        } else {
          setErrMsg(responseData.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (!auth) {
      setErrMsg("Not Authenticated");
      return;
    }
    initializePlayerData();
  }, [auth]);

  return <PlayerDataContext.Provider value={{ data, errMsg, setErrMsg }}>{children}</PlayerDataContext.Provider>;
};
