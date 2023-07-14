import { NextResponse, NextRequest } from "next/server";
import { users, scores } from "@/models";
import { UserIDParams } from "@/app/api/interfaces";

// secured by access token middleware
export async function GET(req: NextRequest, { params }: UserIDParams) {
  const userID = params.userID;

  if (!userID) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const foundUser = await users.findOne({
      where: { userID: userID },
    });

    if (!foundUser) {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }

    if (!foundUser.confirmed) {
      return NextResponse.json({ message: "Please confirm your email or request for a resend" }, { status: 400 });
    }

    const foundScores = await scores.findAll({ raw: true, nest: true, where: { userID: foundUser.userID } });
    return NextResponse.json(foundScores);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
