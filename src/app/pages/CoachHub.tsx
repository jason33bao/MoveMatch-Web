import { useState } from "react";
import { ArrowLeft, Brain, ChevronRight, Users } from "lucide-react";
import { AICoaching } from "./AICoaching";
import { Coaches } from "./Coaches";

type CoachTab = "ai" | "human";

export function CoachHub() {
  const [activeTab, setActiveTab] = useState<CoachTab | null>(null);

  if (activeTab === "ai") {
    return (
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-3 md:px-6 pt-3 md:pt-4">
          <div className="bg-white border border-gray-100 rounded-2xl px-3 py-2.5 flex items-center justify-between shadow-sm">
            <button
              onClick={() => setActiveTab(null)}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <h1 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1rem" }}>
              AI Coach
            </h1>
            <div className="w-9 h-9" />
          </div>
        </div>
        <AICoaching />
      </div>
    );
  }

  if (activeTab === "human") {
    return (
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-3 md:px-6 pt-3 md:pt-4">
          <div className="bg-white border border-gray-100 rounded-2xl px-3 py-2.5 flex items-center justify-between shadow-sm">
            <button
              onClick={() => setActiveTab(null)}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <h1 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1rem" }}>
              Coaches
            </h1>
            <div className="w-9 h-9" />
          </div>
        </div>
        <Coaches />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8 pb-28 md:pb-10">
        <div className="mb-5 md:mb-7">
          <h1 className="text-gray-900 leading-tight" style={{ fontWeight: 800, fontSize: "2.05rem" }}>
            Choose your
            <br />
            coaching mode
          </h1>
          <p className="text-gray-500 mt-2" style={{ fontSize: "0.95rem", maxWidth: 580 }}>
            Pick AI-powered analysis or browse traditional coaches and book sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <button
            onClick={() => setActiveTab("ai")}
            className="text-left p-6 md:p-7 rounded-[28px] bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-white shadow-lg shadow-cyan-200/60 hover:-translate-y-0.5 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
              <Brain className="w-6 h-6" />
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "2rem", lineHeight: 1.05 }}>AI Coach</h2>
            <p className="mt-3 max-w-md text-white/95" style={{ fontSize: "1.12rem", fontWeight: 600, lineHeight: 1.45 }}>
              Upload your own video and get motion analysis, benchmarks, and drill suggestions.
            </p>
            <div className="mt-8 flex items-center justify-between">
              <span style={{ fontWeight: 800, fontSize: "1.15rem" }}>Open</span>
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>

          <button
            onClick={() => setActiveTab("human")}
            className="text-left p-6 md:p-7 rounded-[28px] bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500 text-white shadow-lg shadow-orange-200/60 hover:-translate-y-0.5 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "2rem", lineHeight: 1.05 }}>
              Traditional Manual Coach
            </h2>
            <p className="mt-3 max-w-md text-white/95" style={{ fontSize: "1.12rem", fontWeight: 600, lineHeight: 1.45 }}>
              Browse verified coaches, compare expertise, and book 1-on-1 or group sessions.
            </p>
            <div className="mt-8 flex items-center justify-between">
              <span style={{ fontWeight: 800, fontSize: "1.15rem" }}>Open</span>
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
