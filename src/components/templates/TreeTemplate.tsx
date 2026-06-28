"use client"
import { TreeNode, TreeStep } from "@/src/types/schema"
import { motion } from "framer-motion"

interface TreeTemplateProps {
  step: TreeStep
  isDone: boolean
}

function getPositions(nodes: TreeNode[]): Map<number, { x: number; y: number }> {
  const positions = new Map<number, { x: number; y: number }>()
  const WIDTH = 300
  const LEVEL_HEIGHT = 50

  function assign(id: number | null, depth: number, left: number, right: number) {
    if (id === null) return
    const node = nodes.find((n) => n.id === id)
    if (!node) return
    const x = (left + right) / 2
    const y = depth * LEVEL_HEIGHT + 40
    positions.set(id, { x, y })
    assign(node.left, depth + 1, left, x)
    assign(node.right, depth + 1, x, right)
  }

  assign(0, 0, 0, WIDTH)
  return positions
}

export default function TreeTemplate({ step, isDone }: TreeTemplateProps) {
  const WIDTH = 400
  const HEIGHT = 250
  const positions = getPositions(step.state)

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      {/* Edges */}
      {step.state.map((node, z) => {
        const pos = positions.get(node.id)
        if (!pos) return null
        return (
          <g key={z}>
            {node.left !== null && positions.get(node.left) && (
              <line
                x1={pos.x} y1={pos.y}
                x2={positions.get(node.left)!.x}
                y2={positions.get(node.left)!.y}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1.5}
              />
            )}
            {node.right !== null && positions.get(node.right) && (
              <line
                x1={pos.x} y1={pos.y}
                x2={positions.get(node.right)!.x}
                y2={positions.get(node.right)!.y}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1.5}
              />
            )}
          </g>
        )
      })}

      {/* Nodes */}
      {step.state.map((node, i) => {
        const pos = positions.get(node.id)
        if (!pos) return null
        const isHighlighted = step.highlight.includes(i)

        return (
          <g key={node.id}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={20}
              animate={{
                fill: isDone ? "#22c55e" : isHighlighted ? "#3d8eff" : "#1c2a3a",
                r: isDone
                  ? [20, 26, 20]
                  : isHighlighted ? [20, 24, 20] : 20,
              }}
              transition={{
                fill: { duration: 0.05 },
                r: {
                  duration: 0.3,
                  times: [0, 0.4, 1],
                  ease: "easeOut",
                  delay: isDone ? i * 0.05 : 0,  // ✅ left to right stagger
                }
              }}
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
              {node.value}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
