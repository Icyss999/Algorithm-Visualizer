"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface SearchBoxProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export default function SearchBox({ onSearch, isLoading }: SearchBoxProps) {
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return
    onSearch(input.trim())
  }

  return (
    <div className="flex gap-2 px-6 py-4">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Type any algorithm..."
        className="flex-1 bg-white/5 border border-white/10 h-full w-full px-4 py-2 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
      />
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !input.trim()}
        className="px-5 py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs text-white transition-colors"
      >
        {isLoading ? "THINKING..." : "VISUALIZE"}
      </Button>
    </div>
  )
}