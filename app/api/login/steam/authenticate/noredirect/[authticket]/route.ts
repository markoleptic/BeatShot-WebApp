import { NextResponse, NextRequest } from "next/server";
import { authenticateUserTicket, fetchSteamUser } from "@/app/api/authfunctions";
import {
  SteamAuthTicketParams,
  SteamAuthTicketResponse,
  SteamAuthTicketResponseError,
  SteamUser,
  refreshTokenLength,
} from "@/app/api/interfaces";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { users } from "@/models";

// client in game sends session ticket to this endpoint for verification
export async function GET(req: NextRequest, { params }: SteamAuthTicketParams) {
  const authTicket = params.authticket;

  if (!authTicket) {
    return NextResponse.json({ errorcode: 99, errordesc: "No Authentication ticket provided." }, { status: 400 });
  }

  try {
    const authResponse = (await authenticateUserTicket(authTicket)) as SteamAuthTicketResponse;
    if (!authResponse || authResponse.result !== "OK") {
      return NextResponse.json({ errorcode: 99, errordesc: "Unable to authenticate." }, { status: 401 });
    }

    let foundUser = await users.findOne({ where: { userID: authResponse.steamid } });
    if (!foundUser) {
      const steamUser = (await fetchSteamUser(authResponse.steamid)) as SteamUser;
      if (!steamUser) {
        return NextResponse.json({ errorcode: 99, errordesc: "Failed to fetch steam user." }, { status: 400 });
      }
      foundUser = await users.create({ userID: steamUser.steamid, displayName: steamUser.personaname, confirmed: 1 });
    }

    // create long-lived refresh token
    const refreshToken = sign(
      { userID: foundUser.userID, displayName: foundUser.displayName },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: refreshTokenLength }
    );

    // save long-lived refresh token in database
    await foundUser.update({ refreshToken: refreshToken });

    // Send long-lived refresh token as cookie
    cookies().set("jwt", refreshToken as string, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 365 * 5,
    });
    authResponse.displayname = foundUser.displayName;
    return NextResponse.json(authResponse, { status: 200 });
  } catch (error) {
    const steamError = error as SteamAuthTicketResponseError;
    return steamError
      ? NextResponse.json(steamError, { status: 400 })
      : NextResponse.json({ errorcode: -1, errordesc: "Unknown Error." }, { status: 400 });
  }
}
