import { NextResponse, NextRequest } from "next/server";
import { authenticateUserTicket, createRefreshToken } from "@/util/ServerFunctions";
import { SteamAuthTicketParams, SteamAuthTicketResponse, SteamAuthTicketResponseError } from "@/types/Interfaces";
import { cookies } from "next/headers";
import { findOrCreateUserFromSteamUser } from "@/util/DatabaseFunctions";

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

		const [errorMsg, user] = await findOrCreateUserFromSteamUser(authResponse.steamid);
		if (!user) return NextResponse.json({ errorcode: 99, errordesc: errorMsg }, { status: 400 });

		const refreshToken = createRefreshToken(user.userID, user.displayName || "");

		// save long-lived refresh token in database
		await user.update({ refreshToken: refreshToken });

		// Send long-lived refresh token as cookie
		cookies().set("jwt", refreshToken as string, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
			maxAge: 24 * 60 * 60 * 365 * 5,
		});
		authResponse.displayname = user.displayName;
		return NextResponse.json(authResponse, { status: 200 });
	} catch (error) {
		const steamError = error as SteamAuthTicketResponseError;
		return steamError
			? NextResponse.json(steamError, { status: 400 })
			: NextResponse.json({ errorcode: -1, errordesc: "Unknown Error." }, { status: 400 });
	}
}
