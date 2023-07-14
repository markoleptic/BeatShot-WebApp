import { NextResponse, NextRequest } from "next/server";
import { getRedirectUrl, createRelyingParty, createSteamVerifyUrl, hostUrl } from "@/app/api/authfunctions";

// steam login endpoint, returns redirectURL or error
export async function GET(req: NextRequest) {
  try {
    const steamVerifyUrl = createSteamVerifyUrl();
    const relyingParty = createRelyingParty(steamVerifyUrl);
    const authUrl = await getRedirectUrl(relyingParty);

    if (authUrl.startsWith("Authentication failed")) {
      return NextResponse.redirect(`${hostUrl as string}/redirect/?context=createsteamverifyurl&success=false`, { status: 302 });
    } else {
      return NextResponse.redirect(`${authUrl}`, { status: 302 });
    }
  } catch (error) {
    console.log(error);
    console.log("api/login/steam redirecting to unknown error");
    return NextResponse.redirect(`${hostUrl as string}/redirect/?context=unknown&success=false`, { status: 302 });
  }
}
