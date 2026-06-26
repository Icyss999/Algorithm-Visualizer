import { auth } from "@/src/lib/auth";
import { NextRequest, NextResponse } from "next/server";



export async function middleware (req:NextRequest){
    const publicRoutes = [
        "/api",
        "/_next/static",
        "/_next/image",
        "/favicon.ico",
        "/assets",
    ];
    const url = new URL(req.url)
    
    if (publicRoutes.some(route=>url.pathname.startsWith(route))){
        return NextResponse.next()
    }
    const session = await auth.api.getSession({
        headers: req.headers
    })
    if (!session && url.pathname !== "/signin" && url.pathname !== "/signup" && url.pathname !== "/"){
        return NextResponse.redirect(new URL("/signin",req.url))
    }
    if (session && (url.pathname === "/signup" || url.pathname === "/signin" || url.pathname === "/")){
        return NextResponse.redirect(new URL("/home",req.url))
    }
    return NextResponse.next()

    
}

export const config = {
    matcher: ["/(.*)"]
}