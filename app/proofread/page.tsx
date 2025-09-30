"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertCircle, Copy, RefreshCw, FileText, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Correction {
  id: string
  type: "grammar" | "spelling" | "punctuation" | "style" | "clarity"
  original: string
  corrected: string
  explanation: string
  position: { start: number; end: number }
  severity: "low" | "medium" | "high"
}

const correctionTypes = {
  grammar: { label: "Grammar", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" },
  spelling: { label: "Spelling", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400" },
  punctuation: {
    label: "Punctuation",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  style: { label: "Style", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
  clarity: { label: "Clarity", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400" },
}

export default function ProofreaderPage() {
  const [inputText, setInputText] = useState("")
  const [correctedText, setCorrectedText] = useState("")
  const [corrections, setCorrections] = useState<Correction[]>([])
  const [isProofreading, setIsProofreading] = useState(false)
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

  const proofreadText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to proofread",
        description: "Please enter some text to proofread",
        variant: "destructive",
      })
      return
    }

    setIsProofreading(true)

    // Simulate AI proofreading with realistic corrections
    setTimeout(() => {
      const mockCorrections: Correction[] = [
        {
          id: "1",
          type: "grammar",
          original: "I are going",
          corrected: "I am going",
          explanation: 'Subject-verb agreement: "I" requires "am" not "are"',
          position: { start: 0, end: 10 },
          severity: "high",
        },
        {
          id: "2",
          type: "spelling",
          original: "recieve",
          corrected: "receive",
          explanation: 'Common spelling error: "i" before "e" except after "c"',
          position: { start: 20, end: 27 },
          severity: "medium",
        },
        {
          id: "3",
          type: "punctuation",
          original: "Hello world",
          corrected: "Hello, world",
          explanation: "Missing comma in greeting",
          position: { start: 30, end: 41 },
          severity: "low",
        },
        {
          id: "4",
          type: "style",
          original: "very very good",
          corrected: "excellent",
          explanation: "Avoid repetitive words; use stronger vocabulary",
          position: { start: 50, end: 64 },
          severity: "medium",
        },
        {
          id: "5",
          type: "clarity",
          original: "The thing that I mentioned",
          corrected: "The document I mentioned",
          explanation: "Replace vague terms with specific nouns for clarity",
          position: { start: 70, end: 96 },
          severity: "medium",
        },
      ]

      // Apply corrections to create corrected text
      let corrected = inputText
      mockCorrections.forEach((correction) => {
        corrected = corrected.replace(correction.original, correction.corrected)
      })

      setCorrections(mockCorrections)
      setCorrectedText(corrected)
      setIsProofreading(false)
    }, 2500)
  }

  const applySingleCorrection = (correctionId: string) => {
    const correction = corrections.find((c) => c.id === correctionId)
    if (!correction) return

    const newText = inputText.replace(correction.original, correction.corrected)
    setInputText(newText)
    setStats(calculateStats(newText))

    // Remove applied correction
    setCorrections((prev) => prev.filter((c) => c.id !== correctionId))

    toast({
      title: "Correction applied",
      description: `Fixed: ${correction.original} → ${correction.corrected}`,
    })
  }

  const applyAllCorrections = () => {
    setInputText(correctedText)
    setStats(calculateStats(correctedText))
    setCorrections([])
    toast({
      title: "All corrections applied",
      description: `Applied ${corrections.length} corrections to your text`,
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard",
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-50 dark:bg-red-900/10"
      case "medium":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
      case "low":
        return "border-green-500 bg-green-50 dark:bg-green-900/10"
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-900/10"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Proofreader</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Correct grammar mistakes, improve clarity, and enhance your writing with AI-powered proofreading.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Your Text</span>
                </CardTitle>
                <CardDescription>Paste or type your text below to get started with proofreading</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Text to Proofread</Label>
                  <Textarea
                    id="input-text"
                    placeholder="Enter your text here for proofreading..."
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
                    <span>{stats.sentences} sentences</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(inputText)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button onClick={proofreadText} disabled={isProofreading || !inputText.trim()} size="sm">
                      {isProofreading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Proofreading...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Proofread
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Corrected Text */}
            {correctedText && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Corrected Text</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(correctedText)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={applyAllCorrections}>
                        Apply All
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 border">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{correctedText}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Corrections Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Corrections</span>
                  {corrections.length > 0 && <Badge variant="secondary">{corrections.length}</Badge>}
                </CardTitle>
                <CardDescription>Review and apply suggested corrections</CardDescription>
              </CardHeader>
              <CardContent>
                {corrections.length > 0 ? (
                  <div className="space-y-4">
                    {corrections.map((correction, index) => (
                      <div
                        key={correction.id}
                        className={`p-4 rounded-lg border-l-4 ${getSeverityColor(correction.severity)}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={correctionTypes[correction.type].color}>
                            {correctionTypes[correction.type].label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {correction.severity}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="line-through text-muted-foreground">{correction.original}</span>
                            <span className="mx-2">→</span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {correction.corrected}
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground">{correction.explanation}</p>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => applySingleCorrection(correction.id)}
                            className="w-full"
                          >
                            Apply Fix
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <Button onClick={applyAllCorrections} className="w-full">
                      Apply All Corrections
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No corrections found</p>
                    <p className="text-xs">Your text will be analyzed for errors when you click "Proofread"</p>
                  </div>
                )}
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
                    <span className="text-sm text-muted-foreground">Words</span>
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
                  {corrections.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Issues Found</span>
                        <span className="font-medium text-orange-600">{corrections.length}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
