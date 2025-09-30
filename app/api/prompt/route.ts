import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = await aiService.generatePrompt({
      type: body.type,
      topic: body.topic,
      tone: body.tone,
      length: body.length,
      context: body.context,
      files: body.files,
    })

    return NextResponse.json({ prompt: result })
  } catch (error) {
    console.error("Prompt generation error:", error)
    return NextResponse.json({ error: "Failed to generate prompt" }, { status: 500 })
  }
}
