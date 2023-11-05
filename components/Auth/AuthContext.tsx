"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthData, AuthContextType } from "@/app/api/interfaces";

const AuthContext = createContext<AuthContextType | null>(null);

// this is the consumer, abstract it using useContext hook, it will read the current context value from closest Provider ABOVE it in tree
export const useAuthContext = () => useContext(AuthContext) as AuthContextType;

// Wraps around entire application to provided consumers with auth information
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  // this is the data we want to share between components
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [persist, setPersist] = useState<boolean>(true);

  useEffect(() => {
    const value = Boolean(localStorage.getItem("persist")) || true;
    setPersist(value);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
}
