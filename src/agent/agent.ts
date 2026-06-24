import type { ResponseType } from "../types/schema"
import { BuildPrompt } from "./prompt"
import { validateResponse } from "./validator"

export async function IcyssAgent(input: string, retries = 3): Promise<ReturnType<typeof validateResponse>> {
  try {
    
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [
          { role: "system", content: BuildPrompt() },
          { role: "user", content: input },
        ],
        thinking: { type: "disabled" },
      }),
    })
    if (!res.ok) throw new Error("API failed")

    const data = await res.json()
    const raw = data.choices[0].message.content
    const parsed: ResponseType = JSON.parse(raw)
    return validateResponse(parsed)

  } catch {
    if (retries > 0) {
      return IcyssAgent(input, retries - 1)
    }
    return {
      success: false,
      data: { type: "api_error", message: "Something went wrong. Please try again." } as ResponseType
    }
  }
}