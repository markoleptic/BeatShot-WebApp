"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { JWTVerifyResult, jwtVerify } from "jose";
import type { AuthData, AuthContextType } from "@/types/auth.types";
import type { ProfileInfo } from "@/types/profile.types";

const AuthContext = createContext<AuthContextType | null>(null);
const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

// this is the consumer, abstract it using useContext hook, it will read the current context value from closest Provider ABOVE it in tree
export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};

// Wraps around entire application to provided consumers with auth information
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	// this is the data we want to share between components
	const [auth, setAuth] = useState<AuthData | null>(null);
	const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
	const [persist, setPersist] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const refresh = useRefreshToken();

	const initializingAuth = useRef(false);
	const initializingProfileInfo = useRef(false);

	const isAccessTokenValid = async (auth: AuthData | null): Promise<boolean> => {
		if (!auth || auth.accessToken || auth.exp < Date.now() / 1000) return false;
		const payload = (await jwtVerify(auth?.accessToken as string, secret)) as JWTVerifyResult;
		return payload ? true : false;
	};

	const refreshAccessToken = async (): Promise<boolean> => {
		const authResponse = await refresh();
		if (authResponse) {
			setAuth(authResponse);
			return true;
		}
		return false;
	};

	useEffect(() => {
		let mounted = true;
		const initializeAuth = async () => {
			try {
				const value = Boolean(localStorage.getItem("persist")) || true;
				setPersist(value);
				if (mounted) {
					const isValid = await isAccessTokenValid(auth);
					if (!isValid) await refreshAccessToken();
				} else {
					setIsLoading(false);
				}
			} catch (err) {
				console.error(err);
			} finally {
				if (mounted) setIsLoading(false);
			}
		};

		const initializeProfileInfo = async (userID: string, accessToken: string) => {
			try {
				const response = await fetch(`/api/profile/${userID}/getprofileinfo`, {
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Credentials": "true",
						Authorization: `Bearer ${accessToken}`,
					},
					method: "GET",
				});
				const data = await response.json();
				if (response.ok) {
					const payload = data as ProfileInfo;
					if (payload) {
						setProfileInfo(payload);
					}
				}
			} catch (err) {
				console.error(err);
			}
		};

		if (!initializingAuth.current) {
			if (!auth || !auth.accessToken || auth.exp < Date.now() / 1000) {
				initializingAuth.current = true;
				initializeAuth().finally(() => {
					initializingAuth.current = false;
				});
			}
		}

		if (!initializingProfileInfo.current) {
			if (!profileInfo && auth) {
				initializingProfileInfo.current = true;
				initializeProfileInfo(auth.userID, auth.accessToken).finally(() => {
					initializingProfileInfo.current = false;
				});
			}
		}
		return () => {
			// Cleanup
			setIsLoading(false);
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				profileInfo,
				setProfileInfo,
				persist,
				setPersist,
				isAccessTokenValid,
				refreshAccessToken,
			}}
		>
			{!persist ? children : isLoading ? null : children}
		</AuthContext.Provider>
	);
};
