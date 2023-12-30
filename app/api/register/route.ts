import { NextResponse, NextRequest } from "next/server";
import { sequelize, users } from "@/models";
import bcrypt from "bcrypt";
import { createConfToken, sendConfEmail } from "../authfunctions";
import { saltRounds } from "../interfaces";

export async function POST(req: NextRequest) {
	const { username, email, password } = await req.json();

	// Check username
	const existingUsername = await users.findOne({
		where: { username: username },
	});
	if (existingUsername) {
		return NextResponse.json({ message: "A user already exists with that username." }, { status: 400 });
	}

	// Check email
	const existingEmail = await users.findOne({
		where: { email: email },
	});
	if (existingEmail) {
		return NextResponse.json({ message: "A user already exists with that email." }, { status: 400 });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const results = (await sequelize.query("CALL GetNewUserID ()")) as any;
		const newUser = await users.create({
			userID: results[0].nextUserID,
			username: username,
			displayName: username,
			confirmed: 0,
			email: email,
			password: hashedPassword,
		});

		if (!newUser) {
			return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
		}

		const confToken = await createConfToken(newUser);
		const result = await sendConfEmail(newUser, confToken);

		if (result && result?.messageId) {
			return NextResponse.json(
				{
					message: "Confirmation email sent! Check your spam folder if you don't see it in your inbox.",
				},
				{ status: 200 }
			);
		}
		return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
	}
}
