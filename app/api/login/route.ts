import { NextResponse, NextRequest } from "next/server";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { users } from "@/models";
import { accessTokenLength, refreshTokenLength } from "../interfaces";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  console.log("Logging in")
  if ((username === "" && email === "") || (!username && !email) || !password) {
    return NextResponse.json({ message: "Username/Email and password are required." }, { status: 400 });
  }

  const foundUser =
    username === ""
      ? await users.findOne({ where: { email: email } })
      : await users.findOne({ where: { username: username } });

  if (!foundUser) {
    return NextResponse.json({ message: "User not found." }, { status: 401 });
  }

  if (!foundUser.confirmed) {
    return NextResponse.json({ message: "Please confirm your email or request for a resend." }, { status: 400 });
  }

  if (foundUser.displayName === null) {
    await foundUser.update({ displayName: foundUser.username });
  }

  try {
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password as string);
    if (!match) {
      return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
    }

    // create short-lived access token
    const accessToken = sign(
      { userID: foundUser.userID, displayName: foundUser.displayName },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: accessTokenLength }
    );

    // create long-lived refresh token
    const refreshToken = sign(
      { userID: foundUser.userID, displayName: foundUser.displayName },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: refreshTokenLength }
    );

    // save long-lived refresh token in database
    await users.update({ refreshToken: refreshToken }, { where: { userID: foundUser.userID } });

    // Send long-lived refresh token as cookie
    cookies().set("jwt", refreshToken as string, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 365 * 5,
    });

    // Send short-lived access token as JSON
    return NextResponse.json(
      { userID: foundUser.userID, displayName: foundUser.displayName, accessToken: accessToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
  }
}
