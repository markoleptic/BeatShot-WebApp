import { NextResponse, NextRequest } from "next/server";
import { users } from "@/models";
import { sendConfEmail, createConfToken, hostUrl } from "../authfunctions";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }

  const foundUser = await users.findOne({
    where: { email: email },
  });

  if (!foundUser) {
    return NextResponse.json({ message: "No user exists with that email." }, { status: 400 });
  }

  if (foundUser.confirmed) {
    return NextResponse.json({ message: "This email has already been confirmed." }, { status: 400 });
  }

  try {
    const confToken = await createConfToken(foundUser);
    const result = await sendConfEmail(foundUser, confToken, hostUrl as string);

    if (result && result?.messageId) {
      return NextResponse.json(
        { message: "Confirmation email sent! Check your spam folder if you don't see it in your inbox." },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
  }
}
