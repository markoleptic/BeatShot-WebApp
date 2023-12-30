import { NextResponse, NextRequest } from "next/server";
import { authenticateUserTicket, createRefreshToken } from "@/app/api/authfunctions";
import { SteamAuthTicketParams, SteamAuthTicketResponse } from "@/app/api/interfaces";
import { cookies } from "next/headers";
import { findOrCreateUserFromSteamUser } from "@/app/api/databasefunctions";

// client in game sends session ticket to this endpoint for verification
export async function GET(req: NextRequest, { params }: SteamAuthTicketParams) {
	const hostUrl = process.env.NODE_ENV === "production" ? process.env.host_production : process.env.host_development;
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

		const [errorMsg, user] = await findOrCreateUserFromSteamUser(authResponse.steamid);
		if (!user)
			return NextResponse.redirect(`${hostUrl as string}/redirect/?context=fetchsteamuser&success=false`, {
				status: 302,
			});

		const refreshToken = createRefreshToken(user.userID, user.displayName || "");

		// save long-lived refresh token in database
		await user.update({ refreshToken: refreshToken });

		// Send long-lived refresh token as cookie
		cookies().set("jwt", refreshToken, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
			maxAge: 24 * 60 * 60 * 365 * 5,
		});

		return NextResponse.redirect(`${hostUrl as string}/profile/${user.userID}`, { status: 302 });
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(`${hostUrl as string}/redirect/?context=unknown&success=false`, { status: 302 });
	}
}
