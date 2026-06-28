"use client"
import { PublicAlgorithmResponse } from "@/src/types/schema";
import { Check, Code2, Copy } from "lucide-react";
import CopyButton from "./CopyButton";
import { useState } from "react";





export default function CodePage({data}:{data:PublicAlgorithmResponse}){

   const lines = data.code.split("\n")
 
  return (
    <div className="flex flex-col h-screen bg-foreground font-mono w-screen">
 
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-5">
          <Code2 className="w-5 h-5 text-white" />
          <span className="text-sm tracking-widest uppercase text-white/40">
            {data.name}
          </span>
          <span className="text-white/20 text-sm">/</span>
          <span className="text-sm tracking-widest uppercase text-white/70">
            code
          </span>
        </div>
 
        {/* copy button — needs to be client */}
        <CopyButton code={data.code} />
      </div>
 
      {/* Code area */}
      <div className="flex flex-1 overflow-auto">
 
        {/* Line numbers */}
        <div className="select-none shrink-0 pt-6 pb-6 pl-4 pr-4 text-right border-r border-white/5">
          {lines.map((_, i) => (
            <div key={i} className="text-sm leading-[1.8] text-white/20">
              {i + 1}
            </div>
          ))}
        </div>
 
        {/* Code */}
        <pre className="flex-1 overflow-auto pt-6 pb-6 pl-5 text-sm leading-[1.8] text-white/80 whitespace-pre">
          {lines.map((line, i) => (
            <div key={i} className="hover:bg-white/[0.03] transition-colors pr-6">
              {line || " "}
            </div>
          ))}
        </pre>
      </div>
 
      {/* Status bar */}
      <div className="shrink-0 flex items-center gap-4 px-4 py-1.5 bg-foreground border-t border-white/10">
        <span className="text-[10px] text-white tracking-widest">
          {lines.length} lines
        </span>
        <span className="text-[10px] text-white/20 tracking-widest">UTF-8</span>
        <span className="ml-auto text-[10px] text-blue-400/60 tracking-widest">
          icycle
        </span>
      </div>
 
    </div>
  
    )
}