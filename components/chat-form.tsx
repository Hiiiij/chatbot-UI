"use client"

import { useState, useRef, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PaperclipIcon, Globe, ArrowUpIcon, Mic, Plus, ArrowDown } from "lucide-react"
import { AutoExpandingTextarea } from "./auto-expanding-textarea"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SignupPopup } from "./signup-popup"
import { Header } from "@/components/header"
import { Unbounded } from "next/font/google"
import { goChat } from "@/lib/api"

const unbounded = Unbounded({ subsets: ["latin"] })

interface Message {
  role: "assistant" | "user"
  content: string
}

export function ChatForm() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLandingPage, setIsLandingPage] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [showSignupPopup, setShowSignupPopup] = useState(false)
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  const handleScroll = () => {
    if (!messagesContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100)
  }

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [messagesContainerRef, handleScroll])

  useEffect(() => {
    if (!isLandingPage) {
      scrollToBottom("auto")
    }
  }, [messages, isLandingPage])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage, { role: "assistant", content: "" }])
    setInput("")
    if (textareaRef.current) textareaRef.current.style.height = "auto"
    setIsLandingPage(false)

    try
    {
      const assistantMessage: Message = { role: "assistant", content: await goChat(input) }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your message",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewThread = () => {
    setMessages([])
    setInput("")
    setIsLandingPage(true)
    if (textareaRef.current) textareaRef.current.style.height = "auto"
  }

  const handleLogoClick = () => {
    handleNewThread()
  }

  return (
    <>
      <Header unboundedFont={unbounded.className} isLandingPage={isLandingPage} onLogoClick={handleLogoClick} />
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4 bg-black">
        <Card
          className={cn(
            "flex flex-col overflow-hidden rounded-2xl",
            "w-[90%] md:w-[75%] max-w-5xl bg-[#0a0a0a]",
            isLandingPage ? "h-[300px]" : "h-[calc(100vh-2rem)]",
            "border-4 border-transparent",
          )}
        >
          <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl">
            {isLandingPage ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
                  What would you like to chat about today?
                </h1>
              </div>
            ) : (
              <div className="flex-1 overflow-hidden relative">
                <div ref={messagesContainerRef} className="absolute inset-0 overflow-y-auto scrollbar-custom p-16">
                  <div className="flex flex-col space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "relative max-w-[80%] break-words rounded-lg px-4 py-2",
                            message.role === "user" ? "bg-[#424244] text-white" : "bg-[#171717] text-white",
                          )}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                {showScrollButton && (
                  <Button
                    variant="default"
                    size="icon"
                    className="absolute bottom-4 right-4 h-9 w-9 rounded-full bg-[#171717]/80 hover:bg-[#171717]/90 text-white shadow-lg transition-all duration-200 animate-bounce-slow border border-white/10"
                    onClick={() => scrollToBottom()}
                  >
                    <ArrowDown className="h-3 w-3" />
                    <span className="sr-only">Scroll to bottom</span>
                  </Button>
                )}
              </div>
            )}
            <div className="flex-shrink-0 p-4">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="relative rounded-lg bg-zinc-900 border-[0.75px] border-primary p-[7px]">
                  <AutoExpandingTextarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
                      }
                    }}
                    placeholder="Ask anything about everything..."
                    maxHeight="200px"
                    className="w-full resize-none bg-transparent px-2 py-1 text-white placeholder-zinc-400 focus:outline-none textarea-cursor"
                  />
                  <div className="mt-2 flex justify-between items-center gap-2">
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full p-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                      >
                        <PaperclipIcon className="h-5 w-5" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full p-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                      >
                        <Globe className="h-5 w-5" />
                        <span className="sr-only">Browse</span>
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full p-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                      >
                        <Mic className="h-5 w-5" />
                        <span className="sr-only">Voice message</span>
                      </Button>
                    </div>
                    {!isLandingPage && (
                      <div className="flex justify-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                onClick={handleNewThread}
                                className="h-8 flex items-center space-x-1 px-2 sm:px-4 text-sm bg-zinc-800 text-white hover:bg-zinc-700 border border-solid border-zinc-600 transition-colors duration-200 rounded-lg"
                              >
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Start New Chat</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Start a new chat</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim()}
                        className={cn(
                          "h-8 w-8 rounded-lg p-1 transition-all duration-200 ease-in-out",
                          "bg-primary text-primary-foreground",
                          "hover:bg-primary/80 hover:-translate-y-1",
                          "focus:ring-2 focus:ring-primary focus:ring-opacity-50",
                          "active:bg-primary/90",
                          (isLoading || !input.trim()) && "opacity-50 cursor-not-allowed",
                        )}
                      >
                        <ArrowUpIcon className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <style jsx>{`
              .textarea-cursor {
                caret-color: hsl(var(--primary));
                caret-shape: bar;
              }
            `}</style>
          </div>
        </Card>
        <div className="text-white text-sm text-center mt-4">
          Get access to enhanced functionalities, including chat history and new features{" "}
          <button
            onClick={() => setShowSignupPopup(true)}
            className="group inline-flex items-center text-[#5FF4F4] hover:text-[#5FF4F4]/80 focus:outline-none transition-colors duration-200"
          >
            <span className="group-hover:-translate-y-1 transition-transform duration-200 ease-in-out inline-flex items-center">
              <span className="mr-1"> Sign up</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transform transition-transform duration-200 ease-in-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
        {showSignupPopup && (
          <SignupPopup
            onClose={() => setShowSignupPopup(false)}
            onSwitchToLogin={() => {
              setShowSignupPopup(false)
              // If you have a login popup, you can open it here
              // setShowLoginPopup(true)
            }}
          />
        )}
      </div>
    </>
  )
}

