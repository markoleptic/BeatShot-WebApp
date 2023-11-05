"use client";

import { useAuthContext } from "@/components/Auth/AuthContext";

// simple check that uses the auth state to determine if it should show children
export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { auth } = useAuthContext();

  return auth && children;
}
