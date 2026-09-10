"use client";

import { useState } from "react";
import Link from "next/link";
import { Scissors, ArrowRight, Copy, Check, Sparkles, TrendingDown, DollarSign, Calculator } from "lucide-react";

// Redundant English filler patterns commonly found in prompts
const FILLER_RULES = [
  { pattern: /\b(please|kindly|could you please|would you kindly)\b/gi, replacement: "" },
  { pattern: /\b(in order to|with the aim of)\b/gi, replacement: "to" },
  { pattern: /\b(make sure that you|ensure that you|be sure to)\b/gi, replacement: "ensure" },
  { pattern: /\b(as a matter of fact|in point of fact)\b/gi, replacement: "actually" },
  { pattern: /\b(due to the fact that)\b/gi, replacement: "because" },
  { pattern: /\b(at this point in time)\b/gi, replacement: "now" },
  { pattern: /\b(it is important to note that)\b/gi, replacement: "note:" },
  { pattern: /\b(keep in mind that)\b/gi, replacement: "note:" },
  { pattern: /\b(feel free to)\b/gi, replacement: "" },
  { pattern: /\b(i would like you to)\b/gi, replacement: "" },
  { pattern: /\b(can you please)\b/gi, replacement: "" },
  { pattern: /\s{2,}/g, replacement: " " }, // multiple spaces
];

export default function PromptCompressor() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [compressedPrompt, setCompressedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [stripPunctuation, setStripPunctuation] = useState(false);

  // Approximate tokens: ~4 chars per token
  const countTokens = (text: string) => (text.trim() ? Math.ceil(text.trim().length / 4) : 0);

  const originalTokens = countTokens(inputPrompt);
  const compressedTokens = countTokens(compressedPrompt);
  const tokensSaved = Math.max(0, originalTokens - compressedTokens);
  const percentSaved = originalTokens > 0 ? Math.round((tokensSaved / originalTokens) * 100) : 0;

  // Monthly estimated savings based on $3/1M input tokens (GPT-4o / Claude 3.5 Sonnet range) at 50,000 reqs/month
  const estimatedMonthlySavings = ((tokensSaved * 50000) / 1000000) * 3.0;

  const handleCompress = () => {
    if (!inputPrompt.trim()) return;

    let result = inputPrompt;

    FILLER_RULES.forEach((rule) => {
      result = result.replace(rule.pattern, rule.replacement);
    });

    if (stripPunctuation) {
      result = result.replace(/[^\w\s\n:.-]/gi, "");
    }

    // Clean blank lines and trim edges
    result = result
      .split("\n")
      .map((line) => line.trim())
      .filter((line, i, arr) => line !== "" || (i > 0 && arr[i - 1] !== ""))
      .join("\n")
      .trim();

    setCompressedPrompt(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(compressedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Scissors size={13} /> Token Optimization Engine
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          System Prompt <span className="glow-gradient">Compressor</span> & Token Trimmer
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Remove polite filler, redundant syntax, and whitespace without altering core semantic instructions. Lower API latency and cut monthly LLM invoices.
        </p>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="tool-card p-4 rounded-xl border border-white/10">
          <div className="text-slate-400 text-xs font-mono">Original Tokens</div>
          <div className="text-2xl font-bold text-white mt-1">{originalTokens}</div>
        </div>
        <div className="tool-card p-4 rounded-xl border border-white/10">
          <div className="text-slate-400 text-xs font-mono">Compressed Tokens</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{compressedTokens}</div>
        </div>
        <div className="tool-card p-4 rounded-xl border border-white/10">
          <div className="text-slate-400 text-xs font-mono">Reduction</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingDown size={20} /> {percentSaved}%
          </div>
        </div>
        <div className="tool-card p-4 rounded-xl border border-white/10">
          <div className="text-slate-400 text-xs font-mono">Est. Savings / 50k calls</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">
            ${estimatedMonthlySavings.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Compression Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Box */}
        <div className="tool-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-white">Input Prompt</label>
            <span className="text-xs font-mono text-slate-500">{inputPrompt.length} chars</span>
          </div>
          <textarea
            rows={12}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Paste your verbose system prompt or instructions here (e.g. 'Please make sure that you act as an expert developer and kindly review this code in order to find bugs...')"
            className="w-full bg-[#0A0D12] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-none"
          />
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={stripPunctuation}
                onChange={(e) => setStripPunctuation(e.target.checked)}
                className="rounded bg-slate-800 border-white/20 accent-cyan-500"
              />
              Aggressive stripping (remove cosmetic symbols)
            </label>
            <button
              onClick={handleCompress}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Sparkles size={14} /> Compress Prompt
            </button>
          </div>
        </div>

        {/* Output Box */}
        <div className="tool-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-white">Optimized Prompt</label>
            {compressedPrompt && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy Output"}
              </button>
            )}
          </div>
          <textarea
            rows={12}
            readOnly
            value={compressedPrompt}
            placeholder="Compressed, token-trimmed prompt will generate here..."
            className="w-full bg-[#0A0D12] border border-white/10 rounded-xl p-4 text-xs text-cyan-200 placeholder-slate-600 focus:outline-none font-mono resize-none"
          />
          <div className="pt-2 flex justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Calculator size={13} className="text-cyan-400" /> Calculate your savings on the Cost Matrix <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>

      {/* SEO Explanatory Guide */}
      <section className="tool-card p-8 rounded-2xl space-y-6 text-slate-300 text-sm leading-relaxed border border-white/10">
        <h2 className="text-xl font-bold text-white">Why System Prompt Optimization Matters</h2>
        <p>
          Unlike user inputs which vary per request, <strong>system prompts are sent on every single API call</strong>. A 200-token prompt sent 500,000 times monthly consumes 100 million tokens solely on repetitive static context.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
            <h3 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">Zero Accuracy Loss</h3>
            <p className="text-xs text-slate-400">LLMs do not require conversational politeness. Phrases like "please ensure that you" add attention overhead without improving quality.</p>
          </div>
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
            <h3 className="font-bold text-blue-400 text-xs uppercase tracking-wider">Lower Latency (TTFT)</h3>
            <p className="text-xs text-slate-400">Fewer prompt tokens shorten Time-To-First-Token (TTFT) processing queues on OpenAI, Anthropic, and Groq inference endpoints.</p>
          </div>
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
            <h3 className="font-bold text-purple-400 text-xs uppercase tracking-wider">Compound Cost Reductions</h3>
            <p className="text-xs text-slate-400">Cutting 30% of system prompt weight drops monthly operational expenses linearly across all frontier and open-weight models.</p>
          </div>
        </div>
      </section>

    </div>
  );
}