import { BuildPrompt } from "@/src/agent/prompt";
import { db } from "@/src/db";
import { algorithmTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";
import { ratelimit } from "@/src/lib/ratelimit";
import { desc, eq, ilike } from "drizzle-orm";
import { TrendingUpDown } from "lucide-react";

export const POST = async (req: Request) => {
  try {
    const ip = (await req.headers.get("x-forwarded-for")) ?? "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return Response.json(
        {
          success: false,
          data: {
            type: "Request overlimit",
            message: "Too many requests, please try again!",
          },
        },
        {
          status: 429,
        },
      );
    }
    const body = await req.json();
    const existingData = await db
      .select()
      .from(algorithmTable)
      .where(ilike(algorithmTable.name, body.input))
      .limit(1);

    if (existingData.length > 0){
      console.log(existingData)
      return Response.json({success:true, data:existingData},{status:200})
    }

    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [
          { role: "system", content: BuildPrompt() },
          { role: "user", content: body.input },
        ],
        thinking: { type: "disabled" },
      }),
    });
    if (!res.ok) throw new Error("API failed");

    const data = await res.json();
    const raw = data.choices[0].message.content;
    const parsed = JSON.parse(raw);

    if (parsed.type !== "visualization") {
      return Response.json({ success: false, message: parsed.message });
    }

    const json = await db
      .insert(algorithmTable)
      .values({
        name: parsed.name,
        template: parsed.template,
        timeComplexity: parsed.complexity.time,
        spaceComplexity: parsed.complexity.space,
        code: parsed.code,
        explanation: parsed.explanation,
        steps: parsed.steps,
        userId: session?.user.id,
      })
      .returning();

    return Response.json(
      {
        success: true,
        message: "Algorithm is successfully added!",
        data: json,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal server error!" },
      { status: 500 },
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    if (!session)
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    const data = await db
      .select()
      .from(algorithmTable)
      .where(eq(algorithmTable.userId, session.user.id))
      .orderBy(desc(algorithmTable.createdAt));
    return Response.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
};
