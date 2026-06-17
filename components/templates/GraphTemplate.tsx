"use client"
import { GraphNode, GraphStep } from "@/src/types/schema"
import { motion } from "framer-motion"


interface GraphTemplateProps {
  step: GraphStep
}

function nodeColor(index: number, highlight: number[]): string {
  if (highlight.includes(index)) return "#3d8eff"
  return "#1c2a3a"
}

export default function GraphTemplate({ step }: GraphTemplateProps) {
  const WIDTH = 700
  const HEIGHT = 500

  const getPos = (node: GraphNode) => ({
    x: (node.x / 100) * WIDTH,
    y: (node.y / 100) * HEIGHT,
  })

  return (
    <svg width="50%" height="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      {step.state.map((node) =>
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
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1.5}
            />
          )
        })
      )}
      {step.state.map((node, i) => {
        const pos = getPos(node)
        return (
          <g key={node.id}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={20}
              animate={{ fill: nodeColor(i, step.highlight) }}
              transition={{ duration: 0.2 }}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={1}
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