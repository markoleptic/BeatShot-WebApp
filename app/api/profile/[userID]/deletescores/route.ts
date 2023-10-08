import { NextResponse, NextRequest } from "next/server";
import { users, scores } from "@/models";
import { UserIDParams } from "@/app/api/interfaces";
import { Op } from "sequelize";

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
    const foundUser = await users.findOne({
      where: { userID: userID },
    });

    if (!foundUser) {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }

    if (!foundUser.confirmed) {
      return NextResponse.json({ message: "Please confirm your email or request for a resend" }, { status: 400 });
    }
  
    const NumRemoved = await scores.destroy({
      where: {
        [Op.and]: [{ userID: foundUser.userID }, { customGameModeName: customGameModeName.customGameModeName }]
      }
    })

    return NextResponse.json({ "Number Removed": NumRemoved }, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
