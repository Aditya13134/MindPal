"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Copy, Zap, ArrowRight, Target, Lightbulb } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const rewriteStyles = [
  { value: "improve", label: "Improve Clarity", description: "Enhance readability and flow" },
  { value: "formal", label: "Make Formal", description: "Professional and business-appropriate" },
  { value: "casual", label: "Make Casual", description: "Conversational and friendly" },
  { value: "concise", label: "Make Concise", description: "Shorter and more direct" },
  { value: "expand", label: "Expand Content", description: "Add detail and elaboration" },
  { value: "persuasive", label: "Make Persuasive", description: "More compelling and convincing" },
  { value: "creative", label: "Make Creative", description: "More engaging and imaginative" },
  { value: "technical", label: "Make Technical", description: "More precise and detailed" },
]

const toneOptions = [
  "Professional",
  "Casual",
  "Friendly",
  "Formal",
  "Conversational",
  "Authoritative",
  "Persuasive",
  "Informative",
  "Creative",
  "Empathetic",
  "Confident",
  "Neutral",
]

interface RewriteResult {
  rewrittenText: string
  improvements: string[]
  changes: Array<{
    type: string
    original: string
    improved: string
    explanation: string
  }>
  stats: {
    originalWords: number
    rewrittenWords: number
    readabilityScore: number
    improvementPercentage: number
  }
}

export default function RewriterPage() {
  const [inputText, setInputText] = useState("")
  const [rewriteStyle, setRewriteStyle] = useState("")
  const [targetTone, setTargetTone] = useState("")
  const [result, setResult] = useState<RewriteResult | null>(null)
  const [isRewriting, setIsRewriting] = useState(false)
  const [stats, setStats] = useState({ words: 0, characters: 0, sentences: 0 })
  const { toast } = useToast()

  const calculateStats = (text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = text.length
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    return { words, characters, sentences }
  }

  const handleInputChange = (value: string) => {
    setInputText(value)
    setStats(calculateStats(value))
  }

  const rewriteText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to rewrite",
        description: "Please enter some text to rewrite",
        variant: "destructive",
      })
      return
    }

    if (!rewriteStyle) {
      toast({
        title: "Select rewrite style",
        description: "Please choose how you want to rewrite the text",
        variant: "destructive",
      })
      return
    }

    setIsRewriting(true)

    // Simulate AI rewriting
    setTimeout(() => {
      const originalWords = stats.words
      let rewrittenText = ""
      let improvements: string[] = []
      let changes: Array<{
        type: string
        original: string
        improved: string
        explanation: string
      }> = []

      // Generate rewritten text based on style
      switch (rewriteStyle) {
        case "improve":
          rewrittenText = `This enhanced version of your content demonstrates improved clarity and flow. The restructured sentences provide better readability while maintaining the original meaning and intent. Key concepts are presented more effectively, ensuring your message resonates with readers.`
          improvements = [
            "Enhanced sentence structure for better flow",
            "Improved word choice for clarity",
            "Better paragraph organization",
            "Stronger transitions between ideas",
          ]
          changes = [
            {
              type: "Clarity",
              original: "The thing is that...",
              improved: "The key point is that...",
              explanation: "More specific and direct language",
            },
            {
              type: "Flow",
              original: "Also, furthermore, in addition...",
              improved: "Additionally...",
              explanation: "Eliminated redundant transition words",
            },
          ]
          break

        case "formal":
          rewrittenText = `This formal revision of your content adheres to professional standards and conventions. The language has been elevated to suit business and academic contexts while preserving the core message. Technical terminology and structured presentation enhance the document's credibility and authority.`
          improvements = [
            "Professional language and terminology",
            "Formal sentence structure",
            "Appropriate business tone",
            "Enhanced credibility and authority",
          ]
          changes = [
            {
              type: "Formality",
              original: "It's really important to...",
              improved: "It is essential to...",
              explanation: "More formal language and complete contractions",
            },
            {
              type: "Precision",
              original: "A lot of people think...",
              improved: "Many professionals believe...",
              explanation: "More specific and professional terminology",
            },
          ]
          break

        case "casual":
          rewrittenText = `Here's a more relaxed take on your content that feels conversational and approachable. We've made it sound like you're chatting with a friend while keeping all the important information intact. The tone is friendly and easy to connect with, making your message more relatable.`
          improvements = [
            "Conversational and friendly tone",
            "More relatable language",
            "Approachable style",
            "Better connection with readers",
          ]
          changes = [
            {
              type: "Tone",
              original: "It is recommended that...",
              improved: "You might want to...",
              explanation: "More conversational and personal approach",
            },
            {
              type: "Accessibility",
              original: "Subsequently...",
              improved: "Then...",
              explanation: "Simpler, more everyday language",
            },
          ]
          break

        case "concise":
          rewrittenText = `Your content, streamlined for maximum impact. Key points delivered clearly and directly. Unnecessary words removed. Core message preserved and strengthened.`
          improvements = [
            "Eliminated redundant words",
            "Shortened sentences for impact",
            "Focused on essential information",
            "Improved reading speed",
          ]
          changes = [
            {
              type: "Brevity",
              original: "In order to achieve the goal of...",
              improved: "To achieve...",
              explanation: "Removed unnecessary prepositional phrases",
            },
            {
              type: "Directness",
              original: "It should be noted that there is a possibility that...",
              improved: "This may...",
              explanation: "Direct, clear statement",
            },
          ]
          break

        case "expand":
          rewrittenText = `This expanded version of your content provides comprehensive detail and thorough exploration of each concept. We've added context, examples, and supporting information to create a more complete and informative piece. The additional depth helps readers fully understand the subject matter while maintaining engagement through varied sentence structure and detailed explanations that illuminate key points.`
          improvements = [
            "Added supporting details and examples",
            "Expanded on key concepts",
            "Provided additional context",
            "Enhanced depth and comprehensiveness",
          ]
          changes = [
            {
              type: "Detail",
              original: "This is important.",
              improved:
                "This concept plays a crucial role because it directly impacts outcomes and influences decision-making processes.",
              explanation: "Added specific reasons and context",
            },
            {
              type: "Examples",
              original: "Many companies use this approach.",
              improved:
                "Leading organizations across industries, from technology startups to Fortune 500 corporations, have successfully implemented this approach.",
              explanation: "Added specific examples and scope",
            },
          ]
          break

        default:
          rewrittenText = `This rewritten version of your content incorporates the requested ${rewriteStyle} style while maintaining the original meaning and intent. The text has been carefully crafted to meet your specific requirements and improve overall effectiveness.`
          improvements = [
            "Applied requested style changes",
            "Maintained original meaning",
            "Improved overall effectiveness",
            "Enhanced readability",
          ]
          changes = [
            {
              type: "Style",
              original: "Original phrasing",
              improved: "Improved phrasing",
              explanation: "Applied style-specific improvements",
            },
          ]
      }

      const rewrittenWords = rewrittenText.split(/\s+/).length
      const improvementPercentage = Math.floor(Math.random() * 30) + 15 // 15-45% improvement

      setResult({
        rewrittenText,
        improvements,
        changes,
        stats: {
          originalWords,
          rewrittenWords,
          readabilityScore: Math.floor(Math.random() * 20) + 75, // 75-95 score
          improvementPercentage,
        },
      })

      setIsRewriting(false)
    }, 2500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard",
    })
  }

  const regenerateRewrite = () => {
    rewriteText()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <RefreshCw className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">AI Rewriter</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Improve existing content with alternative options and enhanced clarity using AI-powered rewriting.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input and Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Original Text</span>
                </CardTitle>
                <CardDescription>Paste your content below to rewrite and improve it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Text to Rewrite</Label>
                  <Textarea
                    id="input-text"
                    placeholder="Paste your text here to rewrite and improve..."
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    rows={10}
                    className="resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span>{stats.words} words</span>
                    <span>{stats.characters} characters</span>
                    <span>{stats.sentences} sentences</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rewritten Text */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-green-500" />
                      <span>Rewritten Text</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={regenerateRewrite}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.rewrittenText)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="rewritten" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="rewritten">Rewritten</TabsTrigger>
                      <TabsTrigger value="improvements">Improvements</TabsTrigger>
                      <TabsTrigger value="changes">Changes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="rewritten" className="mt-4">
                      <div className="bg-muted/50 rounded-lg p-4 border">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.rewrittenText}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                        <span>{result.stats.rewrittenWords} words</span>
                        <div className="flex space-x-4">
                          <span>Readability: {result.stats.readabilityScore}/100</span>
                          <Badge variant="secondary">+{result.stats.improvementPercentage}% improved</Badge>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="improvements" className="mt-4">
                      <div className="space-y-3">
                        {result.improvements.map((improvement, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Lightbulb className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">{improvement}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="changes" className="mt-4">
                      <div className="space-y-4">
                        {result.changes.map((change, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">{change.type}</Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <span className="text-muted-foreground line-through">{change.original}</span>
                                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                <span className="text-green-600 dark:text-green-400 font-medium">
                                  {change.improved}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">{change.explanation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5" />
                  <span>Rewrite Settings</span>
                </CardTitle>
                <CardDescription>Configure how you want to rewrite your text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rewrite-style">Rewrite Style *</Label>
                  <Select value={rewriteStyle} onValueChange={setRewriteStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rewrite style" />
                    </SelectTrigger>
                    <SelectContent>
                      {rewriteStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div>
                            <div className="font-medium">{style.label}</div>
                            <div className="text-sm text-muted-foreground">{style.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-tone">Target Tone (Optional)</Label>
                  <Select value={targetTone} onValueChange={setTargetTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((tone) => (
                        <SelectItem key={tone} value={tone}>
                          {tone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={rewriteText}
                  disabled={isRewriting || !inputText.trim() || !rewriteStyle}
                  className="w-full"
                  size="lg"
                >
                  {isRewriting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Rewriting...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Rewrite Text
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Text Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Original Words</span>
                    <span className="font-medium">{stats.words}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Characters</span>
                    <span className="font-medium">{stats.characters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sentences</span>
                    <span className="font-medium">{stats.sentences}</span>
                  </div>
                  {result && (
                    <>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rewritten Words</span>
                          <span className="font-medium">{result.stats.rewrittenWords}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Improvement</span>
                          <Badge variant="secondary">+{result.stats.improvementPercentage}%</Badge>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Rewrite Styles Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rewrite Styles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Improve:</span>
                    <p className="text-muted-foreground">Enhance clarity and flow</p>
                  </div>
                  <div>
                    <span className="font-medium">Formal:</span>
                    <p className="text-muted-foreground">Professional business tone</p>
                  </div>
                  <div>
                    <span className="font-medium">Casual:</span>
                    <p className="text-muted-foreground">Conversational and friendly</p>
                  </div>
                  <div>
                    <span className="font-medium">Concise:</span>
                    <p className="text-muted-foreground">Shorter and more direct</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
