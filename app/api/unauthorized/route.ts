import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
	return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function POST(_req: NextRequest) {
	return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function DELETE(_req: NextRequest) {
	return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
