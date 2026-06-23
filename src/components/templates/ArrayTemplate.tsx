"use client"
import { ArrayStep } from "@/src/types/schema"
import { motion } from "framer-motion"


interface ArrayTemplateProps {
  step: ArrayStep
}

function cellColor(index: number, highlight: number[]): string {
  if (!highlight.includes(index)) return "transparent"
  const pos = highlight.indexOf(index)
  if (pos === 0) return "#3d8eff"
  if (pos === 1) return "#c47f17"
  return "#e05c5c"
}

export default function ArrayTemplate({ step }: ArrayTemplateProps) {
  return (
    <div className="flex items-center justify-center w-full h-full gap-2">
      {step.state.map((value, i) => (
        <motion.div
          key={i}
          animate={{ backgroundColor: cellColor(i, step.highlight) }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center w-12 h-12 border border-white/20 font-mono text-sm text-white"
        >
          {value}
        </motion.div>
      ))}
    </div>
  )
}