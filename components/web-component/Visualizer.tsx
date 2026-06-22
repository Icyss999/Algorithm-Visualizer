"use client"
import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react"
import BarsTemplate from "../templates/BarsTemplate"
import ArrayTemplate from "../templates/ArrayTemplate"
import GridTemplate from "../templates/GrindTemplate"
import GraphTemplate from "../templates/GraphTemplate"
import TreeTemplate from "../templates/TreeTemplate"
import { AlgorithmResponse, ArrayStep, BarsStep, GraphStep, GridStep, TreeStep } from "@/src/types/schema"
import { Button } from "../ui/button"

interface VisualizerProps {
  data: AlgorithmResponse
}

export default function Visualizer({ data }: VisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalSteps = data.steps.length
  const step = data.steps[currentStep]
  const isDone = currentStep >= totalSteps - 1

  useEffect(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [data])

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    if (isDone) {
      setIsPlaying(false)
      return
    }
    const delay = Math.round(1000 - speed * 9)
    intervalRef.current = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= totalSteps - 1) {
          setIsPlaying(false)
          return s
        }
        return s + 1
      })
    }, delay)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPlaying, speed, totalSteps, isDone])

  const handleStep = () => {
    if (isDone) return
    setIsPlaying(false)
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1))
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const renderTemplate = () => {
    switch (data.template) {
      case "bars":  return <BarsTemplate step={step as BarsStep} />
      case "array": return <ArrayTemplate step={step as ArrayStep} />
      case "grid":  return <GridTemplate step={step as GridStep} />
      case "graph": return <GraphTemplate step={step as GraphStep} />
      case "tree":  return <TreeTemplate step={step as TreeStep} />
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Algorithm info — wraps on mobile */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 md:px-6 py-3 border-b border-white/10 shrink-0">
        <span className="font-mono text-sm md:text-base text-white">{data.name}</span>
        <span className="font-mono text-[11px] text-white/40">
          Time: <span className="text-white">{data.complexity.time}</span>
        </span>
        <span className="font-mono text-[11px] text-white/40">
          Space: <span className="text-white">{data.complexity.space}</span>
        </span>
      </div>

      {/* Canvas — explicit min height so it never collapses */}
      <div className="flex-1 min-h-[200px] md:min-h-[280px] border-b border-white/10 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          {renderTemplate()}
        </div>
      </div>

      {/* Step label */}
      <div className="px-4 md:px-6 py-3 border-b border-white/10 shrink-0 flex flex-col gap-3 h-25 overflow-auto">
        <span className="font-mono text-[11px] text-white">
          Step: <span className="text-white">{currentStep + 1}</span> / {totalSteps}
        </span>
        <p className="font-mono text-xs md:text-sm text-white leading-5">{step.label}</p>
      </div>

      {/* Controls — wraps on mobile */}
      <div className="flex flex-wrap items-center gap-3 px-4 md:px-6 py-3 shrink-0 border-b border-white/10">

        {/* Playback buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => isDone ? handleReset() : setIsPlaying((p) => !p)}
            className="flex items-center justify-center w-8 h-8 border border-white/10 hover:bg-white/5 transition-colors"
          >
            {isPlaying
              ? <Pause size={13} className="text-blue-400" />
              : <Play size={13} className="text-blue-400" />}
          </Button>

          <Button
            onClick={handleStep}
            disabled={isDone}
            className="flex items-center justify-center w-8 h-8 border border-white/10 hover:bg-white/5 disabled:opacity-30 transition-colors"
          >
            <SkipForward size={13} className="text-white/70" />
          </Button>

          <Button
            onClick={handleReset}
            className="flex items-center justify-center w-8 h-8 border border-white/10 hover:bg-white/5 transition-colors"
          >
            <RotateCcw size={13} className="text-white/50" />
          </Button>
        </div>

        <div className="w-px h-4 bg-white/10" />

        {/* Speed — takes remaining space, shrinks on mobile */}
        <div className="flex items-center gap-2 flex-1 min-w-[140px]">
          <span className="font-mono text-[10px] text-white/40 shrink-0">SPEED</span>
          <input
            type="range" min={1} max={100} value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="flex-1 cursor-pointer"
            style={{ accentColor: "#3d8eff" }}
          />
          <span className="font-mono text-[10px] text-white/60 w-6 shrink-0">{speed}</span>
        </div>
      </div>
    </div>
  )
}