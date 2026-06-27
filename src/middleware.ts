import { betterFetch } from "@better-fetch/fetch"
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";


export async function middleware(req: NextRequest) {
  const publicRoutes = [
    "/api/auth",
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
    "/assets",
  ];
  const authRoutes = ["/signin", "/signup", "/"];
  const url = new URL(req.url);
  const sessionCookie = getSessionCookie(req);

  if (publicRoutes.some((route) => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!sessionCookie && !authRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (sessionCookie) {
    const { data: session } = await betterFetch("/api/auth/get-session", {
      baseURL: req.nextUrl.origin,
      headers: { cookie: req.headers.get("cookie") || "" },
    });
    if (session && authRoutes.includes(url.pathname) ){
        return NextResponse.redirect(new URL("/home", req.url))
    }
    if (!session){
        if (url.pathname.startsWith("/api")){
            return NextResponse.json({message: "Unauthorized"},{status: 401})
        }
        if (!authRoutes.includes(url.pathname)){
            return NextResponse.redirect(new URL("/signin",req.url))
        }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"],
};
