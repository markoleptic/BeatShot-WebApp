import { NextResponse, NextRequest } from "next/server";
import {
	instanceOfSteamUser,
	authenticateSteamUser,
	createRelyingParty,
	fetchSteamUser,
	createSteamVerifyLinkAccountUrl,
} from "@/utility/ServerFunctions";
import { users } from "@/models/index";
import { findUser } from "@/utility/DatabaseFunctions";

// return URI from Steam
export async function GET(req: NextRequest) {
	const hostUrl = process.env.NODE_ENV === "production" ? process.env.host_production : process.env.host_development;

	// get userID param
	const userID = req.nextUrl.searchParams.get("userid");
	if (!userID) {
		return NextResponse.redirect(`${hostUrl as string}/redirect/?context=nouserid&success=false`, { status: 302 });
	}

	// verify
	const verifyUrl = createSteamVerifyLinkAccountUrl(userID);
	const relyingParty = createRelyingParty(verifyUrl);
	try {
		const authResult = await authenticateSteamUser(req.url, relyingParty);
		if (!authResult.result || authResult.status > 400 || !authResult.result.authenticated) {
			return NextResponse.redirect(`${hostUrl as string}/redirect/?context=createsteamverifyurl&success=false`, {
				status: 302,
			});
		}

		// fetch SteamUser
		const steamID = authResult.result.claimedIdentifier as string;
		steamID.replace(process.env.STEAM_OPENID_URL as string, "");
		const [steamErrMsg, steamUser] = await fetchSteamUser(steamID);
		if (!instanceOfSteamUser(steamUser)) {
			return NextResponse.redirect(`${hostUrl as string}/redirect/?context=fetchsteamuser&success=false`, {
				status: 302,
			});
		}

		// fetch user in database
		const [errMsg, foundUser] = await findUser(userID);
		if (!foundUser) {
			return NextResponse.redirect(`${hostUrl as string}/redirect/?context=steamlinknouser&success=false`, {
				status: 302,
			});
		}
		if (foundUser.confirmed === 0) {
			return NextResponse.redirect(`${hostUrl as string}/redirect/?context=steamlinkemail&success=false`, {
				status: 302,
			});
		}
		if (foundUser.userID === steamUser.steamid) {
			return NextResponse.redirect(`${hostUrl as string}/redirect/?context=steamalreadylinked`, { status: 302 });
		}

		const [errMsg2, existingSteamUser] = await findUser(steamUser.steamid);

		if (existingSteamUser && existingSteamUser.userID !== foundUser.userID) {
			return NextResponse.redirect(`${hostUrl as string}/redirect/?context=steamlinkedtodiffaccount`, {
				status: 302,
			});
		}

		await users.update(
			{ userID: steamUser.steamid, displayName: steamUser.personaname },
			{ where: { userID: foundUser.userID } }
		);

		return NextResponse.redirect(`${hostUrl as string}/redirect/?context=steamlink&success=true`, { status: 302 });
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(`${hostUrl as string}/redirect/?context=unknown&success=false`, { status: 302 });
	}
}
