"use client"
import { GridCell, GridStep } from "@/src/types/schema"
import { motion } from "framer-motion"

interface GridTemplateProps {
  step: GridStep
  isDone: boolean
}

function cellColor(cell: GridCell, isDone: boolean): string {
  if (isDone && (cell === "visited" || cell === "current")) return "#22c55e"
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

export default function GridTemplate({ step, isDone }: GridTemplateProps) {
  const totalCols = step.state[0]?.length ?? 1

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-1">
      {step.state.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((cell, c) => {
            const isActive = cell === "current"
            const linearIndex = r * totalCols + c
            const centerIndex = Math.floor((step.state.length * totalCols) / 2)

            return (
              <motion.div
                key={c}
                animate={{
                  backgroundColor: cellColor(cell, isDone),
                  scale: isDone
                    ? [1, 1.15, 1]
                    : isActive ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  backgroundColor: { duration: 0.05 },
                  scale: {
                    duration: 0.3,
                    times: [0, 0.4, 1],
                    ease: "easeOut",
                    delay: isDone
                      ? Math.abs(linearIndex - centerIndex) * 0.01  // ✅ center outward
                      : 0,
                  }
                }}
                className="w-10 h-10 border border-white/10 flex items-center justify-center font-mono text-[9px] text-white/40"
              >
                {cell === "start" ? "S" : cell === "end" ? "E" : ""}
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )
}