import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = await aiService.proofreadText({
      text: body.text,
      language: body.language,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Proofreading error:", error)
    return NextResponse.json({ error: "Failed to proofread text" }, { status: 500 })
  }
}
