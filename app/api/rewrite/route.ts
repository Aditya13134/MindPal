import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = await aiService.rewriteText({
      text: body.text,
      style: body.style,
      tone: body.tone,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Text rewriting error:", error)
    return NextResponse.json({ error: "Failed to rewrite text" }, { status: 500 })
  }
}
