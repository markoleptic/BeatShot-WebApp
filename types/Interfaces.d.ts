import { DateTime, WeekdayNumbers } from "luxon";

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

export type ProfileInfo = {
	displayName: string;
	steamLinked: number;
};

export type AuthData = {
	userID: string;
	accessToken: string;
	iat: number;
	exp: number;
};

// this type is the actual type you are holding in state
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

export type SteamUser = {
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
};

export type SteamAuthTicketParams = {
	params: {
		authticket: string;
	};
};

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

export interface HeatMapCalendar {
	x: string;
	y: WeekdayNumbers;
	d: DateTime<true>;
	v: number;
}

export interface HeatMapLabels {
	label: string[];
	value: HeatMapCalendar[];
}

export interface LabelValue {
	value: string;
	label: string;
}

export interface LocationAccuracyHeatMapData {
	x: number;
	y: number;
	v: number;
}

export interface FilteredScore {
	score: number;
	highScore: number;
	accuracy: number;
	streak: number;
	difficulty: string;
	completion: number;
	timeOffset: number;
	locationAccuracy: LocationAccuracyHeatMapData[];
}
