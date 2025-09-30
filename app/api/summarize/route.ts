import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = await aiService.summarizeText({
      text: body.text,
      type: body.type,
      length: body.length,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Summarization error:", error)
    return NextResponse.json({ error: "Failed to summarize text" }, { status: 500 })
  }
}
