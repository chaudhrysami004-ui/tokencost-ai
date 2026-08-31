import { Info, Cpu, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "About Us | TokenCost AI",
  description: "Learn about TokenCost AI mission, accuracy, and developer analytics.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-10 text-slate-300">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Info size={13} /> Maison of Data & Analytics
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About TokenCost AI</h1>
        <p className="text-sm sm:text-base leading-relaxed text-slate-400">
          TokenCost AI is an independent developer platform built to provide real-time, transparent cost forecasting for Large Language Model (LLM) APIs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="tool-card p-6 rounded-2xl border border-white/10 space-y-2">
          <Cpu className="text-cyan-400" size={24} />
          <h3 className="text-white font-bold text-sm">Real-Time Data</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Continuously updated pricing tables tracking official OpenAI, Anthropic, Google, and open-source API pricing changes.
          </p>
        </div>

        <div className="tool-card p-6 rounded-2xl border border-white/10 space-y-2">
          <Zap className="text-blue-400" size={24} />
          <h3 className="text-white font-bold text-sm">Client-Side Speed</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zero telemetry tracking on your prompt text. All token count parsing and pricing mathematics happen purely inside your browser.
          </p>
        </div>

        <div className="tool-card p-6 rounded-2xl border border-white/10 space-y-2">
          <ShieldCheck className="text-purple-400" size={24} />
          <h3 className="text-white font-bold text-sm">Budget Precision</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Helping startups, engineering teams, and indie hackers forecast monthly AI infrastructure expenses before shipping to production.
          </p>
        </div>
      </div>
    </div>
  );
}