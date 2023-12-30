import { NextResponse, NextRequest } from "next/server";
import { createRelyingParty, getRedirectUrl, createSteamVerifyLinkAccountUrl } from "@/app/api/authfunctions";
import { UserIDParams } from "@/app/api/interfaces";

// link steam account endpoint accessed from client, returns redirectURL or error
export async function GET(req: NextRequest, { params }: UserIDParams) {
	const hostUrl = process.env.NODE_ENV === "production" ? process.env.host_production : process.env.host_development;

	const userID = params.userID;
	if (!userID) {
		return NextResponse.redirect(`${hostUrl as string}/redirect/?context=nouserid&success=false`, { status: 302 });
	}

	const verifyUrl = createSteamVerifyLinkAccountUrl(String(userID));
	const relyingParty = createRelyingParty(verifyUrl as string);

	const authUrl = await getRedirectUrl(relyingParty);
	if (authUrl.startsWith("Authentication failed.")) {
		return NextResponse.redirect(`${hostUrl as string}/redirect/?context=createsteamverifyurl&success=false`, {
			status: 302,
		});
	}
	return NextResponse.redirect(`${authUrl}`, { status: 302 });
}
