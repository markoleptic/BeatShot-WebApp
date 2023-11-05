"use client";

import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAuthContext } from "./AuthContext";
import React from "react";

// refreshes access token stored in memory used to access protected resources
// always executes before needed to access based on expire date or if null
export default function AuthUpdate({ children }: { children: React.ReactNode }) {

  // isLoading lets us render this page again AFTER we get a new access token from useRefreshToken
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();

  // get current auth and persist values from nearest context
  const { auth, setAuth, persist } = useAuthContext();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const verifyRefreshToken = async () => {
        try {
          const freshAuthData = await refresh();
          freshAuthData ? setAuth(freshAuthData) : setAuth(null);
        } catch (err) {
          setAuth(null);
        } finally {
          mounted && setIsLoading(false);
        }
      };

      // only call for an access token if we reloaded the page and need a new one, or expired
      if (persist && (!auth || auth.accessToken || (auth.exp < Date.now() / 1000))) {
        verifyRefreshToken();
      } else {
        setIsLoading(false);
      }
    }
    return () => {
      mounted = false;
    };
  }, []);

  /* proceed to Authcheck without access token, otherwise get new refresh token before proceeding */
  return <>{!persist ? children : isLoading ? <></> : children}</>;
}
