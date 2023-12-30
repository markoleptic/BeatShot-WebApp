import { NextResponse, NextRequest } from "next/server";
import { TokenParams, TokenInterface, verifyJWT } from "@/app/api/interfaces";
import { findUser } from "../../databasefunctions";

export async function GET(req: NextRequest, { params }: TokenParams) {
	try {
		const { userID } = (await verifyJWT(params.token, process.env.CONF_TOKEN_SECRET as string)) as TokenInterface;

		const [errMsg, foundUser] = await findUser(userID);
		if (!foundUser) {
			return NextResponse.json({ message: "Couldn't find user." }, { status: 400 });
		}
		if (foundUser.confirmed === 1) {
			return NextResponse.json({ message: "Email already confirmed." }, { status: 200 });
		}

		await foundUser.update({ confirmed: 1 });
		return NextResponse.json({ message: "Confirmation success." }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
	}
}
