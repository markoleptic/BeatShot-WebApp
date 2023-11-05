import { NextResponse, NextRequest } from "next/server";
import { createRecoveryToken, sendRecoveryEmail } from "../authfunctions";
import { findUserByEmail } from "../databasefunctions";


// Emails a link that directs to /recover/[token], where they can change their password
export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const [errMsg, user] = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ message: "No user with that email exists" }, { status: 400 });
  }

  try {
    const confToken = await createRecoveryToken(user);
    const result = await sendRecoveryEmail(user, confToken);

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
