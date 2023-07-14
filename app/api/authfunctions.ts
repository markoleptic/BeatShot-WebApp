import { NextRequest } from "next/server";
import openid, { RelyingParty } from "openid";
import {
  SteamUser,
  AuthResult,
  SteamAuthTicketResponse,
  SteamAuthTicketResponseError,
  recoveryTokenLength,
  confirmationTokenLength,
} from "./interfaces";
import * as aws from "@aws-sdk/client-ses";
import nodemailer, { Transporter } from "nodemailer";
import { SESClient } from "@aws-sdk/client-ses";
import { users } from "@/models";
import { sign } from "jsonwebtoken";

const URLRegex = /^https?:\/\/steamcommunity\.com\/openid\/id\/\d+$/;

const getPlayerSummariesKey = "/?key=";
const getPlayerSummariesSteamIds = "&steamids=";

const authUserTicketURL =
  process.env.NODE_ENV === "production"
    ? process.env.STEAM_AUTH_USER_TICKET_URL_production
    : process.env.STEAM_AUTH_USER_TICKET_URL_development;

const getPlayerSummariesURL =
  process.env.NODE_ENV === "production"
    ? process.env.STEAM_GET_PLAYER_SUMMARIES_URL_production
    : process.env.STEAM_GET_PLAYER_SUMMARIES_URL_development;

const steamVerifyUrl =
  process.env.NODE_ENV === "production"
    ? process.env.STEAM_VERIFY_URL_production
    : process.env.STEAM_VERIFY_URL_development;

const steamVerifyLinkAccountUrl =
  process.env.NODE_ENV === "production"
    ? process.env.STEAM_VERIFY_LINK_ACCOUNT_URL_production
    : process.env.STEAM_VERIFY_LINK_ACCOUNT_URL_development;

export const hostUrl =
  process.env.NODE_ENV === "production" ? process.env.host_production : process.env.host_development;

// creates a relying party for the specific verify Url
export function createRelyingParty(verifyUrl: string): RelyingParty {
  return new openid.RelyingParty(
    verifyUrl, // Verification URL
    hostUrl as string,
    true, // stateless
    true, // Strict mode
    []
  );
}

// returns a regular steam verify URL if no userID provided, otherwise returns one with userID as searchParam
export function createSteamVerifyUrl(userID?: string): string {
  if (userID !== undefined) {
    return steamVerifyLinkAccountUrl?.concat("?userid=", userID) as string;
  }
  return steamVerifyUrl as string;
}

// Associate and return authentication URL
export async function getRedirectUrl(relyingParty: RelyingParty): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    relyingParty.authenticate(process.env.STEAM_OPENID_URL as string, false, (error, authUrl) => {
      if (error) return reject("Authentication failed: " + error);
      if (!authUrl) return reject("Authentication failed.");
      resolve(authUrl);
    });
  });
}

// Fetch the SteamUser json object
export async function fetchSteamUser(steamID: string): Promise<SteamUser | string> {
  return new Promise<SteamUser | string>(async (resolve, reject) => {
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
      if (!response) reject("Error fetching from Steam servers.");
      const data = await response.json();
      if (!data) reject("Error fetching from Steam servers.");
      const players = data.response.players;
      if (players && players.length > 0) {
        resolve(players[0]);
      } else {
        reject("No players found for the given SteamID.");
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

// calls verifyAssertion on the request
export async function authenticateSteamUser(requestURL: string, relyingParty: RelyingParty): Promise<AuthResult> {
  return new Promise<AuthResult>((resolve, reject) => {
    relyingParty.verifyAssertion(requestURL, async (error, result) => {
      if (error) {
        console.log(error);
        return reject({ message: error.message, status: 400 } as AuthResult);
      }
      if (!result || !result.authenticated) {
        return reject({ message: "Unable to authenticate", status: 401 } as AuthResult);
      }
      if (!URLRegex.test(result.claimedIdentifier as string)) {
        return reject({ message: "Invalid Claimed Identifier", status: 401 } as AuthResult);
      }
      return resolve({ message: "Verified Assertion", status: 200, result } as AuthResult);
    });
  });
}

// uses the AuthenticateUserTicket request from the ISteamUserAuthInterface
export async function authenticateUserTicket(authTicket: string) {
  return new Promise<SteamAuthTicketResponse | SteamAuthTicketResponseError>(async (resolve, reject) => {
    const response = await fetch(
      `${authUserTicketURL}/?key=${process.env.STEAM_API_KEY}&appid=${process.env.BEATSHOT_APPID}&ticket=${authTicket}&identity=${process.env.STEAM_AUTH_TICKET_PCH_IDENTITY}`
    );
    if (!response) reject({ errorcode: 0, errormessage: "Error fetching from Steam servers." });

    const data = await response.json();
    if (!data) {
      reject({ errorcode: 0, errormessage: "Error fetching from Steam servers." });
    }
    if (data.response.error) {
      reject(data.response.error);
    }
    resolve(data.response.params);
  });
}

export async function createRecoveryToken(user: users): Promise<string> {
  const recoveryToken = sign({ userID: user.userID }, process.env.RECOV_TOKEN_SECRET as string, {
    expiresIn: recoveryTokenLength,
  });
  return recoveryToken;
}

export async function createConfToken(user: users): Promise<string> {
  const confToken = sign({ userID: user.userID }, process.env.CONF_TOKEN_SECRET as string, {
    expiresIn: confirmationTokenLength,
  });
  return confToken;
}

export async function sendRecoveryEmail(user: users, emailToken: string, origin: string) {
  const sesClient = new SESClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION as string,
  });

  const transporter: Transporter = nodemailer.createTransport({
    SES: { ses: sesClient },
  });

  const sendMessageInfo = await transporter.sendMail({
    from: "BeatShot Support <support@beatshot.gg>",
    to: `${user.email}`,
    subject: "BeatShot - Password Change",
    html: `Hello ${user.displayName},
        <br/>
        <br/>
        Please click <a href="${origin}/recover/${emailToken}">here</a> to change your password. This link expires in 5 minutes.
        <br/>
        <br/>
        Happy Shootin,
        <br/> 
        BeatShot Support`,
  });
  return sendMessageInfo;
}

export async function sendConfEmail(user: users, emailToken: string, origin: string) {
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
      Please click <a href=${origin}/confirmation/${emailToken}>here</a> to confirm your email. This link expires in 24 hours.
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
