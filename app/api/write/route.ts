import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = await aiService.writeContent({
      contentType: body.contentType,
      topic: body.topic,
      tone: body.tone,
      length: body.length,
      audience: body.audience,
      keywords: body.keywords,
      instructions: body.instructions,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Content writing error:", error)
    return NextResponse.json({ error: "Failed to write content" }, { status: 500 })
  }
}
