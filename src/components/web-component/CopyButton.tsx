"use client"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
 
export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
 
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
 
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 text-[10px] tracking-widest text-white/30 hover:text-white/70 transition-colors"
    >
      {copied ? (
        <>
          <Check size={10} className="text-green-400" />
          <span className="text-green-400">copied</span>
        </>
      ) : (
        <>
          <Copy size={10} />
          <span>copy</span>
        </>
      )}
    </button>
  )
}