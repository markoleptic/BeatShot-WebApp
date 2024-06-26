import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
	instanceOfSteamUser,
	authenticateSteamUser,
	fetchSteamUser,
	createRelyingParty,
	createRefreshToken,
} from "@/utility/ServerFunctions";
import { findOrCreateUserFromSteam } from "@/utility/DatabaseFunctions";

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

	const [_, user] = await findOrCreateUserFromSteam(steamUser.steamid, steamUser.personaname);
	if (!user)
		return NextResponse.redirect(`${hostUrl as string}/redirect/?context=fetchsteamuser&success=false`, {
			status: 302,
		});

	const refreshToken = createRefreshToken(user.userID);

	await user.update({
		displayName: steamUser.personaname,
		refreshToken: refreshToken,
	});

	if (user.steamLinked === 0) {
		await user.update({ steamLinked: 1 });
	}

	// Send long-lived refresh token as cookie
	cookies().set("jwt", refreshToken as string, {
		httpOnly: true,
		sameSite: "none",
		secure: true,
		maxAge: 24 * 60 * 60 * 365 * 5,
	});
	return NextResponse.redirect(`${hostUrl as string}/profile/${user.userID}`, { status: 302 });
}
