export type TokenParams = {
	token: string;
};

export type UserIDParams = {
	userID: string;
};

export type TokenResponse = {
	userID: string;
	iat: number;
	exp: number;
};

export type AuthData = {
	userID: string;
	accessToken: string;
	iat: number;
	exp: number;
};

export type AuthContextType = {
	auth: AuthData | null;
	setAuth: (newAuth: AuthData | null) => void;
	profileInfo: ProfileInfo | null;
	setProfileInfo: (newProfileInfo: ProfileInfo | null) => void;
	persist: boolean;
	setPersist: (newPersist: boolean) => void;
	isAccessTokenValid: (auth: AuthData | null) => Promise<boolean>;
	refreshAccessToken: () => Promise<boolean>;
};

export type AuthResult = {
	status: number;
	message: string;
	result?:
		| {
				authenticated: boolean;
				claimedIdentifier?: string | undefined;
		  }
		| undefined;
};
