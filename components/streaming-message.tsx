"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface StreamingMessageProps {
  content: string
  role: "assistant" | "user"
  isStreaming?: boolean
  username?: string
  timestamp?: Date
  speed?: number;
}

export function StreamingMessage({ content, role, isStreaming, username, timestamp,speed = 50 }: StreamingMessageProps) {
  const [displayedContent, setDisplayedContent] = useState(content)
  const previousContentRef = useRef(content)
  const [showThinking, setShowThinking] = useState(isStreaming && !content)

  useEffect(() => {
    setDisplayedContent(content)
    previousContentRef.current = content
    setShowThinking(isStreaming && !content)
  }, [content, isStreaming])

  return (
    <div className="flex flex-col max-w-[80%] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div
        className={cn(
          "flex items-center justify-between mb-1 px-3 py-1 rounded-t-lg",
          role === "assistant"
            ? "bg-gradient-to-r from-[#4C6EF5] to-[#7048E8]"
            : "bg-gradient-to-r from-blue-600 to-blue-100",
        )}
      >
        <span className="text-sm font-semibold text-white">{username || (role === "user" ? "You" : "AI")}</span>
        {timestamp && (
          <span className="text-xs text-white/80">
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
      <div
        className={cn(
          "rounded-b-lg rounded-tr-lg px-4 py-2",
          role === "user" ? "bg-blue-600 text-white" : "bg-zinc-800 text-white",
        )}
      >
        {showThinking ? (
          <div className="flex items-start">
            <span className="text-[15px] leading-6 thinking-pulse">AI is thinking...</span>
          </div>
        ) : (
          <div className={cn("min-h-[1.5em]", isStreaming && !content && "streaming-cursor")}>
            {displayedContent || (isStreaming ? " " : "")}
          </div>
        )}
      </div>
    </div>
  )
}



export function StreamMessage({ content, speed = 50 }: StreamingMessageProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < content.length) {
        setDisplayedText((prev) => prev + content[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content, speed]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
}
