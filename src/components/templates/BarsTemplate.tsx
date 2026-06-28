"use client"
import { BarsStep } from "@/src/types/schema"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"

interface BarsTemplateProps {
  step: BarsStep
  isDone: boolean
}

function barColor(index: number, highlight: number[], isDone: boolean): string {
  if (isDone) return "#22c55e"
  if (!highlight.includes(index)) return "#3d8eff40"
  const pos = highlight.indexOf(index)
  if (pos === 0) return "#3d8eff"
  if (pos === 1) return "#e05c5c"
  return "#c47f17"
}

export default function BarsTemplate({ step, isDone }: BarsTemplateProps) {
  const max = Math.max(...step.state)
  const center = Math.floor(step.state.length / 2)
  const prevStep = useRef<BarsStep>(step)
  const isSwapping = step.highlight.length === 2

  // detect which indices are swapping
  const [swapA, swapB] = isSwapping ? step.highlight : [-1, -1]

  useEffect(() => {
    prevStep.current = step
  }, [step])

  return (
    <div className="flex items-end gap-[2px] w-full h-full min-h-[180px] px-2 pb-2">
      {step.state.map((value, i) => {
        const isHighlighted = step.highlight.includes(i)
        const isSwapA = i === swapA
        const isSwapB = i === swapB

        return (
          <motion.div
            key={i}
            className="flex-1"
            style={{ minWidth: 0 }}
            animate={{
              height: `${(value / max) * 100}%`,
              backgroundColor: barColor(i, step.highlight, isDone),
              scaleY: isDone
                ? [1, 1.2, 1]
                : isHighlighted ? [1, 1.15, 1] : 1,
              // ✅ swap animation — A goes right, B goes left
              x: isSwapA ? [0, 8, 0] : isSwapB ? [0, -8, 0] : 0,
              y: isSwapA || isSwapB ? [0, -12, 0] : 0,  // ✅ lift up during swap
            }}
            transition={{
              height: { duration: 0.15 },
              backgroundColor: { duration: 0.05 },
              scaleY: {
                duration: 0.3,
                times: [0, 0.4, 1],
                ease: "easeOut",
                delay: isDone ? Math.abs(i - center) * 0.03 : 0,
              },
              x: { duration: 0.2, ease: "easeInOut" },
              y: { duration: 0.2, ease: "easeInOut" },
            }}
          />
        )
      })}
    </div>
  )
}