import { NextResponse, NextRequest } from "next/server";
import { instanceOfSteamUser } from "@/app/api/interfaces";
import { users } from "@/models";
import {
  authenticateSteamUser,
  createRelyingParty,
  createSteamVerifyUrl,
  fetchSteamUser,
} from "@/app/api/authfunctions";

// return URI from Steam
export async function GET(req: NextRequest) {
  // get userID param
  const userID = req.nextUrl.searchParams.get("userid");

  if (!userID) {
    return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=nouserid&success=false`, { status: 302 });
  }

  try {
    // verify
    const authResult = await authenticateSteamUser(req, createRelyingParty(createSteamVerifyUrl(userID)));
    if (!authResult.result || authResult.status > 400 || !authResult.result.authenticated) {
      return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=createsteamverifyurl&success=false`, { status: 302 });
    }

    // fetch SteamUser
    const steamID = authResult.result.claimedIdentifier as string;
    steamID.replace(process.env.STEAM_OPENID_URL as string, "")
    const steamUser = await fetchSteamUser(steamID);
    if (!instanceOfSteamUser(steamUser)) {
      return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=fetchsteamuser&success=false`, { status: 302 });
    }

    // fetch user in database
    const foundUser = await users.findOne({ where: { userID: userID } });
    if (!foundUser) {
      return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=steamlinknouser&success=false`, { status: 302 });
    }

    if (foundUser.confirmed === 0) {
      return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=steamlinkemail&success=false`, { status: 302 });
    }

    if (foundUser.userID === steamUser.steamid) {
      return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=steamalreadylinked`, { status: 302 });
    }

    await users.update(
      { userID: steamUser.steamid, displayName: steamUser.personaname },
      { where: { userID: foundUser.userID } }
    );
    return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=steamlink&success=true`, { status: 302 });
  } catch (error) {
    return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=unknown&success=false`, { status: 302 });
  }
}
