import { NextResponse, NextRequest } from "next/server";
import { deleteScoresByCustomGameModeName, deleteScoresByScoreID, findUser } from "@/utility/DatabaseFunctions";
import type { UserIDParams } from "@/types/auth.types";

// secured by access token middleware
export async function DELETE(req: NextRequest, { params }: { params: UserIDParams }) {
	const body = await req.json();

	if (!params) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	if (!body.scoreIDs && !body.customGameModeName) {
		return NextResponse.json({ message: "Invalid JSON format in the request body." }, { status: 400 });
	}

	try {
		const [errorMsg, foundUser] = await findUser(params.userID);

		if (!foundUser) {
			return NextResponse.json({ message: errorMsg }, { status: 401 });
		} else if (errorMsg.length !== 0) {
			return NextResponse.json({ message: errorMsg }, { status: 400 });
		}
		let NumRemoved = 0;
		if (body.scoreIDs) {
			NumRemoved = await deleteScoresByScoreID(foundUser.userID, body.scoreIDs);
		} else {
			NumRemoved = await deleteScoresByCustomGameModeName(foundUser.userID, body.customGameModeName);
		}

		return NextResponse.json({ "Number Removed": NumRemoved }, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
}
