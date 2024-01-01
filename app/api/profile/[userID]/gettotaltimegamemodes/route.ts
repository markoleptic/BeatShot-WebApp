import { NextResponse, NextRequest } from "next/server";
import { sequelize } from "@/models";
import { UserIDParams } from "@/types/Interfaces";

// secured by access token middleware
export async function GET(req: NextRequest, { params }: UserIDParams) {
	const userID = params.userID;

	if (!userID) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	try {
		const totalTime = await sequelize.query("CALL GetTotalTimeForGameModes (:p_userID)", {
			replacements: { p_userID: userID },
		});

		if (!totalTime) {
			return NextResponse.json({ message: "User Not Found" }, { status: 401 });
		}
		return NextResponse.json(totalTime);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
}
