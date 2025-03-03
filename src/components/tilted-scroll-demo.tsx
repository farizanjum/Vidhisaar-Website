
import { TiltedScroll } from "@/components/ui/tilted-scroll"

export function TiltedScrollDemo() {
  const customItems = [
    { id: "1", text: "AI Legal Research – Retrieves and explains case laws with multi-agent AI." },
    { id: "2", text: "Blockchain Verification – Ensures on-chain trust and transparency." },
    { id: "3", text: "Bias-Free AI – Uses xAI for fairness and accountability." },
    { id: "4", text: "Chat & Document Analysis – Supports text, voice, and PDF queries." },
    { id: "5", text: "Smart Contracts – Automates legal agreement validation." },
  ]

  return (
    <div className="space-y-8 text-white">
      <TiltedScroll 
        items={customItems}
        className="mt-8"
      />
    </div>
  )
}
