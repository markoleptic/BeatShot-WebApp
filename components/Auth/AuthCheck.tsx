"use client";
import { useAuthContext } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

export const AuthCheck = ({ children }: { children: React.ReactNode }) => {
	const { auth, isAccessTokenValid, refreshAccessToken } = useAuthContext();
	const [isValid, setIsValid] = useState<boolean | null>(null);
	useEffect(() => {
		const checkAccessToken = async () => {
			try {
				let result = await isAccessTokenValid(auth);
				if (!result) {
					result = await refreshAccessToken();
				}
				setIsValid(result);
			} catch (error) {
				console.error("Error checking access token:", error);
			}
		};

		checkAccessToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{isValid ? children : null}</>;
};
