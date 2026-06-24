import { IcyssAgent } from "@/src/agent/agent";
import { ratelimit } from "@/src/lib/ratelimit";


export const POST = async (req:Request)=>{
        const ip  =  await req.headers.get("x-forwarded-for") ?? "anonymous"
        const {success} = await ratelimit.limit(ip)
        if (!success){
            return Response.json({
                success: false,
                data:{
                    type : "Request overlimit",
                    message: "Too many requests, please try again!",
                }
            },{
                status: 429
            })
        }
        const body = await req.json()
        const res = await IcyssAgent(body.input)
        return Response.json(res)
    }