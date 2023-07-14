import { NextResponse, NextRequest } from "next/server";
import { getRedirectUrl, createRelyingParty, createSteamVerifyUrl } from "@/app/api/authfunctions";

// steam login endpoint, returns redirectURL or error
export async function GET(req: NextRequest) {
  try {
    const relyingParty = createRelyingParty(createSteamVerifyUrl());
    const authUrl = await getRedirectUrl(relyingParty);

    if (authUrl.startsWith("Authentication failed")) {
      return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=createsteamverifyurl&success=false`, { status: 302 });
    } else {
      return NextResponse.redirect(authUrl, { status: 302 });
    }
  } catch (error) {
    return NextResponse.redirect(`${req.nextUrl.origin}/redirect/?context=unknown&success=false`, { status: 302 });
  }
}
