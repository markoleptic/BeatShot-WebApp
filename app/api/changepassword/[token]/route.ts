import { Op } from "sequelize";
import { NextResponse, NextRequest } from "next/server";
import { users } from "@/models";
import bcrypt from "bcrypt";
import { TokenParams, verifyJWT, TokenInterface } from "@/app/api/interfaces";
import { saltRounds } from "../../interfaces";

export async function POST(req: NextRequest, { params }: TokenParams) {
  const { email, password } = await req.json();
  try {
    const { userID } = await verifyJWT(params.token, process.env.RECOV_TOKEN_SECRET as string) as TokenInterface;
    const foundUser = await users.findOne({
      where: {
        [Op.and]: [{ userID: userID }, { email: email }],
      },
    });

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
