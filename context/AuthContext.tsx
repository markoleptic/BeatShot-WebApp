"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthData, AuthContextType } from "@/app/api/interfaces";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { JWTVerifyResult, jwtVerify } from "jose";

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
	const [persist, setPersist] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const refresh = useRefreshToken();

	const isAccessTokenValid = async () => {
		if (!auth || auth.accessToken || auth.exp < Date.now() / 1000) return false;
		const payload = (await jwtVerify(auth?.accessToken as string, secret)) as JWTVerifyResult;
		return payload ? true : false;
	};

	const refreshAccessToken = async () => {
		const authResponse = await refresh();
		if (authResponse) {
			setAuth(authResponse);
			return authResponse;
		}
		return null;
	};

	useEffect(() => {
		const initializeAuth = async () => {
			let mounted = true;
			try {
				const value = Boolean(localStorage.getItem("persist")) || true;
				setPersist(value);
				if (mounted && persist) {
					const isValid = await isAccessTokenValid();
					if (!isValid) await refreshAccessToken();
				} else {
					setIsLoading(false);
				}
			} catch (err) {
				console.error(err);
			} finally {
				mounted && setIsLoading(false);
			}
		};

		if (!auth || !auth.accessToken || auth.exp < Date.now() / 1000) {
			initializeAuth();
		}

		return () => {
			// Cleanup
			setIsLoading(false);
		};
	}, [auth]);

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
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
