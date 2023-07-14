import { NextResponse, NextRequest } from "next/server";
import { instanceOfSteamUser, refreshTokenLength } from "@/app/api/interfaces";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import { users } from "@/models";
import {
  createRelyingParty,
  authenticateSteamUser,
  fetchSteamUser,
  createSteamVerifyUrl,
  hostUrl,
} from "@/app/api/authfunctions";

// return URI from Steam
export async function GET(req: NextRequest) {
  console.log("made it inside steam/authenticate/route.ts");
  try {
    // verify
    const authResult = await authenticateSteamUser(req, createRelyingParty(createSteamVerifyUrl()));
    if (!authResult.result || authResult.status >= 400) {
      return NextResponse.redirect(`${hostUrl as string}/redirect/?context=authsteamuser&success=false`, {
        status: 302,
      });
    }

    // fetch SteamUser
    const steamID = authResult.result.claimedIdentifier as string;
    steamID.replace(process.env.STEAM_OPENID_URL as string, "");
    const user = await fetchSteamUser(steamID);
    if (!instanceOfSteamUser(user)) {
      return NextResponse.redirect(`${hostUrl as string}/redirect/?context=fetchsteamuser&success=false`, {
        status: 302,
      });
    }

    let foundUser = await users.findOne({ where: { userID: user.steamid } });

    if (!foundUser) {
      foundUser = await users.create({ userID: user.steamid, displayName: user.personaname, confirmed: 1 });
    }

    // update display name
    if (foundUser.displayName !== user.personaname) {
      await foundUser.update({ displayName: user.personaname });
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
    return NextResponse.redirect(`${hostUrl as string}/redirect/?context=unknown&success=false`, { status: 302 });
  }
}
