import { NextResponse, NextRequest } from "next/server";
import { findUser } from "@/utility/DatabaseFunctions";
import type { UserIDParams } from "@/types/auth.types";
import type { ProfileInfo } from "@/types/profile.types";

// secured by access token middleware
export async function GET(req: NextRequest, { params }: { params: UserIDParams }) {
	if (!params) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	try {
		const [errMsg, foundUser] = await findUser(params.userID);

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
