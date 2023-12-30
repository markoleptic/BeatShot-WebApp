import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
	return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function DELETE(req: NextRequest) {
	return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
