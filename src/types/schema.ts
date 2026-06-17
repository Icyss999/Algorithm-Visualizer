export type BarState = "default" | "comparing" | "swapping" | "sorted" | "pivot"

export type BarsStep = {
  state: number[]
  highlight: number[]
  label: string
}

export type ArrayStep = {
  state: number[]
  highlight: number[]
  label: string
}

export type GridCell = "open" | "wall" | "start" | "end" | "visited" | "path" | "current"

export type GridStep = {
  state: GridCell[][]
  highlight: number[]
  label: string
}

export type GraphNode = {
  id: string
  connections: string[]
  x: number
  y: number
}

export type GraphStep = {
  state: GraphNode[]
  highlight: number[]
  label: string
}

export type TreeNode = {
  id: number
  value: number
  left: number | null
  right: number | null
}

export type TreeStep = {
  state: TreeNode[]
  highlight: number[]
  label: string
}

export type AlgorithmSpace = (BarsStep | ArrayStep | GridStep | GraphStep | TreeStep)[]

export type AlgorithmResponse = {
  type: "visualization"
  name: string
  template: "bars" | "array" | "grid" | "graph" | "tree"
  complexity: {
    time: string
    space: string
  }
  steps: AlgorithmSpace
  code: string
  explanation: string
}

export type ErrorResponse = {
  type: "error"
  message: string
}

export type ApiErrorResponse = {
  type: "api_error"
  message: string
}

export type ResponseType = AlgorithmResponse | ErrorResponse | ApiErrorResponse