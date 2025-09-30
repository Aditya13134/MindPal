# MindPal - AI Writing Assistant

A hybrid AI-powered writing assistant that works both as a web application and Chrome extension. MindPal automatically switches between Google Gemini API (online) and Gemini Nano (offline) to provide seamless AI assistance regardless of your internet connection.

## 🚀 Features

### Core AI Capabilities
- **Prompt Generation**: Create high-quality prompts for various content types
- **Text Summarization**: Generate concise summaries with key points and insights
- **Translation**: Translate text between multiple languages
- **Content Writing**: Create engaging content for different audiences and purposes
- **Text Rewriting**: Improve and refine existing text with different styles and tones
- **Proofreading**: Grammar, spelling, and style corrections

### Hybrid Architecture
- **Online Mode**: Uses Google Gemini API for powerful cloud-based AI processing
- **Offline Mode**: Leverages Chrome's built-in Gemini Nano for privacy-focused local processing
- **Automatic Fallback**: Seamlessly switches between modes based on connectivity
- **Real-time Network Detection**: Visual indicators show current connection status

### Dual Platform Support
- **Web Application**: Full-featured webapp accessible via browser
- **Chrome Extension**: Floating action button on any webpage with modal interface
- **Text Selection Integration**: Process selected text from any website
- **Keyboard Shortcuts**: Quick access with Ctrl+Shift+M (or Cmd+Shift+M on Mac)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Google Gemini API key (for online features)
- Chrome browser (for extension and offline features)

### Web Application Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aditya13134/MindPal.git
   cd MindPal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Google Gemini API key to `.env.local`:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Chrome Extension Setup

1. **Build the extension**
   ```bash
   npm run package:extension
   ```

2. **Install in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked"
   - Select the `./extension` folder

3. **Usage**
   - Click the floating action button on any webpage
   - Use keyboard shortcut: `Ctrl+Shift+M` (or `Cmd+Shift+M`)
   - Select text on any page and use MindPal to process it

## 🎯 Usage Guide

### Web Application
Navigate through different AI tools using the sidebar:
- **Prompt Generator**: Create optimized prompts for AI models
- **Summarizer**: Extract key information from long texts
- **Translator**: Convert text between languages
- **Content Writer**: Generate articles, blogs, and marketing copy
- **Text Rewriter**: Improve existing content
- **Proofreader**: Fix grammar and style issues

### Chrome Extension
1. **Floating Button**: Click the MindPal button that appears on any webpage
2. **Text Selection**: Select text on any page, then use MindPal tools
3. **Modal Interface**: Full-featured AI tools in a convenient overlay
4. **Offline Support**: Works even without internet using Gemini Nano

### Network Status
- **Green "Online" badge**: Using Gemini API (cloud processing)
- **Red "Offline" badge**: Using Gemini Nano (local processing)
- **Refresh button**: Manually check connectivity status

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: Radix UI, Tailwind CSS, shadcn/ui
- **AI Integration**: Vercel AI SDK, Google AI SDK
- **State Management**: React Hooks, Context API
- **Build Tools**: Next.js, PostCSS, ESLint

### Key Components
- **AIService**: Hybrid AI processing with automatic fallback
- **NetworkUtils**: Real-time connectivity monitoring
- **GeminiNano**: Chrome's built-in AI integration
- **Extension Scripts**: Content script and manifest for Chrome extension

## 📁 Project Structure

```
mindpal/
├── app/                    # Next.js app directory
│   ├── api/               # API routes for AI services
│   ├── (pages)/           # Application pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── network-status.tsx # Network indicator
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── ai-service.ts     # Hybrid AI service
│   ├── gemini-nano.ts    # Offline AI integration
│   └── network-utils.ts  # Network detection
├── public/               # Static assets
│   ├── manifest.json     # Chrome extension manifest
│   └── content-script.js # Extension content script
└── scripts/              # Build and packaging scripts
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:extension` - Build for Chrome extension
- `npm run package:extension` - Package extension for distribution
- `npm run lint` - Run ESLint

### Environment Variables
- `GOOGLE_GENERATIVE_AI_API_KEY` - Your Google Gemini API key
- `BUILD_MODE` - Set to "extension" for extension builds

## 🚀 Deployment

### Web Application
Deploy to Vercel, Netlify, or any Node.js hosting platform:

```bash
npm run build
npm start
```

### Chrome Extension
1. Run `npm run package:extension`
2. Upload the `./extension` folder to Chrome Web Store
3. Or distribute as unpacked extension

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Vercel AI SDK](https://sdk.vercel.ai/) for AI integration
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Chrome AI](https://developer.chrome.com/docs/ai/) for offline AI features

## 📞 Support

For support, email [your-email@example.com] or open an issue on GitHub.

---

**MindPal** - Your intelligent writing companion, online and offline! 🧠✨