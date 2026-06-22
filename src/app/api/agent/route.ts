import { IcyssAgent } from "@/src/agent/agent";




export const POST = async (req:Request)=>{
        const body = await req.json()
        const res = await IcyssAgent(body.input)
        return Response.json(res)
    }