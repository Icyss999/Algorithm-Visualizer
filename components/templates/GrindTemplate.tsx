"use client"
import { GridCell, GridStep } from "@/src/types/schema"
import { motion } from "framer-motion"


interface GridTemplateProps {
  step: GridStep
}

function cellColor(cell: GridCell): string {
  switch (cell) {
    case "start":   return "#2a7a4a"
    case "end":     return "#c47f17"
    case "wall":    return "#1a1a2e"
    case "visited": return "#1a3a5c"
    case "current": return "#3d8eff"
    case "path":    return "#e05c5c"
    default:        return "transparent"
  }
}

export default function GridTemplate({ step }: GridTemplateProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-1">
      {step.state.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((cell, c) => (
            <motion.div
              key={c}
              animate={{ backgroundColor: cellColor(cell) }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 border border-white/10 flex items-center justify-center font-mono text-[9px] text-white/40"
            >
              {cell === "start" ? "S" : cell === "end" ? "E" : ""}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}