import {getSessionCookie} from "better-auth/cookies"
import { NextRequest, NextResponse } from "next/server";


export async function middleware (req:NextRequest){
    const url = new URL(req.url)
    const session = getSessionCookie(req)
    if (!session && url.pathname !== "/signin" && url.pathname !== "/signup"){
        return NextResponse.redirect(new URL("/signin",req.url))
    }
    
    if (session && (url.pathname === "/signin" || url.pathname === "/signup" || url.pathname === "/")){
        return NextResponse.redirect(new URL("/home",req.url))
    }
   
   
    return NextResponse.next()

    
}

export const config = {
    matcher: ['/(.*)']
}