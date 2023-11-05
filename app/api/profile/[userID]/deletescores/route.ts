import { NextResponse, NextRequest } from "next/server";
import { UserIDParams } from "@/app/api/interfaces";
import { deleteCustomScores, findUser } from "@/app/api/databasefunctions";

// secured by access token middleware
export async function DELETE(req: NextRequest, { params }: UserIDParams) {
  const userID = params.userID;
  const customGameModeName = await req.json();

  if (!userID) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (customGameModeName.customGameModeName.length == 0) {
    return NextResponse.json({ "Number Removed": 0 }, { status: 200 });
  }

  try {
    const [errorMsg, foundUser] = await findUser(userID);

    if (!foundUser) {
      return NextResponse.json({ message: errorMsg }, { status: 401 });
    } else if (errorMsg.length === 0) {
      return NextResponse.json({ message: errorMsg }, { status: 400 });
    }

    const NumRemoved = deleteCustomScores(foundUser.userID, customGameModeName);
    return NextResponse.json({ "Number Removed": NumRemoved }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
