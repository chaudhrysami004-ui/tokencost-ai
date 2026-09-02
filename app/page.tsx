"use client";

import { useState } from "react";
import { Calculator, Sparkles, DollarSign, Zap, ArrowUpDown, Layers, Bot, Code2, PenTool } from "lucide-react";
import { OpenAIIcon, AnthropicIcon, GoogleIcon, MetaIcon, MistralIcon } from "./components/ProviderIcons";

interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputPerMillion: number;  // In USD
  outputPerMillion: number; // In USD
  contextWindow: string;
}

const AI_MODELS: ModelPricing[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", inputPerMillion: 2.50, outputPerMillion: 10.00, contextWindow: "128k" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", inputPerMillion: 0.15, outputPerMillion: 0.60, contextWindow: "128k" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", inputPerMillion: 3.00, outputPerMillion: 15.00, contextWindow: "200k" },
  { id: "claude-3-5-haiku", name: "Claude 3.5 Haiku", provider: "Anthropic", inputPerMillion: 0.80, outputPerMillion: 4.00, contextWindow: "200k" },
  { id: "gemini-1-5-flash", name: "Gemini 1.5 Flash", provider: "Google", inputPerMillion: 0.075, outputPerMillion: 0.30, contextWindow: "1M" },
  { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", provider: "Google", inputPerMillion: 1.25, outputPerMillion: 5.00, contextWindow: "2M" },
  { id: "llama-3-3-70b", name: "Llama 3.3 70B (Groq)", provider: "Meta", inputPerMillion: 0.59, outputPerMillion: 0.79, contextWindow: "128k" },
  { id: "mistral-large-2", name: "Mistral Large 2", provider: "Mistral AI", inputPerMillion: 2.00, outputPerMillion: 6.00, contextWindow: "128k" },
];

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [promptTokens, setPromptTokens] = useState<number>(1500);
  const [completionTokens, setCompletionTokens] = useState<number>(500);
  const [requestsPerMonth, setRequestsPerMonth] = useState<number>(10000);

  const applyPreset = (prompt: number, completion: number, reqs: number) => {
    setPromptTokens(prompt);
    setCompletionTokens(completion);
    setRequestsPerMonth(reqs);
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
    if (text.length > 0) {
      const estimated = Math.ceil(text.length / 4);
      setPromptTokens(estimated);
    }
  };

  const calculateCost = (model: ModelPricing) => {
    const singleInputCost = (promptTokens / 1_000_000) * model.inputPerMillion;
    const singleOutputCost = (completionTokens / 1_000_000) * model.outputPerMillion;
    const singleRequestTotal = singleInputCost + singleOutputCost;
    const monthlyTotal = singleRequestTotal * requestsPerMonth;

    return {
      perCall: singleRequestTotal,
      monthly: monthlyTotal,
    };
  };

  const renderProviderIcon = (provider: string) => {
    switch (provider) {
      case "OpenAI":
        return <OpenAIIcon className="w-4 h-4 text-white shrink-0" />;
      case "Anthropic":
        return <AnthropicIcon className="w-4 h-4 shrink-0" />;
      case "Google":
        return <GoogleIcon className="w-4 h-4 shrink-0" />;
      case "Meta":
        return <MetaIcon className="w-4 h-4 shrink-0" />;
      case "Mistral AI":
        return <MistralIcon className="w-4 h-4 shrink-0" />;
      default:
        return <Zap className="w-4 h-4 text-cyan-400 shrink-0" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Zap size={13} /> Updated with 2026 Token Pricing & Models
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          AI Model API <span className="glow-gradient">Token & Cost</span> Calculator
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Compare API costs across OpenAI, Anthropic, Google, and open-source models. Estimate real-time expenditure per request and monthly production scale.
        </p>
      </div>

      {/* Top Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="tool-card p-6 rounded-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Calculator size={18} className="text-cyan-400" /> Token Parameters
              </h2>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Quick Presets:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => applyPreset(400, 200, 25000)}
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-[11px] font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Bot size={12} /> Chatbot
                </button>
                <button
                  onClick={() => applyPreset(3500, 800, 5000)}
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 text-[11px] font-medium text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <Code2 size={12} /> Code Review
                </button>
                <button
                  onClick={() => applyPreset(1200, 1500, 2000)}
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-[11px] font-medium text-slate-300 hover:text-purple-400 transition-colors"
                >
                  <PenTool size={12} /> Long Form
                </button>
              </div>
            </div>

            {/* Live Text to Token Estimator */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Paste Sample Prompt (Optional Auto-Count):
              </label>
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Paste your prompt text here to calculate exact token count..."
                className="w-full bg-[#0A0D12] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Prompt Tokens Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Input Prompt Tokens</span>
                <span className="text-cyan-400 font-mono font-bold">{promptTokens.toLocaleString()} tokens</span>
              </div>
              <input
                type="range"
                min="50"
                max="50000"
                step="50"
                value={promptTokens}
                onChange={(e) => setPromptTokens(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Completion Tokens Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Output Completion Tokens</span>
                <span className="text-blue-400 font-mono font-bold">{completionTokens.toLocaleString()} tokens</span>
              </div>
              <input
                type="range"
                min="50"
                max="10000"
                step="50"
                value={completionTokens}
                onChange={(e) => setCompletionTokens(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            {/* Monthly Calls Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Monthly API Requests</span>
                <span className="text-purple-400 font-mono font-bold">{requestsPerMonth.toLocaleString()} req/mo</span>
              </div>
              <input
                type="range"
                min="500"
                max="500000"
                step="500"
                value={requestsPerMonth}
                onChange={(e) => setRequestsPerMonth(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Pricing Comparison Table */}
        <div className="lg:col-span-7">
          <div className="tool-card rounded-2xl overflow-hidden border border-white/10">
            <div className="p-4 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers size={16} className="text-cyan-400" /> Real-Time Cost Matrix
              </h2>
              <span className="text-xs font-mono text-slate-400">USD ($) Pricing</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-mono text-slate-400 bg-black/20">
                    <th className="p-3.5">Model</th>
                    <th className="p-3.5">Provider</th>
                    <th className="p-3.5">Cost / Request</th>
                    <th className="p-3.5 text-right">Est. Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {AI_MODELS.map((model) => {
                    const cost = calculateCost(model);
                    return (
                      <tr key={model.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            {renderProviderIcon(model.provider)}
                            <div>
                              <div className="font-bold text-white">{model.name}</div>
                              <span className="text-[10px] font-normal text-slate-500 font-mono">
                                {model.contextWindow} ctx
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-400 font-mono">{model.provider}</td>
                        <td className="p-3.5 font-mono text-cyan-400 font-medium">
                          ${cost.perCall < 0.0001 ? cost.perCall.toFixed(6) : cost.perCall.toFixed(4)}
                        </td>
                        <td className="p-3.5 text-right font-mono font-bold text-white">
                          ${cost.monthly.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* SEO Explanatory Guide Section */}
      <section className="tool-card p-8 rounded-2xl space-y-6 text-slate-300 text-sm leading-relaxed border border-white/10">
        <h2 className="text-xl font-bold text-white">How AI Model Token Pricing Works</h2>
        <p>
          Large Language Model APIs charge based on the total number of <strong>Input Tokens</strong> (the system instruction and prompt you send) and <strong>Output Tokens</strong> (the generated completion returned by the model).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
            <h3 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">What is a Token?</h3>
            <p className="text-xs text-slate-400">1,000 tokens equal approximately 750 English words. Output tokens require higher compute and typically cost 3x to 4x more than input tokens.</p>
          </div>
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
            <h3 className="font-bold text-blue-400 text-xs uppercase tracking-wider">Flash vs Frontier</h3>
            <p className="text-xs text-slate-400">Models like Gemini 1.5 Flash and GPT-4o Mini offer sub-dollar per million token rates, ideal for high-volume automated workflows.</p>
          </div>
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
            <h3 className="font-bold text-purple-400 text-xs uppercase tracking-wider">Cost Optimization</h3>
            <p className="text-xs text-slate-400">Implementing semantic caching, concise system prompts, and structured output formatting directly reduces monthly token overhead.</p>
          </div>
        </div>
      </section>

    </div>
  );
}