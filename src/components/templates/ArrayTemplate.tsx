"use client"
import { ArrayStep } from "@/src/types/schema"
import { motion } from "framer-motion"

interface ArrayTemplateProps {
  step: ArrayStep
  isDone: boolean
}

function cellColor(index: number, highlight: number[], isDone: boolean): string {
  if (isDone) return "#22c55e"
  if (!highlight.includes(index)) return "transparent"
  const pos = highlight.indexOf(index)
  if (pos === 0) return "#3d8eff"
  if (pos === 1) return "#c47f17"
  return "#e05c5c"
}

export default function ArrayTemplate({ step, isDone }: ArrayTemplateProps) {
  const center = Math.floor(step.state.length / 2)
  const isSwapping = step.highlight.length === 2
  const [swapA, swapB] = isSwapping ? step.highlight : [-1, -1]

  return (
    <div className="flex items-center justify-center w-full h-full gap-2">
      {step.state.map((value, i) => {
        const isHighlighted = step.highlight.includes(i)
        const isSwapA = i === swapA
        const isSwapB = i === swapB

        return (
          <motion.div
            key={i}
            animate={{
              backgroundColor: cellColor(i, step.highlight, isDone),
              scale: isDone
                ? [1, 1.2, 1]
                : isHighlighted ? [1, 1.2, 1] : 1,
              // ✅ swap — A lifts and moves right, B lifts and moves left
              x: isSwapA ? [0, 10, 0] : isSwapB ? [0, -10, 0] : 0,
              y: isSwapA || isSwapB ? [0, -15, 0] : 0,
            }}
            transition={{
              backgroundColor: { duration: 0.05 },
              scale: {
                duration: 0.3,
                times: [0, 0.4, 1],
                ease: "easeOut",
                delay: isDone ? Math.abs(i - center) * 0.05 : 0,
              },
              x: { duration: 0.25, ease: "easeInOut" },
              y: { duration: 0.25, ease: "easeInOut" },
            }}
            className="flex items-center justify-center w-12 h-12 border border-white/20 font-mono text-sm text-white"
          >
            {value}
          </motion.div>
        )
      })}
    </div>
  )
}