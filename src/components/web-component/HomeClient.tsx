"use client";
import { useRouter } from "next/navigation";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { AlgorithmResponse } from "@/src/types/schema";
import { SnowflakeIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const HomePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: query }),
      });
      const data = await result.json();
      if (data.success) {
        const id = data.data[0].id;
        router.push(`/algorithm/${id}`);
      } else {
        setError(data.message);
      }
    } finally {
      setIsLoading(false);
      setIsDone(true);
    }
  };

  return (
    <div
      className="flex flex-col bg-foreground text-white overflow-hidden h-screen w-screen"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Main content */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Content area */}
        <div className="flex flex-1 min-h-0">
          {isLoading && (
            <div className="flex-1 flex gap-5 items-center justify-center items-center">
              <video
                src="/Video Project.mp4"
                height={200}
                width={200}
                autoPlay
                loop
                muted
                style={{
                  mixBlendMode: "lighten",
                }}
              />
              <span className="font-mono text-2xl text-white animate-pulse">
                Icycle is thinking...
              </span>
            </div>
          )}
          {isDone && (
            <div className="flex-1 flex gap-5 items-center justify-center items-center">
              <SnowflakeIcon className="text-white w-10 h-10 animate-spin" />
              <span className="font-mono text-2xl text-white animate-pulse">
                Found It!
              </span>
            </div>
          )}

          {error && (
            <div className="flex-1 flex items-center justify-center">
              <span className="font-mono text-sm text-red-400">{error}</span>
            </div>
          )}

          {!isLoading && !error && !isDone && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <Label className="font-mono text-lg tracking-widest text-white uppercase flex gap-3">
                Welcome to Icycle Agent
                <SnowflakeIcon className="animate-spin" />
              </Label>
              <span className="font-mono text-lg tracking-widest text-white uppercase">
                Type any algorithm to visualize or search your own
              </span>
              <div className="flex gap-3">
                {[
                  "Bubble Sort",
                  "Dijkstra",
                  "Binary Search",
                  "BFS",
                  "AVL Tree",
                ].map((s) => (
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
        <div className="h-[70px] shrink-0 border-1 border-white/10 ">
          <SearchBox onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
