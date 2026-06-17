"use client"
import { BarsStep } from "@/src/types/schema"
import { motion } from "framer-motion"


interface BarsTemplateProps {
  step: BarsStep
}

function barColor(index: number, highlight: number[]): string {
  if (!highlight.includes(index)) return "#1c2a3a"
  const pos = highlight.indexOf(index)
  if (pos === 0) return "#3d8eff"
  if (pos === 1) return "#e05c5c"
  return "#c47f17"
}

export default function BarsTemplate({ step }: BarsTemplateProps) {
  const max = Math.max(...step.state)

  return (
    <div className="flex items-end gap-[2px] w-full h-full px-2 pb-2">
      {step.state.map((value, i) => (
        <motion.div
          key={i}
          className="flex-1"
          animate={{
            height: `${(value / max) * 100}%`,
            backgroundColor: barColor(i, step.highlight),
          }}
          transition={{ duration: 0.15 }}
          style={{ minWidth: 0 }}
        />
      ))}
    </div>
  )
}