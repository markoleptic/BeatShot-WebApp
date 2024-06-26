import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { findUser } from "@/utility/DatabaseFunctions";
import { verifyJWT } from "@/utility/ServerFunctions";
import type { TokenParams } from "@/types/auth.types";

const saltRounds = 10;

export async function POST(req: NextRequest, { params }: { params: TokenParams }) {
	const { email, password } = await req.json();
	try {
		const userID = await verifyJWT(params.token, process.env.RECOV_TOKEN_SECRET as string);

		const [errMsg, foundUser] = await findUser(userID, email);
		if (!foundUser) {
			return NextResponse.json({ message: "No user exists with that email." }, { status: 400 });
		}
		if (foundUser.confirmed === 0) {
			return NextResponse.json({ message: "Email has not been confirmed yet." }, { status: 400 });
		}

		// change the user's password
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		await foundUser.update({ password: hashedPassword });
		return NextResponse.json({ message: "Password successfully changed." }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: error }, { status: 400 });
	}
}
