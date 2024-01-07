import { NextResponse, NextRequest } from "next/server";
import { ProfileInfo, UserIDParams } from "@/types/Interfaces";
import { findUser } from "@/util/DatabaseFunctions";

// secured by access token middleware
export async function GET(req: NextRequest, { params }: UserIDParams) {
	const userID = params.userID;

	if (!userID) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	try {
		const [errMsg, foundUser] = await findUser(userID);

		if (!foundUser) {
			return NextResponse.json({ message: "User Not Found" }, { status: 401 });
		} else if (errMsg.length !== 0) {
			return NextResponse.json({ message: errMsg }, { status: 400 });
		}

		const info: ProfileInfo = {
			displayName: foundUser.displayName as string,
			steamLinked: foundUser.steamLinked,
		};
				
		return NextResponse.json({ ...info }, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
}
