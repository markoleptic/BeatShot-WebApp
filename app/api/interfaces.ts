import { verify } from "jsonwebtoken";

export const accessTokenLength = "30s";
export const refreshTokenLength = "1825d";
export const recoveryTokenLength = "5m";
export const confirmationTokenLength = "24h";
export const saltRounds = 10;

export interface TokenInterface {
	userID: string;
	displayName?: string;
}

export interface TokenParams {
	params: {
		token: string;
	};
}

export interface UserIDParams {
	params: {
		userID: string;
	};
}

export interface NewUserIDParams {
	nextUserID: string;
}

export interface AuthData {
	userID: string;
	displayName: string;
	accessToken: string;
	iat: number;
	exp: number;
}

// this type is the actual type you are holding in state
export type AuthContextType = {
	auth: AuthData | null;
	setAuth: (newAuth: AuthData | null) => void;
	persist: boolean;
	setPersist: (newPersist: boolean) => void;
	isAccessTokenValid: () => Promise<boolean>;
	refreshAccessToken: () => Promise<AuthData | null>;
};

export interface SteamUser {
	steamid: string;
	communityvisibilitystate: number;
	profilestate: number;
	personaname: string;
	commentpermission: number;
	profileurl: string;
	avatar: string;
	avatarmedium: string;
	avatarfull: string;
	avatarhash: string;
	lastlogoff: number;
	personastate: number;
	primaryclanid: string;
	timecreated: number;
	personastateflags: number;
	loccountrycode: string;
	locstatecode: string;
}

export interface SteamAuthTicketParams {
	params: {
		authticket: string;
	};
}

export interface SteamAuthTicketResponse {
	result: string;
	steamid: string;
	ownersteamid: string;
	vacbanned: boolean;
	publisherbanned: boolean;
	displayname?: string;
}

export interface SteamAuthTicketResponseError {
	errorcode: number;
	errordesc: string;
}

export interface AuthResult {
	status: number;
	message: string;
	result?:
		| {
				authenticated: boolean;
				claimedIdentifier?: string | undefined;
		  }
		| undefined;
}

export function instanceOfSteamUser(object: any): object is SteamUser {
	return "steamid" in object;
}

export function instanceOfAuthResult(object: any): object is AuthResult {
	return "status" in object && "message" in object;
}

export function instanceOfTokenInterface(object: any): object is TokenInterface {
	return "userID" in object;
}

export async function verifyJWT(token: string, secret: string): Promise<string | TokenInterface> {
	return new Promise<string | TokenInterface>((resolve, reject) => {
		verify(token, secret, async (err, decoded) => {
			if (err) {
				return reject(err.message);
			}
			if (!decoded) {
				return reject("Unable to authenticate.");
			}
			if (instanceOfTokenInterface(decoded)) {
				return resolve(decoded as TokenInterface);
			} else {
				return resolve(decoded as any);
			}
		});
	});
}
