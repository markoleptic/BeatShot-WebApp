import { NextResponse, NextRequest } from "next/server";
import { sendFeedbackEmail } from "@/utility/ServerFunctions";

export async function POST(req: NextRequest) {
	const { title, content } = await req.json();

	try {
		const result = await sendFeedbackEmail(title, content);
		if (!result || !result.messageId) {
			return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
		}
		return NextResponse.json({ message: "Feedback sent." }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
	}
}
