import { NextResponse, NextRequest } from "next/server";
import { users } from "@/models";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
	// No content
	const cookieValue = cookies().get("jwt")?.value;
	if (!cookieValue) {
		return NextResponse.json({ status: 204 });
	}

	// Delete refreshToken in db
	users.update({ refreshToken: "none" }, { where: { refreshToken: cookieValue } });

	// On client, also delete the accessToken
	cookies().delete("jwt");

	return NextResponse.json({ status: 200 });
}
