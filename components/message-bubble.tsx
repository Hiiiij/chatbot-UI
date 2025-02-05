'use client'

import { StreamingMessage } from "./streaming-message";
interface MessageBubbleProps {
  content: string;
  role: 'assistant' | 'user';
  name?: string;
}

export function MessageBubble({ content, role, name }: MessageBubbleProps) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className="group relative max-w-[80%]">
        {name && (
          <div className="mb-2 text-sm text-zinc-400">
            {name}
          </div>
        )}
        <div className="relative rounded-2xl bg-zinc-700/50 text-zinc-100">
          <div className="max-h-[300px] overflow-y-auto message-scrollbar px-4 py-2 text-sm">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}



