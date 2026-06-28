"use client"
import { BarsStep } from "@/src/types/schema"
import { motion } from "framer-motion"

interface BarsTemplateProps {
  step: BarsStep
  isDone: boolean
}

function barColor(index: number, highlight: number[], isDone: boolean): string {
  if (isDone) return "#22c55e"
  if (!highlight.includes(index)) return "#3d8eff40"  // ✅ visible default color
  const pos = highlight.indexOf(index)
  if (pos === 0) return "#3d8eff"
  if (pos === 1) return "#e05c5c"
  return "#c47f17"
}

export default function BarsTemplate({ step, isDone }: BarsTemplateProps) {
  const max = Math.max(...step.state)

  return (
    <div className="flex items-end gap-[2px] w-full h-full min-h-[180px] px-2 pb-2">
      {step.state.map((value, i) => {
        const isHighlighted = step.highlight.includes(i)
        return (
          <motion.div
            key={i}
            className="flex-1"
            style={{
              minWidth: 0,
              height: `${(value / max) * 100}%`,  // ✅ height via style not animate
            }}
            animate={{
              backgroundColor: barColor(i, step.highlight, isDone),
              scaleY: isHighlighted && !isDone ? [1, 1.15, 1] : 1,
            }}
            transition={{
              backgroundColor: { duration: 0.05 },
              scaleY: {
                duration: 0.25,
                times: [0, 0.4, 1],
                ease: "easeOut"
              }
            }}
          />
        )
      })}
    </div>
  )
}