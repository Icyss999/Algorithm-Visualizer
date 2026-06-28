"use client"
import { GraphNode, GraphStep } from "@/src/types/schema"
import { motion } from "framer-motion"

interface GraphTemplateProps {
  step: GraphStep
  isDone: boolean
}

function nodeColor(index: number, highlight: number[], isDone: boolean): string {
  if (isDone) return "#22c55e"
  return highlight.includes(index) ? "#3d8eff" : "#1c2a3a"
}

export default function GraphTemplate({ step, isDone }: GraphTemplateProps) {
  const WIDTH = 400
  const HEIGHT = 250

  const getPos = (node: GraphNode) => ({
    x: (node.x / 100) * WIDTH,
    y: (node.y / 100) * HEIGHT,
  })

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      {/* Edges */}
      {step.state.flatMap((node) =>
        node.connections.map((targetId) => {
          const target = step.state.find((n) => n.id === targetId)
          if (!target) return null
          const from = getPos(node)
          const to = getPos(target)
          return (
            <line
              key={`${node.id}-${targetId}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={1.5}
            />
          )
        })
      )}

      {/* Nodes */}
      {step.state.map((node, i) => {
        const pos = getPos(node)
        const isHighlighted = step.highlight.includes(i)

        return (
          <g key={node.id}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={20}
              animate={{
                fill: nodeColor(i, step.highlight, isDone),
                r: isHighlighted && !isDone ? [20, 24, 20] : 20,  // ✅ pop radius
              }}
              transition={{
                fill: { duration: 0.05 },
                r: {
                  duration: 0.25,
                  times: [0, 0.4, 1],
                  ease: "easeOut"
                }
              }}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1.5}
            />
            <text
              x={pos.x}
              y={pos.y + 4}
              textAnchor="middle"
              fill="white"
              fontSize={11}
              fontFamily="monospace"
            >
              {node.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}