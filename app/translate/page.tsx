"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Languages, Copy, RefreshCw, ArrowRightLeft, Volume2, Globe, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const languages = [
  { code: "auto", name: "Auto-detect", flag: "🌐" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "zh-tw", name: "Chinese (Traditional)", flag: "🇹🇼" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "da", name: "Danish", flag: "🇩🇰" },
  { code: "no", name: "Norwegian", flag: "🇳🇴" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
  { code: "cs", name: "Czech", flag: "🇨🇿" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺" },
  { code: "ro", name: "Romanian", flag: "🇷🇴" },
  { code: "bg", name: "Bulgarian", flag: "🇧🇬" },
  { code: "hr", name: "Croatian", flag: "🇭🇷" },
  { code: "sk", name: "Slovak", flag: "🇸🇰" },
  { code: "sl", name: "Slovenian", flag: "🇸🇮" },
  { code: "et", name: "Estonian", flag: "🇪🇪" },
  { code: "lv", name: "Latvian", flag: "🇱🇻" },
  { code: "lt", name: "Lithuanian", flag: "🇱🇹" },
]

const popularLanguages = ["en", "es", "fr", "de", "it", "pt", "ru", "ja", "ko", "zh", "ar", "hi"]

interface TranslationResult {
  translatedText: string
  detectedLanguage?: string
  confidence: number
  alternativeTranslations?: string[]
}

export default function TranslatorPage() {
  const [inputText, setInputText] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("")
  const [result, setResult] = useState<TranslationResult | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [stats, setStats] = useState({ words: 0, characters: 0 })
  const { toast } = useToast()

  const calculateStats = (text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = text.length
    return { words, characters }
  }

  const handleInputChange = (value: string) => {
    setInputText(value)
    setStats(calculateStats(value))
  }

  const swapLanguages = () => {
    if (sourceLanguage === "auto") {
      toast({
        title: "Cannot swap languages",
        description: "Auto-detect cannot be used as target language",
        variant: "destructive",
      })
      return
    }

    const temp = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(temp)

    // If there's a translation result, swap the texts
    if (result) {
      setInputText(result.translatedText)
      setResult({
        ...result,
        translatedText: inputText,
      })
    }
  }

  const translateText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to translate",
        description: "Please enter some text to translate",
        variant: "destructive",
      })
      return
    }

    if (!targetLanguage) {
      toast({
        title: "Select target language",
        description: "Please select a language to translate to",
        variant: "destructive",
      })
      return
    }

    setIsTranslating(true)

    // Simulate AI translation
    setTimeout(() => {
      const targetLang = languages.find((l) => l.code === targetLanguage)
      const sourceLang = languages.find((l) => l.code === sourceLanguage)

      // Mock translation based on target language
      let translatedText = ""
      const detectedLanguage = sourceLanguage === "auto" ? "en" : sourceLanguage

      switch (targetLanguage) {
        case "es":
          translatedText = "Este es un texto traducido al español usando inteligencia artificial avanzada."
          break
        case "fr":
          translatedText = "Ceci est un texte traduit en français en utilisant l'intelligence artificielle avancée."
          break
        case "de":
          translatedText = "Dies ist ein ins Deutsche übersetzter Text mit fortschrittlicher künstlicher Intelligenz."
          break
        case "it":
          translatedText = "Questo è un testo tradotto in italiano utilizzando l'intelligenza artificiale avanzata."
          break
        case "pt":
          translatedText = "Este é um texto traduzido para o português usando inteligência artificial avançada."
          break
        case "ru":
          translatedText = "Это текст, переведенный на русский язык с использованием передовых технологий ИИ."
          break
        case "ja":
          translatedText = "これは高度な人工知能を使用して日本語に翻訳されたテキストです。"
          break
        case "ko":
          translatedText = "이것은 고급 인공지능을 사용하여 한국어로 번역된 텍스트입니다."
          break
        case "zh":
          translatedText = "这是使用先进人工智能翻译成中文的文本。"
          break
        case "ar":
          translatedText = "هذا نص مترجم إلى العربية باستخدام الذكاء الاصطناعي المتقدم."
          break
        case "hi":
          translatedText = "यह उन्नत कृत्रिम बुद्धिमत्ता का उपयोग करके हिंदी में अनुवादित पाठ है।"
          break
        default:
          translatedText = `This text has been translated to ${targetLang?.name} using advanced AI translation technology.`
      }

      const alternativeTranslations = [
        "Alternative translation option 1",
        "Alternative translation option 2",
        "Alternative translation option 3",
      ]

      setResult({
        translatedText,
        detectedLanguage,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99% confidence
        alternativeTranslations,
      })

      setIsTranslating(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Translation has been copied to your clipboard",
    })
  }

  const speakText = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language
      speechSynthesis.speak(utterance)
    } else {
      toast({
        title: "Speech not supported",
        description: "Your browser doesn't support text-to-speech",
        variant: "destructive",
      })
    }
  }

  const getLanguageName = (code: string) => {
    return languages.find((l) => l.code === code)?.name || code
  }

  const getLanguageFlag = (code: string) => {
    return languages.find((l) => l.code === code)?.flag || "🌐"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Languages className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Translator</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Add multilingual capabilities and translate text into your preferred language with AI-powered translation.
          </p>
        </div>

        <div className="space-y-8">
          {/* Language Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Language Selection</span>
              </CardTitle>
              <CardDescription>Choose source and target languages for translation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="source-language">From</Label>
                  <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">
                        <div className="flex items-center space-x-2">
                          <span>🌐</span>
                          <span>Auto-detect</span>
                        </div>
                      </SelectItem>
                      <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Popular Languages</div>
                      {languages
                        .filter((lang) => popularLanguages.includes(lang.code))
                        .map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            <div className="flex items-center space-x-2">
                              <span>{language.flag}</span>
                              <span>{language.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      <div className="px-2 py-1 text-xs font-medium text-muted-foreground">All Languages</div>
                      {languages
                        .filter((lang) => !popularLanguages.includes(lang.code) && lang.code !== "auto")
                        .map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            <div className="flex items-center space-x-2">
                              <span>{language.flag}</span>
                              <span>{language.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={swapLanguages}
                    disabled={sourceLanguage === "auto" || !targetLanguage}
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-language">To</Label>
                  <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target language" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Popular Languages</div>
                      {languages
                        .filter((lang) => popularLanguages.includes(lang.code))
                        .map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            <div className="flex items-center space-x-2">
                              <span>{language.flag}</span>
                              <span>{language.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      <div className="px-2 py-1 text-xs font-medium text-muted-foreground">All Languages</div>
                      {languages
                        .filter((lang) => !popularLanguages.includes(lang.code) && lang.code !== "auto")
                        .map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            <div className="flex items-center space-x-2">
                              <span>{language.flag}</span>
                              <span>{language.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Translation Interface */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{getLanguageFlag(sourceLanguage)}</span>
                    <span>{getLanguageName(sourceLanguage)}</span>
                  </div>
                  {inputText && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => speakText(inputText, sourceLanguage === "auto" ? "en" : sourceLanguage)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter text to translate..."
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span>{stats.words} words</span>
                    <span>{stats.characters} characters</span>
                  </div>

                  <Button
                    onClick={translateText}
                    disabled={isTranslating || !inputText.trim() || !targetLanguage}
                    size="sm"
                  >
                    {isTranslating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Translate
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{getLanguageFlag(targetLanguage)}</span>
                    <span>{getLanguageName(targetLanguage)}</span>
                  </div>
                  {result && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => speakText(result.translatedText, targetLanguage)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.translatedText)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 border min-h-[200px]">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.translatedText}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        {result.detectedLanguage && sourceLanguage === "auto" && (
                          <span>Detected: {getLanguageName(result.detectedLanguage)}</span>
                        )}
                        <span>Confidence: {result.confidence}%</span>
                      </div>
                      <Badge variant="secondary">Translated</Badge>
                    </div>

                    {result.alternativeTranslations && result.alternativeTranslations.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Alternative Translations</Label>
                        <div className="space-y-1">
                          {result.alternativeTranslations.map((alt, index) => (
                            <div
                              key={index}
                              className="text-sm p-2 bg-muted/30 rounded cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => copyToClipboard(alt)}
                            >
                              {alt}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground min-h-[200px] flex flex-col items-center justify-center">
                    <Languages className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Translation will appear here</p>
                    <p className="text-xs">Enter text and click "Translate" to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
