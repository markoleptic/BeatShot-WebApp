import { NextResponse, NextRequest } from "next/server";
import { createAccessToken, verifyJWT } from "@/utility/ServerFunctions";

// returns a short lived access token from a jwt cookie
export async function GET(req: NextRequest) {
	// refresh token will be in the incoming request cookie
	const refreshToken = req.cookies.get("jwt");

	if (!refreshToken) {
		return NextResponse.json({ message: "No Refresh Token" }, { status: 401 });
	}

	try {
		// verify using refresh token secret
		const userID = await verifyJWT(refreshToken.value, process.env.REFRESH_TOKEN_SECRET as string);

		if (!userID) {
			return NextResponse.json({ message: "Failed to verify jwt." }, { status: 401 });
		}

		// create short-lived access token
		const accessToken = createAccessToken(userID);

		// send short-lived access token
		return NextResponse.json({ accessToken: accessToken }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
	}
}
