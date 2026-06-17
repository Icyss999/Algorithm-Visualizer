"use client"
import { useState } from "react"

import SearchBox from "@/components/web-component/SearchBox"
import Visualizer from "@/components/web-component/Visualizer"
import CodePanel from "@/components/web-component/CodePanel"
import { SnowflakeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlgorithmResponse } from "@/src/types/schema"
import { IcyssAgent } from "@/src/agent/agent"

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<AlgorithmResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setError(null)
    setData(null)
    setCurrentStep(0)

    const result = await IcyssAgent(query)

    if (result.success && result.data.type === "visualization") {
      setData(result.data as AlgorithmResponse)
    } else {
      setError((result.data as { message: string }).message)
    }

    setIsLoading(false)
  }

  return (
    <div
      className="flex flex-col bg-[#0a0f14] text-white overflow-hidden h-screen"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <header
      className="flex items-center px-6 h-20 border-b border-white/10 flex gap-5">
        <SnowflakeIcon className="w-5 h-5 "/>
        <span className="font-mono tracking-widest text-white text-base uppercase">
          Icyrythm
        </span>
      </header>

      {/* Main content */}
      <div className="flex-col flex h-screen">
        <div className="flex flex-1 h-full">
            {isLoading && (
          <div className="flex-1 flex gap-5 items-center justify-center">
            <SnowflakeIcon className="animate-spin w-10 h-10"/>
            <span className="font-mono text-2xl text-white animate-pulse">
                Icycle is thinking...
            </span>
          </div>
            )}

            {error && !isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <span className="font-mono text-sm text-red-400">{error}</span>
          </div>
            )}

            {data && !isLoading && (
          <>
            <div className="flex flex-col flex-1 min-h-0">
              <Visualizer
                data={data}
              />
            </div>
            <div className="w-72 shrink-0">
              <CodePanel
                code={data.code}
                currentStep={currentStep}
                totalSteps={data.steps.length}
                label={data.steps[currentStep]?.label ?? ""}
              />
            </div>
          </>
            )}
            
            {!data && !isLoading && !error && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <Label className="font-mono text-lg tracking-widest text-white uppercase flex gap-3">
                Welcome to Icycle Agent
                <SnowflakeIcon className="animate-spin "/>
            </Label>
            <span className="font-mono text-lg tracking-widest text-white uppercase">
              Type any algorithm to visualize or search your own
            </span>
            <div className="flex gap-3">
              {["Bubble Sort", "Dijkstra", "Binary Search", "BFS", "AVL Tree"].map((s) => (
                <Button
                  key={s}
                  onClick={() => handleSearch(s)}
                  className="font-mono cursor-pointer text-base text-white border border-white/10 px-5 py-5 hover:text-white/60 hover:border-white/20 transition-colors"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
            )}

        </div>
        <div className="h-[100px]">
            <SearchBox onSearch={handleSearch} isLoading={isLoading}/>
        </div>
      </div>
    </div>
  )
}