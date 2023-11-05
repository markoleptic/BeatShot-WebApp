import { NextResponse, NextRequest } from "next/server";
import { instanceOfSteamUser } from "@/app/api/interfaces";
import { cookies } from "next/headers";
import { authenticateSteamUser, fetchSteamUser, createRelyingParty, createRefreshToken } from "@/app/api/authfunctions";
import { findOrCreateUser } from "@/app/api/databasefunctions";

// return URI from Steam
export async function GET(req: NextRequest) {
  const hostUrl = process.env.NODE_ENV === "production" ? process.env.host_production : process.env.host_development;
  const steamVerifyUrl =
    process.env.NODE_ENV === "production"
      ? process.env.STEAM_VERIFY_URL_production
      : process.env.STEAM_VERIFY_URL_development;

  const relyingParty = createRelyingParty(steamVerifyUrl as string);

  const authResult = await authenticateSteamUser(req.url, relyingParty);
  if (!authResult.result || authResult.status >= 400) {
    return NextResponse.redirect(`${hostUrl as string}/redirect/?context=authsteamuser&success=false`, {
      status: 302,
    });
  }
  const steamID = authResult.result.claimedIdentifier as string;
  steamID.replace(process.env.STEAM_OPENID_URL as string, "");
  const [errorMsg, steamUser] = await fetchSteamUser(steamID);
  if (!instanceOfSteamUser(steamUser)) {
    return NextResponse.redirect(`${hostUrl as string}/redirect/?context=fetchsteamuser&success=false`, {
      status: 302,
    });
  }

  const [_, user] = await findOrCreateUser(steamUser.steamid, steamUser.personaname);
  if (!user)  
    return NextResponse.redirect(`${hostUrl as string}/redirect/?context=fetchsteamuser&success=false`, {
    status: 302,
  });

  const refreshToken = createRefreshToken(user.userID, steamUser.personaname);
  await user.update({ displayName: steamUser.personaname, refreshToken: refreshToken });

  // Send long-lived refresh token as cookie
  cookies().set("jwt", refreshToken as string, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 365 * 5,
  });
  return NextResponse.redirect(`${hostUrl as string}/profile/${user.userID}`, { status: 302 });
}
