import { auth } from "@/src/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export async function middleware (req:NextRequest){
    console.log(req.nextUrl.pathname)
    const session = await auth.api.getSession({
        headers: req.headers
    })
    if (!session){
        return NextResponse.redirect(new URL("/signin",req.url))
    }
    return NextResponse.next()

    
}

export const config = {
    matcher: ["/algorithm/:path*", "/"]
}