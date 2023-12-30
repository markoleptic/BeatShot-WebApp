import { AuthData } from "@/app/api/interfaces";
import { decodeJwt } from "jose";

// requests a fresh access token from api, and returns AuthData object
export const useRefreshToken = () => {
	const refresh = async () => {
		try {
			const response = await fetch("/api/refresh", {
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				method: "GET",
			});
			const data = await response.json();
			const payload = decodeJwt(data?.accessToken);
			const authData = {
				userID: payload.userID,
				displayName: payload.displayName,
				accessToken: data.accessToken,
				iat: payload.iat,
				exp: payload.exp,
			} as AuthData;
			return authData ? authData : null;
		} catch (err) {
			console.error(err);
			return null;
		}
	};
	return refresh;
};
