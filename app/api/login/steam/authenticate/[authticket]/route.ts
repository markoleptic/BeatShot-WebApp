import { NextResponse, NextRequest } from "next/server";
import { authenticateUserTicket, fetchSteamUser, hostUrl  } from "@/app/api/authfunctions";
import { SteamAuthTicketParams, SteamAuthTicketResponse, SteamUser, refreshTokenLength } from "@/app/api/interfaces";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { users } from "@/models";

// client in game sends session ticket to this endpoint for verification
export async function GET(req: NextRequest, { params }: SteamAuthTicketParams) {
  const authTicket = params.authticket;

  if (!authTicket) {
    return NextResponse.redirect(`${hostUrl as string}/redirect/?context=authsteamuser&success=false`, {
      status: 302,
    });
  }

  try {
    const authResponse = (await authenticateUserTicket(authTicket)) as SteamAuthTicketResponse;
    if (!authResponse || authResponse.result !== "OK") {
      return NextResponse.redirect(`${hostUrl as string}/redirect/?context=authsteamuser&success=false`, {
        status: 302,
      });
    }

    let foundUser = await users.findOne({ where: { userID: authResponse.steamid } });
    if (!foundUser) {
      const steamUser = (await fetchSteamUser(authResponse.steamid)) as SteamUser;
      if (!steamUser) {
        return NextResponse.redirect(`${hostUrl as string}/redirect/?context=fetchsteamuser&success=false`, {
          status: 302,
        });
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

    return NextResponse.redirect(`${hostUrl as string}/profile/${foundUser.userID}`, { status: 302 });
  } catch (error) {
    console.log(error);
    console.log("api/login/steam/authenticate/authticket redirecting to unknown error");
    return NextResponse.redirect(`${hostUrl as string}/redirect/?context=unknown&success=false`, { status: 302 });
  }
}
