import { NextResponse, NextRequest } from "next/server";
import { JWTVerifyResult, jwtVerify } from "jose";

const profilePath = "/api/profile";
const unauthorizedPath = "/api/unauthorized";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // --------------- //
  // -- REDIRECTS -- //
  // --------------- //

  if (url.pathname.startsWith("/login/steam")) {
    url.pathname = url.pathname.replace("/login/steam", "/api/login/steam");
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith("/steamlink")) {
    url.pathname = url.pathname.replace("/steamlink", "/api/steamlink");
    return NextResponse.rewrite(url);
  }

  // skip any non-protected routes
  if (!url.pathname.startsWith(profilePath)) {
    return NextResponse.next();
  }

  // ---------------------- //
  // -- PROTECTED ROUTES -- //
  // ---------------------- //
  // All of the routes below need Authorization Bearer header
  // All failed routes simply go to /api/unauthorized

  const authHeader = req.headers.get("Authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    url.pathname = unauthorizedPath;
    return NextResponse.rewrite(url);
  }

  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

  try {
    // ensures that the access token has not been tampered with
    const payload = await jwtVerify(accessToken as string, secret) as JWTVerifyResult;
    if (payload) {
      return NextResponse.next();
    } else {
      url.pathname = unauthorizedPath;
      return NextResponse.rewrite(url);
    }
  } catch (error) {
    //const josError = error as JOSEError;
    url.pathname = unauthorizedPath;
    return NextResponse.rewrite(url);
  }
}
