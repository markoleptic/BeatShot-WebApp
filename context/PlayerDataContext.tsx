"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "../components/Auth/AuthContext";
import useRefreshToken from "@/hooks/useRefreshToken";

const PlayerDataContext = createContext({});

export const usePlayerDataContext = () => useContext(PlayerDataContext);

// provides the Authorization Bearer header to access protected player data
export const PlayerDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState(null);
  const [customGameModesTime, SetCustomGameModesTime] = useState(null);
  const [defaultGameModesTime, SetDefaultGameModesTime] = useState(null);
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

        const responseData = await response.json();
        if (response.status === 200) {
          setData(responseData);
        } else {
          setErrMsg(responseData.message);
        }

        const customResponse = await fetch(`/api/profile/${auth?.userID}/gettotaltimecustomgamemodes`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          method: "GET",
        });
        const customResponseData = await customResponse.json();
        if (customResponse.status === 200) {
          SetCustomGameModesTime(customResponseData);
        }

        const defaultResponse = await fetch(`/api/profile/${auth?.userID}/gettotaltimedefaultgamemodes`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          method: "GET",
        });
        const defaultResponseData = await defaultResponse.json();
        if (defaultResponse.status === 200) {
          SetDefaultGameModesTime(defaultResponseData);
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

  return (
    <PlayerDataContext.Provider value={{ data, customGameModesTime, defaultGameModesTime, errMsg, setErrMsg }}>
      {children}
    </PlayerDataContext.Provider>
  );
};
