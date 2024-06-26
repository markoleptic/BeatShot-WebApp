import { NextResponse, NextRequest } from "next/server";
import { getRedirectUrl, createRelyingParty } from "@/utility/ServerFunctions";

// steam login endpoint, returns redirectURL or error
export async function GET(req: NextRequest) {
	const hostUrl = process.env.NODE_ENV === "production" ? process.env.host_production : process.env.host_development;
	const steamVerifyUrl =
		process.env.NODE_ENV === "production"
			? process.env.STEAM_VERIFY_URL_production
			: process.env.STEAM_VERIFY_URL_development;
	const relyingParty = createRelyingParty(steamVerifyUrl as string);

	const authUrl = await getRedirectUrl(relyingParty);
	if (authUrl.startsWith("Authentication failed")) {
		return NextResponse.redirect(`${hostUrl as string}/redirect/?context=createsteamverifyurl&success=false`, {
			status: 302,
		});
	} else {
		return NextResponse.redirect(`${authUrl}`, { status: 302 });
	}
}
