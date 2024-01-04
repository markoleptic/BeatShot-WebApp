import openid, { RelyingParty } from "openid";
import * as aws from "@aws-sdk/client-ses";
import nodemailer, { Transporter } from "nodemailer";
import { users } from "@/models";
import { sign, verify } from "jsonwebtoken";
import {
	SteamUser,
	AuthResult,
	SteamAuthTicketResponse,
	SteamAuthTicketResponseError,
	recoveryTokenLength,
	confirmationTokenLength,
	refreshTokenLength,
	accessTokenLength,
	TokenInterface,
} from "@/types/Interfaces";

// creates a relying party for the specific verify Url
export function createRelyingParty(verifyUrl: string): RelyingParty {
	const hostUrl = process.env.NODE_ENV === "production" ? process.env.host_production : process.env.host_development;
	return new openid.RelyingParty(
		verifyUrl, // Verification URL
		hostUrl as string,
		true, // stateless
		true, // Strict mode
		[]
	);
}

// returns a steam verify URL with userID as searchParam
export function createSteamVerifyLinkAccountUrl(userID: string): string {
	const steamVerifyLinkAccountUrl =
		process.env.NODE_ENV === "production"
			? process.env.STEAM_VERIFY_LINK_ACCOUNT_URL_production
			: process.env.STEAM_VERIFY_LINK_ACCOUNT_URL_development;
	return steamVerifyLinkAccountUrl?.concat("?userid=", userID) as string;
}

// Associate and return authentication URL
export async function getRedirectUrl(relyingParty: RelyingParty): Promise<string> {
	const steamOpenIdUrl = process.env.STEAM_OPENID_URL as string;
	return new Promise<string>((resolve, reject) => {
		relyingParty.authenticate(steamOpenIdUrl, false, (error, authUrl) => {
			if (error) return reject("Authentication failed: " + error);
			if (!authUrl) return reject("Authentication failed.");
			resolve(authUrl);
		});
	});
}

// Fetch the SteamUser json object
export async function fetchSteamUser(steamID: string): Promise<[string, SteamUser | null]> {
	const getPlayerSummariesKey = "/?key=";
	const getPlayerSummariesSteamIds = "&steamids=";
	const getPlayerSummariesURL =
		process.env.NODE_ENV === "production"
			? process.env.STEAM_GET_PLAYER_SUMMARIES_URL_production
			: process.env.STEAM_GET_PLAYER_SUMMARIES_URL_development;
	return new Promise<[string, SteamUser | null]>(async (resolve) => {
		try {
			const response = await fetch(
				`${
					getPlayerSummariesURL +
					getPlayerSummariesKey +
					process.env.STEAM_API_KEY +
					getPlayerSummariesSteamIds +
					steamID
				}`
			);
			if (!response) resolve(["Error fetching from Steam servers.", null]);
			const data = await response.json();
			if (!data) resolve(["Error fetching from Steam servers.", null]);
			const players = data.response.players;
			if (!players || players.length === 0) resolve(["No players found for the given SteamID.", null]);

			resolve(["", players[0]]);
		} catch (error) {
			console.log(error);
			resolve([error as string, null]);
		}
	});
}

// calls verifyAssertion using the requestURL and the relyingParty created from a previous request
export async function authenticateSteamUser(requestURL: string, relyingParty: RelyingParty): Promise<AuthResult> {
	const URLRegex = /^https?:\/\/steamcommunity\.com\/openid\/id\/\d+$/;
	return new Promise<AuthResult>((resolve, reject) => {
		relyingParty.verifyAssertion(requestURL, async (error, result) => {
			if (error) {
				console.log(error);
				return reject({
					message: error.message,
					status: 400,
				} as AuthResult);
			}
			if (!result || !result.authenticated) {
				return reject({
					message: "Unable to authenticate",
					status: 401,
				} as AuthResult);
			}
			if (!URLRegex.test(result.claimedIdentifier as string)) {
				return reject({
					message: "Invalid Claimed Identifier",
					status: 401,
				} as AuthResult);
			}
			return resolve({
				message: "Verified Assertion",
				status: 200,
				result,
			} as AuthResult);
		});
	});
}

// uses the AuthenticateUserTicket request from the ISteamUserAuthInterface
export async function authenticateUserTicket(authTicket: string) {
	const authUserTicketURL =
		process.env.NODE_ENV === "production"
			? process.env.STEAM_AUTH_USER_TICKET_URL_production
			: process.env.STEAM_AUTH_USER_TICKET_URL_development;
	return new Promise<SteamAuthTicketResponse | SteamAuthTicketResponseError>(async (resolve, reject) => {
		const response = await fetch(
			`${authUserTicketURL}/?key=${process.env.STEAM_API_KEY}&appid=${process.env.BEATSHOT_APPID}&ticket=${authTicket}&identity=${process.env.STEAM_AUTH_TICKET_PCH_IDENTITY}`
		);
		if (!response)
			reject({
				errorcode: 0,
				errormessage: "Error fetching from Steam servers.",
			});

		const data = await response.json();
		if (!data) {
			reject({
				errorcode: 0,
				errormessage: "Error fetching from Steam servers.",
			});
		}
		if (data.response.error) {
			reject(data.response.error);
		}
		resolve(data.response.params);
	});
}

export async function createRecoveryToken(user: users): Promise<string> {
	const recoveryToken = sign({ userID: String(user.userID) }, process.env.RECOV_TOKEN_SECRET as string, {
		expiresIn: recoveryTokenLength,
	});
	return recoveryToken;
}

export async function createConfToken(user: users): Promise<string> {
	const confToken = sign({ userID: String(user.userID) }, process.env.CONF_TOKEN_SECRET as string, {
		expiresIn: confirmationTokenLength,
	});
	return confToken;
}

// create long-lived refresh token
export function createRefreshToken(userID: string): string {
	const refreshToken = sign({ userID: String(userID) }, process.env.REFRESH_TOKEN_SECRET as string, {
		expiresIn: refreshTokenLength,
	});
	return refreshToken;
}

// create short-lived access token, also use displayName so it doesn't need to be queried for separately
export function createAccessToken(userID: string | bigint): string {
	const accessToken = sign({ userID: String(userID) }, process.env.ACCESS_TOKEN_SECRET as string, {
		expiresIn: accessTokenLength,
	});
	return accessToken;
}

export async function sendRecoveryEmail(user: users, emailToken: string) {
	const hostUrl = process.env.NODE_ENV === "production" ? process.env.host_production : process.env.host_development;
	const config: aws.SESClientConfig = {
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
		},
		region: process.env.AWS_REGION as string,
	};
	const ses = new aws.SES(config);
	const transporter: Transporter = nodemailer.createTransport({
		SES: { ses, aws },
	});
	const sendMessageInfo = await transporter.sendMail({
		from: "BeatShot Support <support@beatshot.gg>",
		to: `${user.email}`,
		subject: "BeatShot - Password Change",
		html: `Hello ${user.displayName},
        <br/>
        <br/>
        Please click <a href="${hostUrl}/recover/${emailToken}">here</a> to change your password. This link expires in 5 minutes.
        <br/>
        <br/>
        Happy Shootin,
        <br/> 
        BeatShot Support`,
	});
	return sendMessageInfo;
}

export async function sendConfEmail(user: users, emailToken: string) {
	const hostUrl = process.env.NODE_ENV === "production" ? process.env.host_production : process.env.host_development;
	const config: aws.SESClientConfig = {
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
		},
		region: process.env.AWS_REGION as string,
	};
	const ses = new aws.SES(config);
	const transporter: Transporter = nodemailer.createTransport({
		SES: { ses, aws },
	});
	const sendMessageInfo = await transporter.sendMail({
		from: "BeatShot Support <support@beatshot.gg>",
		to: `${user.email}`,
		subject: "BeatShot - Email Confirmation",
		html: `Thanks for creating an account with BeatShot, ${user.displayName}!
      <br/>
      <br/>
      Please click <a href=${hostUrl}/confirmation/${emailToken}>here</a> to confirm your email. This link expires in 24 hours.
      <br/>
      <br/>
      Happy Shootin,
      <br/> 
      BeatShot Support`,
	});
	return sendMessageInfo;
}

export async function sendFeedbackEmail(title: string, content: string) {
	const config: aws.SESClientConfig = {
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
		},
		region: process.env.AWS_REGION as string,
	};
	const ses = new aws.SES(config);
	const transporter: Transporter = nodemailer.createTransport({
		SES: { ses, aws },
	});
	const sendMessageInfo = await transporter.sendMail({
		from: "BeatShot Support <support@beatshot.gg>",
		to: "support@beatshot.gg",
		subject: `Feedback: ${title}`,
		html: `${content}`,
	});
	return sendMessageInfo;
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
