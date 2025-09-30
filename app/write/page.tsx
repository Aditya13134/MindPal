"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenTool, Copy, RefreshCw, Zap, BookOpen, Lightbulb, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contentTypes = [
  { value: "article", label: "Article", description: "Blog posts, news articles, and informative content" },
  { value: "story", label: "Creative Story", description: "Fiction, narratives, and creative writing" },
  { value: "email", label: "Email", description: "Professional emails and newsletters" },
  { value: "social", label: "Social Media", description: "Posts, captions, and social content" },
  { value: "marketing", label: "Marketing Copy", description: "Ads, sales pages, and promotional content" },
  { value: "technical", label: "Technical Writing", description: "Documentation, tutorials, and guides" },
  { value: "academic", label: "Academic", description: "Essays, research papers, and scholarly content" },
  { value: "business", label: "Business", description: "Reports, proposals, and business documents" },
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
  "Humorous",
  "Empathetic",
  "Confident",
]

const lengthOptions = [
  { value: "short", label: "Short", description: "100-300 words", words: "100-300" },
  { value: "medium", label: "Medium", description: "300-800 words", words: "300-800" },
  { value: "long", label: "Long", description: "800-1500 words", words: "800-1500" },
  { value: "extended", label: "Extended", description: "1500+ words", words: "1500+" },
]

interface WritingResult {
  content: string
  outline: string[]
  keyPoints: string[]
  wordCount: number
  readingTime: number
}

export default function WriterPage() {
  const [contentType, setContentType] = useState("")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("")
  const [length, setLength] = useState("")
  const [keywords, setKeywords] = useState("")
  const [audience, setAudience] = useState("")
  const [additionalInstructions, setAdditionalInstructions] = useState("")
  const [result, setResult] = useState<WritingResult | null>(null)
  const [isWriting, setIsWriting] = useState(false)
  const { toast } = useToast()

  const generateContent = async () => {
    if (!contentType || !topic || !tone || !length) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsWriting(true)

    // Simulate AI content generation
    setTimeout(() => {
      const lengthConfig = lengthOptions.find((l) => l.value === length)
      const targetWords = length === "short" ? 250 : length === "medium" ? 550 : length === "long" ? 1200 : 2000

      let content = ""
      let outline: string[] = []
      let keyPoints: string[] = []

      // Generate content based on type
      switch (contentType) {
        case "article":
          content = `# ${topic}\n\nIn today's rapidly evolving landscape, understanding ${topic.toLowerCase()} has become increasingly important. This comprehensive guide explores the key aspects, benefits, and practical applications that make this subject relevant to modern audiences.\n\n## Introduction\n\nThe significance of ${topic.toLowerCase()} cannot be overstated in our current environment. As we navigate through complex challenges and opportunities, having a solid grasp of these concepts enables better decision-making and strategic thinking.\n\n## Key Concepts\n\nSeveral fundamental principles underpin our understanding of ${topic.toLowerCase()}. These core elements work together to create a framework that professionals and enthusiasts alike can leverage for success.\n\n## Practical Applications\n\nReal-world implementation of these concepts demonstrates their value across various industries and contexts. From small businesses to large enterprises, the principles remain consistent while the applications vary.\n\n## Conclusion\n\nAs we look toward the future, ${topic.toLowerCase()} will continue to play a crucial role in shaping outcomes and driving innovation. Understanding these fundamentals positions individuals and organizations for sustained success.`

          outline = [
            "Introduction and context setting",
            "Key concepts and principles",
            "Practical applications and examples",
            "Future implications and trends",
            "Conclusion and key takeaways",
          ]

          keyPoints = [
            `Understanding ${topic.toLowerCase()} is crucial in today's environment`,
            "Core principles provide a framework for success",
            "Real-world applications demonstrate practical value",
            "Future trends indicate continued relevance",
          ]
          break

        case "story":
          content = `# ${topic}\n\nThe morning sun cast long shadows across the quiet street as Sarah stepped out of her apartment, unaware that this ordinary Tuesday would change everything. The events that followed would challenge her understanding of ${topic.toLowerCase()} and reshape her perspective forever.\n\n## Chapter 1: The Beginning\n\nIt started with a simple observation, something most people would have overlooked. But Sarah had always been different, more attuned to the subtle details that others missed. This particular morning, that attention to detail would prove invaluable.\n\n## Chapter 2: The Discovery\n\nAs the day unfolded, Sarah found herself drawn into a world she never knew existed. The concepts of ${topic.toLowerCase()} that she had only read about in books suddenly became vivid, tangible realities that demanded her immediate attention.\n\n## Chapter 3: The Challenge\n\nFaced with unexpected obstacles, Sarah had to draw upon every resource at her disposal. The theoretical knowledge she possessed about ${topic.toLowerCase()} would now be put to the ultimate test in real-world circumstances.\n\n## Epilogue\n\nLooking back on that transformative day, Sarah realized that understanding ${topic.toLowerCase()} wasn't just academic—it was deeply personal and profoundly meaningful in ways she had never imagined.`

          outline = [
            "Character introduction and setting",
            "Inciting incident and discovery",
            "Rising action and challenges",
            "Climax and resolution",
            "Reflection and character growth",
          ]

          keyPoints = [
            "Character-driven narrative exploring themes",
            "Progressive revelation of key concepts",
            "Conflict resolution through understanding",
            "Personal transformation and growth",
          ]
          break

        case "email":
          content = `Subject: ${topic}\n\nDear [Recipient],\n\nI hope this email finds you well. I'm writing to discuss ${topic.toLowerCase()} and how it relates to our current objectives and future planning.\n\nAs we've been exploring various approaches to enhance our operations, ${topic.toLowerCase()} has emerged as a particularly relevant area that deserves our attention. The potential benefits and applications are significant, and I believe we should consider how to integrate these concepts into our strategy.\n\nKey considerations include:\n\n• Strategic alignment with our current goals\n• Resource requirements and timeline\n• Expected outcomes and success metrics\n• Risk assessment and mitigation strategies\n\nI would appreciate the opportunity to discuss this further at your convenience. Please let me know when you might be available for a brief meeting to explore these ideas in more detail.\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]`

          outline = [
            "Professional greeting and context",
            "Purpose statement and relevance",
            "Key points and considerations",
            "Call to action and next steps",
            "Professional closing",
          ]

          keyPoints = [
            "Clear purpose and professional tone",
            "Structured presentation of key points",
            "Actionable next steps identified",
            "Respectful and considerate approach",
          ]
          break

        default:
          content = `# ${topic}\n\nThis ${tone.toLowerCase()} piece explores ${topic.toLowerCase()} from multiple perspectives, providing valuable insights for ${audience || "readers"}. Through careful analysis and practical examples, we'll uncover the key elements that make this subject both relevant and actionable.\n\n## Overview\n\nUnderstanding ${topic.toLowerCase()} requires a comprehensive approach that considers various factors and stakeholder perspectives. This content aims to provide that holistic view while maintaining accessibility and practical value.\n\n## Key Insights\n\nSeveral important themes emerge when examining ${topic.toLowerCase()} in detail. These insights form the foundation for deeper understanding and practical application.\n\n## Practical Applications\n\nThe concepts discussed here have real-world implications that extend beyond theoretical understanding. Implementation strategies and best practices provide actionable guidance for interested parties.\n\n## Conclusion\n\nAs we conclude this exploration of ${topic.toLowerCase()}, the key takeaways provide a solid foundation for further investigation and practical application in relevant contexts.`

          outline = [
            "Introduction and scope definition",
            "Background and context",
            "Key insights and analysis",
            "Practical applications",
            "Summary and conclusions",
          ]

          keyPoints = [
            "Comprehensive coverage of the topic",
            "Balance of theory and practical application",
            "Clear structure and logical flow",
            "Actionable insights and recommendations",
          ]
      }

      const wordCount = content.split(/\s+/).length
      const readingTime = Math.ceil(wordCount / 200)

      setResult({
        content,
        outline,
        keyPoints,
        wordCount,
        readingTime,
      })

      setIsWriting(false)
    }, 3500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard",
    })
  }

  const regenerateContent = () => {
    generateContent()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <PenTool className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">AI Writer</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create original and engaging text content for any purpose with AI-powered writing assistance.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Content Settings</span>
                </CardTitle>
                <CardDescription>Configure your content parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type *</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
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
                  <Label htmlFor="topic">Topic or Title *</Label>
                  <Input
                    id="topic"
                    placeholder="Enter your topic or title..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone *</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="length">Length *</Label>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        {lengthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-muted-foreground">{option.words} words</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., professionals, students, general public..."
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    placeholder="keyword1, keyword2, keyword3..."
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Additional Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any specific requirements or style preferences..."
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={generateContent}
                  disabled={isWriting || !contentType || !topic || !tone || !length}
                  className="w-full"
                  size="lg"
                >
                  {isWriting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Writing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Content Stats */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Word Count</span>
                      <span className="font-medium">{result.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Reading Time</span>
                      <span className="font-medium">~{result.readingTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Content Type</span>
                      <Badge variant="secondary">{contentTypes.find((t) => t.value === contentType)?.label}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tone</span>
                      <Badge variant="outline">{tone}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Content Results */}
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Generated Content</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={regenerateContent}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.content)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="outline">Outline</TabsTrigger>
                      <TabsTrigger value="keypoints">Key Points</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="mt-4">
                      <div className="bg-muted/50 rounded-lg p-4 border max-h-96 overflow-y-auto">
                        <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{result.content}</pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="outline" className="mt-4">
                      <div className="space-y-3">
                        {result.outline.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-xs font-medium text-primary">{index + 1}</span>
                            </div>
                            <p className="text-sm leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="keypoints" className="mt-4">
                      <div className="space-y-3">
                        {result.keyPoints.map((point, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-24">
                  <PenTool className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Ready to Create</h3>
                  <p className="text-muted-foreground mb-6">
                    Configure your content settings and click "Generate Content" to start writing
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {contentTypes.slice(0, 4).map((type) => (
                      <Badge key={type.value} variant="outline">
                        {type.label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
