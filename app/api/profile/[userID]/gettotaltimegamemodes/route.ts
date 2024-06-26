import { NextResponse, NextRequest } from "next/server";
import { sequelize } from "@/models/index";
import type { UserIDParams } from "@/types/auth.types";

// secured by access token middleware
export async function GET(req: NextRequest, { params }: { params: UserIDParams }) {
	if (!params) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	try {
		const totalTime = await sequelize.query("CALL GetTotalTimeForGameModes (:p_userID)", {
			replacements: { p_userID: params.userID },
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
