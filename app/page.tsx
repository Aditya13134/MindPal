import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import {
  Sparkles,
  CheckCircle,
  FileText,
  Languages,
  PenTool,
  RefreshCw,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react"

const features = [
  {
    name: "Prompt Generator",
    description: "Generate dynamic user prompts with multimodal support for image and audio input",
    icon: Sparkles,
    href: "/prompt",
    gradient: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-500",
    borderColor: "border-purple-200 hover:border-purple-300",
    bgColor: "bg-purple-50 hover:bg-purple-100",
    textColor: "text-purple-700",
  },
  {
    name: "Proofreader",
    description: "Correct grammar mistakes with ease and improve text quality",
    icon: CheckCircle,
    href: "/proofread",
    gradient: "from-green-500 to-green-600",
    iconBg: "bg-green-500",
    borderColor: "border-green-200 hover:border-green-300",
    bgColor: "bg-green-50 hover:bg-green-100",
    textColor: "text-green-700",
  },
  {
    name: "Summarizer",
    description: "Distill complex information into clear, actionable insights",
    icon: FileText,
    href: "/summarize",
    gradient: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-500",
    borderColor: "border-blue-200 hover:border-blue-300",
    bgColor: "bg-blue-50 hover:bg-blue-100",
    textColor: "text-blue-700",
  },
  {
    name: "Translator",
    description: "Add multilingual capabilities and translate text into your preferred language",
    icon: Languages,
    href: "/translate",
    gradient: "from-orange-500 to-orange-600",
    iconBg: "bg-orange-500",
    borderColor: "border-orange-200 hover:border-orange-300",
    bgColor: "bg-orange-50 hover:bg-orange-100",
    textColor: "text-orange-700",
  },
  {
    name: "Writer",
    description: "Create original and engaging text content for any purpose",
    icon: PenTool,
    href: "/write",
    gradient: "from-pink-500 to-pink-600",
    iconBg: "bg-pink-500",
    borderColor: "border-pink-200 hover:border-pink-300",
    bgColor: "bg-pink-50 hover:bg-pink-100",
    textColor: "text-pink-700",
  },
  {
    name: "Rewriter",
    description: "Improve existing content with alternative options and enhanced clarity",
    icon: RefreshCw,
    href: "/rewrite",
    gradient: "from-cyan-500 to-cyan-600",
    iconBg: "bg-cyan-500",
    borderColor: "border-cyan-200 hover:border-cyan-300",
    bgColor: "bg-cyan-50 hover:bg-cyan-100",
    textColor: "text-cyan-700",
  },
]

const benefits = [
  {
    name: "Lightning Fast",
    description: "Process text instantly with our optimized AI models",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    name: "Secure & Private",
    description: "Your data is encrypted and never stored on our servers",
    icon: Shield,
    color: "text-green-500",
  },
  {
    name: "Global Support",
    description: "Support for 100+ languages and regional dialects",
    icon: Globe,
    color: "text-blue-500",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance animate-slide-up">
              The AI Toolkit for{" "}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Content Creation
              </span>
            </h1>
            <p
              className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto text-pretty animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Empower your writing workflow with our comprehensive suite of AI-powered tools. From generating prompts to
              perfecting prose, we've got everything you need to create exceptional content.
            </p>
            <div
              className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                size="lg"
                className="hover-lift hover-glow shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-2xl"
                asChild
              >
                <Link href="/prompt">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hover-lift bg-transparent" asChild>
                <Link href="#features">Explore Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Powerful AI Tools</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to enhance your content creation workflow
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.name}
                  className={cn(
                    "group hover-lift hover-glow transition-all duration-500 border-2 animate-scale-in",
                    feature.borderColor,
                    feature.bgColor,
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div
                          className={cn(
                            "p-2 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300",
                            `bg-gradient-to-br ${feature.gradient}`,
                          )}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <CardTitle className={cn("text-xl transition-colors", feature.textColor)}>
                        {feature.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4 transition-colors">
                      {feature.description}
                    </CardDescription>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-foreground group-hover:text-background transition-all duration-300 hover-lift"
                      asChild
                    >
                      <Link href={feature.href}>
                        Try Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-muted/30 py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div
            className="absolute top-0 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Our AI Toolkit?
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.name}
                  className="text-center group hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-background to-muted shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Icon
                      className={`h-8 w-8 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-foreground group-hover:text-foreground transition-colors">
                    {benefit.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Ready to transform your content?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Start using our AI-powered tools today and experience the future of content creation.
            </p>
            <div
              className="mt-10 flex items-center justify-center gap-x-6 animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                size="lg"
                className="hover-lift hover-glow shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-2xl"
                asChild
              >
                <Link href="/prompt">
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
