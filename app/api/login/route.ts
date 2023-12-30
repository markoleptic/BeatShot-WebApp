import { NextResponse, NextRequest } from "next/server";
import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { createAccessToken, createRefreshToken } from "../authfunctions";
import { loginUser } from "../databasefunctions";

export async function POST(req: NextRequest) {
	const { username, email, password } = await req.json();

	const [errorMsg, user] = await loginUser(username, email, password);
	if (!user) {
		return NextResponse.json({ message: errorMsg }, { status: 401 });
	} else if (errorMsg.length !== 0) {
		return NextResponse.json({ message: errorMsg }, { status: 400 });
	}

	try {
		// evaluate password
		const match = await bcrypt.compare(password, user.password as string);
		if (!match) {
			return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
		}

		// create short-lived access token
		const accessToken = createAccessToken(user.userID, user.displayName || "");

		// create long-lived refresh token
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

		// Send short-lived access token as JSON
		return NextResponse.json(
			{
				userID: String(user.userID),
				displayName: user.displayName,
				accessToken: accessToken,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
	}
}
