"use client"

import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScrollToBottomButtonProps {
  className?: string
  isVisible: boolean
  onClick: () => void
}

export function ScrollToBottomButton({ className, isVisible, onClick }: ScrollToBottomButtonProps) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn(
        "h-10 w-10 rounded-full shadow-lg transition-all duration-200 animate-bounce",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        className,
      )}
      onClick={onClick}
      aria-label="Scroll to bottom"
    >
      <ArrowDown className="h-4 w-4" />
    </Button>
  )
}

