"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Upload, ImageIcon, Mic, Copy, RefreshCw, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const promptTypes = [
  {
    value: "creative",
    label: "Creative Writing",
    description: "Generate prompts for stories, poems, and creative content",
  },
  { value: "business", label: "Business", description: "Professional content, emails, and marketing copy" },
  { value: "technical", label: "Technical", description: "Documentation, tutorials, and technical explanations" },
  { value: "academic", label: "Academic", description: "Research papers, essays, and educational content" },
  { value: "social", label: "Social Media", description: "Posts, captions, and social media content" },
  { value: "custom", label: "Custom", description: "Define your own prompt requirements" },
]

const toneOptions = [
  "Professional",
  "Casual",
  "Friendly",
  "Formal",
  "Humorous",
  "Persuasive",
  "Informative",
  "Creative",
]

const lengthOptions = [
  { value: "short", label: "Short (1-2 sentences)" },
  { value: "medium", label: "Medium (1-2 paragraphs)" },
  { value: "long", label: "Long (3+ paragraphs)" },
]

export default function PromptGeneratorPage() {
  const [promptType, setPromptType] = useState("")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("")
  const [length, setLength] = useState("")
  const [context, setContext] = useState("")
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) added to your prompt context`,
    })
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const generatePrompt = async () => {
    if (!promptType || !topic) {
      toast({
        title: "Missing information",
        description: "Please select a prompt type and enter a topic",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const selectedType = promptTypes.find((t) => t.value === promptType)
      const contextText = context ? ` Consider the following context: ${context}` : ""
      const fileContext =
        uploadedFiles.length > 0 ? ` [Note: ${uploadedFiles.length} file(s) uploaded for additional context]` : ""

      let prompt = ""

      switch (promptType) {
        case "creative":
          prompt = `Write a ${tone.toLowerCase()} ${length === "short" ? "brief" : length === "medium" ? "moderate-length" : "detailed"} creative piece about ${topic}. Focus on vivid imagery, engaging characters, and compelling narrative elements.${contextText}${fileContext}`
          break
        case "business":
          prompt = `Create ${tone.toLowerCase()} business content about ${topic}. Ensure it's ${length === "short" ? "concise and impactful" : length === "medium" ? "comprehensive yet accessible" : "thorough and detailed"}, suitable for professional audiences.${contextText}${fileContext}`
          break
        case "technical":
          prompt = `Develop ${tone.toLowerCase()} technical documentation about ${topic}. Make it ${length === "short" ? "clear and concise" : length === "medium" ? "informative with examples" : "comprehensive with detailed explanations"}, suitable for the target audience.${contextText}${fileContext}`
          break
        case "academic":
          prompt = `Compose ${tone.toLowerCase()} academic content about ${topic}. Structure it as a ${length === "short" ? "brief analysis" : length === "medium" ? "well-researched discussion" : "comprehensive examination"} with proper citations and scholarly approach.${contextText}${fileContext}`
          break
        case "social":
          prompt = `Create ${tone.toLowerCase()} social media content about ${topic}. Make it ${length === "short" ? "punchy and engaging" : length === "medium" ? "informative yet shareable" : "comprehensive but accessible"}, optimized for social platforms.${contextText}${fileContext}`
          break
        default:
          prompt = `Generate ${tone.toLowerCase()} content about ${topic} with a ${length} format.${contextText}${fileContext}`
      }

      setGeneratedPrompt(prompt)
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
    toast({
      title: "Copied to clipboard",
      description: "The generated prompt has been copied to your clipboard",
    })
  }

  const regeneratePrompt = () => {
    generatePrompt()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Prompt Generator</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate dynamic, contextual prompts with multimodal support. Upload images and audio files to enhance your
            prompt generation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wand2 className="h-5 w-5" />
                <span>Prompt Configuration</span>
              </CardTitle>
              <CardDescription>Configure your prompt parameters and upload supporting files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt-type">Prompt Type</Label>
                <Select value={promptType} onValueChange={setPromptType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select prompt type" />
                  </SelectTrigger>
                  <SelectContent>
                    {promptTypes.map((type) => (
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
                <Label htmlFor="topic">Topic or Subject</Label>
                <Textarea
                  id="topic"
                  placeholder="Enter the main topic or subject for your prompt..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
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
                  <Label htmlFor="length">Length</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="Provide any additional context, requirements, or constraints..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={3}
                />
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                <Label>Multimodal Input</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex space-x-2">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <Mic className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Upload images or audio files to enhance your prompt</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </label>
                    </Button>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map((file, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span className="text-xs">{file.name}</span>
                          <button
                            onClick={() => removeFile(index)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={generatePrompt}
                disabled={isGenerating || !promptType || !topic}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Prompt
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Generated Prompt</span>
                </div>
                {generatedPrompt && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={regeneratePrompt}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>Your AI-generated prompt will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedPrompt ? (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 border">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{generatedPrompt}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Generated prompt • {generatedPrompt.length} characters</span>
                    <span>Ready to use</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Configure your prompt settings and click "Generate Prompt" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
