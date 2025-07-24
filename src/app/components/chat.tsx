'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useChat } from "ai/react"
import { useRef, useEffect } from 'react'
import Link from 'next/link'

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'api/ex4',
    onError: (e) => {
      console.log(e)
    }
  })

  const chatParent = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const domNode = chatParent.current
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight
    }
  })

  return (
    <main className="flex flex-col w-full h-screen max-h-dvh bg-background">
      <header className="p-4 border-b w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">ausbiz consulting</h1>
      </header>

      {/* chatting area */}
      <section className="container px-0 flex-grow max-w-3xl mx-auto flex flex-col">
        <ul
          ref={chatParent}
          className="flex-grow p-4 bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4"
          style={{ minHeight: 0 }}
        >
          {messages.map((m, index) => {
            // Define phrases that indicate AI doesn't know the answer (fallback triggers)
            const fallbackTriggers = [
              "i don't know",
              "i'm not sure",
              "as an ai language model",
              "sorry, i can't",
              "unable to answer",
              "apologize"
            ]

            // Check if assistant message contains any fallback trigger
            const isFallback =
              m.role === 'assistant' &&
              fallbackTriggers.some(trigger =>
                m.content.toLowerCase().includes(trigger)
              )

            // Show fallback message if needed
            const contentToShow = isFallback
              ? "Sorry, I am unable to answer this question at the moment. 😢"
              : m.content

            return (
              <li
                key={index}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-xl p-4 shadow-md max-w-[70%] whitespace-pre-wrap
                    ${m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-primary'}
                  `}
                >
                  <p>{contentToShow}</p>
                </div>
              </li>
            )
          })}
        </ul>

        {/* input and buttons */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center p-4 border-t bg-background"
        >
          <Input
            className="flex-1 min-h-[40px]"
            placeholder="Type your question here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />

          <Button asChild variant="outline" className="ml-2">
            <Link href="/voice">🎤 Voice</Link>
          </Button>
          
          <Button className="ml-2" type="submit">
            Submit
          </Button>

          
        </form>
      </section>
    </main>
  )
}
