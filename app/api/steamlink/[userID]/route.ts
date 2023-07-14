import { NextResponse, NextRequest } from "next/server";
import { createRelyingParty, getRedirectUrl, createSteamVerifyUrl, hostUrl } from "@/app/api/authfunctions";
import { UserIDParams } from "@/app/api/interfaces";

// link steam account endpoint accessed from client, returns redirectURL or error
export async function GET(req: NextRequest, { params }: UserIDParams) {
  if (!params.userID) {
    return NextResponse.redirect(`${hostUrl as string}/redirect/?context=nouserid&success=false`, { status: 302 });
  }

  try {
    const relyingParty = createRelyingParty(createSteamVerifyUrl(params.userID) as string);
    const authUrl = await getRedirectUrl(relyingParty);

    if (authUrl.startsWith("Authentication failed.")) {
      return NextResponse.redirect(`${hostUrl as string}/redirect/?context=createsteamverifyurl&success=false`, { status: 302 });
    } else {
      return NextResponse.redirect(`${authUrl}`, { status: 302 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(`${hostUrl as string}/redirect/?context=unknown&success=false`, { status: 302 });
  }
}
