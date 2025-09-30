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
import { FileText, Copy, RefreshCw, Zap, AlignLeft, Lightbulb, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const summaryTypes = [
  { value: "extractive", label: "Extractive", description: "Key sentences from original text" },
  { value: "abstractive", label: "Abstractive", description: "Rewritten summary in new words" },
  { value: "bullet", label: "Bullet Points", description: "Key points in bullet format" },
  { value: "executive", label: "Executive Summary", description: "Business-focused overview" },
]

const summaryLengths = [
  { value: "brief", label: "Brief", description: "1-2 sentences", percentage: 10 },
  { value: "short", label: "Short", description: "1 paragraph", percentage: 25 },
  { value: "medium", label: "Medium", description: "2-3 paragraphs", percentage: 40 },
  { value: "detailed", label: "Detailed", description: "Comprehensive summary", percentage: 60 },
]

interface SummaryResult {
  summary: string
  keyPoints: string[]
  insights: string[]
  readingTime: number
  compressionRatio: number
}

export default function SummarizerPage() {
  const [inputText, setInputText] = useState("")
  const [summaryType, setSummaryType] = useState("")
  const [summaryLength, setSummaryLength] = useState("")
  const [result, setResult] = useState<SummaryResult | null>(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [stats, setStats] = useState({ words: 0, characters: 0, readingTime: 0 })
  const { toast } = useToast()

  const calculateStats = (text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = text.length
    const readingTime = Math.ceil(words / 200) // Average reading speed
    return { words, characters, readingTime }
  }

  const handleInputChange = (value: string) => {
    setInputText(value)
    setStats(calculateStats(value))
  }

  const summarizeText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to summarize",
        description: "Please enter some text to summarize",
        variant: "destructive",
      })
      return
    }

    if (!summaryType || !summaryLength) {
      toast({
        title: "Missing configuration",
        description: "Please select summary type and length",
        variant: "destructive",
      })
      return
    }

    setIsSummarizing(true)

    // Simulate AI summarization
    setTimeout(() => {
      const lengthConfig = summaryLengths.find((l) => l.value === summaryLength)
      const originalWords = stats.words
      const summaryWords = Math.ceil((originalWords * (lengthConfig?.percentage || 25)) / 100)

      let summary = ""
      let keyPoints: string[] = []
      let insights: string[] = []

      // Generate different summary styles based on type
      switch (summaryType) {
        case "extractive":
          summary = `This is an extractive summary that pulls key sentences directly from the original text. The main concepts and important details are preserved in their original form, maintaining the author's voice and specific terminology. Key findings and conclusions are highlighted to provide a comprehensive overview of the source material.`
          break
        case "abstractive":
          summary = `This abstractive summary reinterprets the original content using new language and structure. The core ideas are presented in a fresh perspective while maintaining accuracy and completeness. Complex concepts are simplified and reorganized for better understanding and clarity.`
          break
        case "bullet":
          summary = `• Main topic and primary focus of the content\n• Key arguments and supporting evidence presented\n• Important conclusions and recommendations\n• Significant data points and statistics mentioned\n• Action items or next steps identified`
          break
        case "executive":
          summary = `Executive Summary: This document presents critical business insights and strategic recommendations. Key performance indicators show positive trends with actionable opportunities for growth. The analysis reveals market dynamics that require immediate attention and strategic planning for optimal outcomes.`
          break
        default:
          summary = "Summary will be generated based on your selected parameters."
      }

      keyPoints = [
        "Primary theme and central message of the content",
        "Supporting arguments and evidence provided",
        "Key statistics and data points mentioned",
        "Important conclusions and recommendations",
        "Actionable insights and next steps",
      ]

      insights = [
        "The content demonstrates strong analytical depth",
        "Multiple perspectives are considered throughout",
        "Data-driven approach supports main arguments",
        "Practical applications are clearly outlined",
      ]

      const compressionRatio = Math.round((1 - summaryWords / originalWords) * 100)

      setResult({
        summary,
        keyPoints,
        insights,
        readingTime: Math.ceil(summaryWords / 200),
        compressionRatio,
      })

      setIsSummarizing(false)
    }, 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard",
    })
  }

  const regenerateSummary = () => {
    summarizeText()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Summarizer</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Distill complex information into clear, actionable insights with AI-powered summarization.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlignLeft className="h-5 w-5" />
                  <span>Text to Summarize</span>
                </CardTitle>
                <CardDescription>Paste your article, document, or any text content below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Source Text</Label>
                  <Textarea
                    id="input-text"
                    placeholder="Paste your text here to generate a summary..."
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    rows={12}
                    className="resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span>{stats.words} words</span>
                    <span>{stats.characters} characters</span>
                    <span>~{stats.readingTime} min read</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Results */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-green-500" />
                      <span>Summary Results</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={regenerateSummary}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.summary)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="summary" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="keypoints">Key Points</TabsTrigger>
                      <TabsTrigger value="insights">Insights</TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="mt-4">
                      <div className="bg-muted/50 rounded-lg p-4 border">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.summary}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                        <span>~{result.readingTime} min read</span>
                        <span>{result.compressionRatio}% compression</span>
                      </div>
                    </TabsContent>

                    <TabsContent value="keypoints" className="mt-4">
                      <div className="space-y-3">
                        {result.keyPoints.map((point, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-xs font-medium text-primary">{index + 1}</span>
                            </div>
                            <p className="text-sm leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="insights" className="mt-4">
                      <div className="space-y-3">
                        {result.insights.map((insight, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">{insight}</p>
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
                  <Target className="h-5 w-5" />
                  <span>Summary Settings</span>
                </CardTitle>
                <CardDescription>Configure how you want your text summarized</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="summary-type">Summary Type</Label>
                  <Select value={summaryType} onValueChange={setSummaryType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select summary type" />
                    </SelectTrigger>
                    <SelectContent>
                      {summaryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary-length">Summary Length</Label>
                  <Select value={summaryLength} onValueChange={setSummaryLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      {summaryLengths.map((length) => (
                        <SelectItem key={length.value} value={length.value}>
                          <div>
                            <div className="font-medium">{length.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {length.description} (~{length.percentage}% of original)
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={summarizeText}
                  disabled={isSummarizing || !inputText.trim() || !summaryType || !summaryLength}
                  className="w-full"
                  size="lg"
                >
                  {isSummarizing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Words</span>
                    <span className="font-medium">{stats.words}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Characters</span>
                    <span className="font-medium">{stats.characters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reading Time</span>
                    <span className="font-medium">~{stats.readingTime} min</span>
                  </div>
                  {result && (
                    <>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Compression</span>
                          <Badge variant="secondary">{result.compressionRatio}%</Badge>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Summary Types Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Summary Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Extractive:</span>
                    <p className="text-muted-foreground">Selects key sentences from original text</p>
                  </div>
                  <div>
                    <span className="font-medium">Abstractive:</span>
                    <p className="text-muted-foreground">Rewrites content in new words</p>
                  </div>
                  <div>
                    <span className="font-medium">Bullet Points:</span>
                    <p className="text-muted-foreground">Organized list of key points</p>
                  </div>
                  <div>
                    <span className="font-medium">Executive:</span>
                    <p className="text-muted-foreground">Business-focused overview</p>
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
