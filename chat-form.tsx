import { useState, useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"

const Messages = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const handleScroll = () => {
    if (!messagesContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    setShowScrollButton(distanceFromBottom > 100)
  }

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="messages-container scrollbar-custom flex-1 overflow-y-auto p-4" ref={messagesContainerRef}>
      {/* Example messages */}
      <div>Message 1</div>
      <div>Message 2</div>
      <div>Message 3</div>
      <div>Message 4</div>
      <div>Message 5</div>
      <div>Message 6</div>
      <div>Message 7</div>
      <div>Message 8</div>
      <div>Message 9</div>
      <div>Message 10</div>
      {showScrollButton && (
        <button
          className="fixed bottom-24 right-8 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 animate-bounce"
          onClick={() => scrollToBottom()}
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default Messages

