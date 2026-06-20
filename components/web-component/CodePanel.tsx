import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface CodePanelProps {
  code: string
  explain:string
  currentStep: number
  totalSteps: number
  label: string
}



export default function CodePanel({ code, label, explain }: CodePanelProps) {

  const [value,setValue] = useState("code")

  return (
    <div className="flex flex-col h-full border-l border-white/10">
      <div className="px-4 py-2 border-b border-white/10">
        <Select value={value} onValueChange={setValue} defaultValue="code">
          <SelectTrigger className="border-zinc-500 font-mono tracking-widest">
            <SelectValue placeholder="Answer"/>
          </SelectTrigger>
          <SelectContent className="bg-[#0a0f14]">
            <SelectGroup>
              <SelectLabel className="font-mono tracking-widest"> Choose the answer</SelectLabel>
              <SelectItem className="font-mono tracking-widest text-white" value="code">Code</SelectItem>
              <SelectItem className="font-mono tracking-widest text-white" value="explaination"> Explain </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {value == "code"? (
        <pre className="flex-1 overflow-auto p-4 font-mono text-[12px] text-white leading-relaxed">
          {code}
        </pre>
      ):(
        <div className="flex-1 overflow-auto p-4 font-mono text-sm text-white leading-relaxed">
          {explain}
        </div>
      )}
      {label && (
        <div className="px-4 py-2 border-t border-white/10">
          <p className="font-mono text-[10px] text-blue-400">{label}</p>
        </div>
      )}
    </div>
  )
}