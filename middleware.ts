import { NextResponse, NextRequest } from "next/server";
import { JWTVerifyResult, jwtVerify } from "jose";

const apiProfilePath = "/api/profile";
const unauthorizedApiPath = "/api/unauthorized";

// redirects located in next.config.js

export async function middleware(req: NextRequest) {
	const unauthorizedUrl = req.nextUrl.clone();
	unauthorizedUrl.pathname = unauthorizedApiPath;

	// skip any non-protected routes
	if (!req.nextUrl.pathname.startsWith(apiProfilePath)) {
		return NextResponse.next();
	}

	// ---------------------- //
	// -- PROTECTED ROUTES -- //
	// ---------------------- //
	
	// All of the routes below need Authorization Bearer header
	// All failed routes go to /api/unauthorized

	const authHeader = req.headers.get("Authorization");
	const accessToken = authHeader?.split(" ")[1];

	if (!accessToken) {
		return NextResponse.rewrite(unauthorizedUrl);
	}

	const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
	try {
		// ensures that the access token has not been tampered with
		const payload = (await jwtVerify(accessToken as string, secret)) as JWTVerifyResult;
		if (payload) {
			return NextResponse.next();
		} else {
			return NextResponse.rewrite(unauthorizedUrl);
		}
	} catch (error) {
		return NextResponse.rewrite(unauthorizedUrl);
	}
}
