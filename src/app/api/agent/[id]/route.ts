import { db } from "@/src/db";
import { algorithmTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";
import { and, eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
    try{
        const { id } = await params;
    if (!id)
    return Response.json({ success:false, message: "Data is not found!" }, { status: 404 });
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  if (!session) return Response.json({success:false,message:"Unauthorized"},{status:401})

  const res = await db
    .select()
    .from(algorithmTable)
    .where(
      and(eq(algorithmTable.id, id), eq(algorithmTable.userId, session.user.id)),
    );
    return Response.json({success:true,data:res},{status:200})
    }catch(error){
        return Response.json({success:false,message: "Internal server error"},{status: 500})
    }
    
}
