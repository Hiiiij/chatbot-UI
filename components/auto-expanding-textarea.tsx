import type React from "react"
import { useRef, useEffect, forwardRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AutoExpandingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: string
}

export const AutoExpandingTextarea = forwardRef<HTMLTextAreaElement, AutoExpandingTextareaProps>(
  ({ maxHeight = "200px", className, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      const textarea = textareaRef.current
      if (!textarea) return

      const adjustHeight = () => {
        textarea.style.height = "auto"
        textarea.style.height = `${Math.min(textarea.scrollHeight, Number.parseInt(maxHeight))}px`
      }

      textarea.addEventListener("input", adjustHeight)
      adjustHeight()

      return () => textarea.removeEventListener("input", adjustHeight)
    }, [maxHeight])

    return (
      <Textarea
        ref={(node) => {
          if (textareaRef.current) {
            (textareaRef.current as HTMLTextAreaElement | null) = node
          }
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn(
          "scrollbar-custom min-h-[40px] overflow-y-auto focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0",
          className,
        )}
        rows={1}
        {...props}
      />
    )
  },
)

AutoExpandingTextarea.displayName = "AutoExpandingTextarea"

