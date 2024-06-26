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

export type SteamAuthTicketResponse = {
	result: string;
	steamid: string;
	ownersteamid: string;
	vacbanned: boolean;
	publisherbanned: boolean;
	displayname?: string;
};

export type SteamAuthTicketResponseError = {
	errorcode: number;
	errordesc: string;
};
