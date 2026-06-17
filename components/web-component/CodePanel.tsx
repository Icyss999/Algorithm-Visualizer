interface CodePanelProps {
  code: string
  currentStep: number
  totalSteps: number
  label: string
}

export default function CodePanel({ code, label }: CodePanelProps) {
  return (
    <div className="flex flex-col h-full border-l border-white/10">
      <div className="px-4 py-2 border-b border-white/10">
        <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">Code</span>
      </div>
      <pre className="flex-1 overflow-auto p-4 font-mono text-[11px] text-white/70 leading-relaxed">
        {code}
      </pre>
      {label && (
        <div className="px-4 py-2 border-t border-white/10">
          <p className="font-mono text-[10px] text-blue-400">{label}</p>
        </div>
      )}
    </div>
  )
}