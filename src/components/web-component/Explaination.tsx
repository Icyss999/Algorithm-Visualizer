import { PublicAlgorithmResponse } from "@/src/types/schema";
import { BookOpen } from "lucide-react";




export default function ExplainationPage ({data}:{data:PublicAlgorithmResponse}){
 const paragraphs = data.explanation.split("\n").filter(Boolean)
 
  return (
    <div className="flex flex-col h-screen bg-foreground font-mono">
 
      {/* Header */}
      <div className="flex items-center gap-5 px-4 py-6.5 border-b border-white/10 shrink-0">
        <BookOpen className="text-white w-5 h-5" />
        <span className="text-sm tracking-widest uppercase text-white/40">
          {data.name}
        </span>
        <span className="text-white/20 text-sm">/</span>
        <span className="text-sm tracking-widest uppercase text-white/70">
          explanation
        </span>
      </div>
 

      {/* Explanation content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="max-w-2xl flex flex-col gap-10">
 
          {/* section label */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-sm tracking-widest uppercase text-white">
              how it works
            </span>
          </div>
 
          {/* paragraphs */}
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-white"
            >
              {paragraph}
            </p>
          ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-sm tracking-widest uppercase text-white">
              Time Complexity
            </span>
        </div>
        <div className="text-sm"> {data.timeComplexity}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-sm tracking-widest uppercase text-white">
              Space Complexity
            </span>
        </div>
        <div className="text-sm">{data.spaceComplexity}</div>
          </div>
          </div>
      </div>
 
    </div>
    )
}