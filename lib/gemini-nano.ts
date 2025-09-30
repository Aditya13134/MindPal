'use client'

// Chrome AI API types
declare global {
  interface Window {
    ai?: {
      languageModel?: {
        capabilities(): Promise<{
          available: 'readily' | 'after-download' | 'no'
        }>
        create(options?: {
          temperature?: number
          topK?: number
        }): Promise<{
          prompt(text: string): Promise<string>
          destroy(): void
        }>
      }
      summarizer?: {
        capabilities(): Promise<{
          available: 'readily' | 'after-download' | 'no'
        }>
        create(options?: {
          type?: 'tl;dr' | 'key-points' | 'teaser' | 'headline'
          format?: 'markdown' | 'plain-text'
          length?: 'short' | 'medium' | 'long'
        }): Promise<{
          summarize(text: string): Promise<string>
          destroy(): void
        }>
      }
      translator?: {
        capabilities(): Promise<{
          available: 'readily' | 'after-download' | 'no'
          languagePairAvailable(sourceLanguage: string, targetLanguage: string): Promise<'readily' | 'after-download' | 'no'>
        }>
        create(options: {
          sourceLanguage: string
          targetLanguage: string
        }): Promise<{
          translate(text: string): Promise<string>
          destroy(): void
        }>
      }
      rewriter?: {
        capabilities(): Promise<{
          available: 'readily' | 'after-download' | 'no'
        }>
        create(options?: {
          tone?: 'as-is' | 'more-formal' | 'more-casual'
          format?: 'as-is' | 'plain-text'
          length?: 'as-is' | 'shorter' | 'longer'
        }): Promise<{
          rewrite(text: string): Promise<string>
          destroy(): void
        }>
      }
    }
  }
}

export class GeminiNano {
  private static instance: GeminiNano
  private languageModel: any = null
  private summarizer: any = null
  private translator: any = null
  private rewriter: any = null

  private constructor() {}

  static getInstance(): GeminiNano {
    if (!GeminiNano.instance) {
      GeminiNano.instance = new GeminiNano()
    }
    return GeminiNano.instance
  }

  async isAvailable(): Promise<boolean> {
    if (typeof window === 'undefined' || !window.ai) {
      return false
    }

    try {
      const capabilities = await window.ai.languageModel?.capabilities()
      return capabilities?.available === 'readily' || capabilities?.available === 'after-download'
    } catch {
      return false
    }
  }

  async initializeLanguageModel() {
    if (!window.ai?.languageModel || this.languageModel) return

    try {
      this.languageModel = await window.ai.languageModel.create({
        temperature: 0.7,
        topK: 40
      })
    } catch (error) {
      console.error('Failed to initialize language model:', error)
      throw error
    }
  }

  async generateText(prompt: string): Promise<string> {
    if (!this.languageModel) {
      await this.initializeLanguageModel()
    }

    if (!this.languageModel) {
      throw new Error('Language model not available')
    }

    try {
      return await this.languageModel.prompt(prompt)
    } catch (error) {
      console.error('Text generation failed:', error)
      throw error
    }
  }

  async summarizeText(text: string, type: 'tl;dr' | 'key-points' = 'tl;dr', length: 'short' | 'medium' | 'long' = 'medium'): Promise<string> {
    if (!window.ai?.summarizer) {
      // Fallback to language model
      const prompt = `Summarize the following text in ${length} length using ${type} style:\n\n${text}`
      return this.generateText(prompt)
    }

    try {
      if (!this.summarizer) {
        this.summarizer = await window.ai.summarizer.create({
          type,
          format: 'plain-text',
          length
        })
      }

      return await this.summarizer.summarize(text)
    } catch (error) {
      console.error('Summarization failed:', error)
      // Fallback to language model
      const prompt = `Summarize the following text in ${length} length:\n\n${text}`
      return this.generateText(prompt)
    }
  }

  async translateText(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
    if (!window.ai?.translator) {
      // Fallback to language model
      const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}:\n\n${text}`
      return this.generateText(prompt)
    }

    try {
      if (!this.translator) {
        this.translator = await window.ai.translator.create({
          sourceLanguage,
          targetLanguage
        })
      }

      return await this.translator.translate(text)
    } catch (error) {
      console.error('Translation failed:', error)
      // Fallback to language model
      const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}:\n\n${text}`
      return this.generateText(prompt)
    }
  }

  async rewriteText(text: string, tone: 'as-is' | 'more-formal' | 'more-casual' = 'as-is', length: 'as-is' | 'shorter' | 'longer' = 'as-is'): Promise<string> {
    if (!window.ai?.rewriter) {
      // Fallback to language model
      const toneInstruction = tone !== 'as-is' ? ` with a ${tone.replace('-', ' ')} tone` : ''
      const lengthInstruction = length !== 'as-is' ? ` making it ${length}` : ''
      const prompt = `Rewrite the following text${toneInstruction}${lengthInstruction}:\n\n${text}`
      return this.generateText(prompt)
    }

    try {
      if (!this.rewriter) {
        this.rewriter = await window.ai.rewriter.create({
          tone,
          format: 'plain-text',
          length
        })
      }

      return await this.rewriter.rewrite(text)
    } catch (error) {
      console.error('Rewriting failed:', error)
      // Fallback to language model
      const toneInstruction = tone !== 'as-is' ? ` with a ${tone.replace('-', ' ')} tone` : ''
      const lengthInstruction = length !== 'as-is' ? ` making it ${length}` : ''
      const prompt = `Rewrite the following text${toneInstruction}${lengthInstruction}:\n\n${text}`
      return this.generateText(prompt)
    }
  }

  cleanup() {
    if (this.languageModel) {
      this.languageModel.destroy()
      this.languageModel = null
    }
    if (this.summarizer) {
      this.summarizer.destroy()
      this.summarizer = null
    }
    if (this.translator) {
      this.translator.destroy()
      this.translator = null
    }
    if (this.rewriter) {
      this.rewriter.destroy()
      this.rewriter = null
    }
  }
}

export const geminiNano = GeminiNano.getInstance()