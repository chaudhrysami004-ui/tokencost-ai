"use client";

import { useState } from "react";
import Link from "next/link";
import { Database, Layers, ArrowRight, Sparkles, Calculator, Scissors, Check, Cpu } from "lucide-react";

interface EmbeddingModel {
  name: string;
  provider: string;
  costPerMillion: number;
  dimensions: number;
}

const EMBEDDING_MODELS: EmbeddingModel[] = [
  { name: "text-embedding-3-small", provider: "OpenAI", costPerMillion: 0.02, dimensions: 1536 },
  { name: "text-embedding-3-large", provider: "OpenAI", costPerMillion: 0.13, dimensions: 3072 },
  { name: "embed-english-v3.0", provider: "Cohere", costPerMillion: 0.10, dimensions: 1024 },
  { name: "text-embedding-004", provider: "Google", costPerMillion: 0.025, dimensions: 768 },
];

export default function RagEstimator() {
  const [docText, setDocText] = useState("");
  const [totalWordCount, setTotalWordCount] = useState<number>(50000);
  const [chunkSize, setChunkSize] = useState<number>(512);
  const [chunkOverlap, setChunkOverlap] = useState<number>(50);

  // Auto count words if text is pasted
  const handleTextChange = (text: string) => {
    setDocText(text);
    if (text.trim().length > 0) {
      const words = text.trim().split(/\s+/).length;
      setTotalWordCount(words);
    }
  };

  // 1 word ~= 1.33 tokens
  const estimatedTotalTokens = Math.ceil(totalWordCount * 1.33);

  // Effective step size per chunk
  const stepSize = Math.max(1, chunkSize - chunkOverlap);
  const totalChunks = Math.ceil(estimatedTotalTokens / stepSize);

  // Storage estimation: Each vector float32 = 4 bytes per dimension
  // Rough vector index size for text-embedding-3-small (1536 dims)
  const vectorStorageMB = ((totalChunks * 1536 * 4) / (1024 * 1024)).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Database size={13} /> Vector Architecture & RAG Planner
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          RAG Chunk & <span className="glow-gradient">Vector Embedding</span> Estimator
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Calculate optimal document chunking, total vector database payload, and embedding API charges before deploying Retrieval-Augmented Generation workflows.
        </p>
      </div>

      {/* Metrics Top Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="tool-card p-4 rounded-xl border border-white/10">
          <div className="text-slate-400 text-xs font-mono">Total Tokens (Raw)</div>
          <div className="text-2xl font-bold text-white mt-1">{estimatedTotalTokens.toLocaleString()}</div>
        </div>
        <div className="tool-card p-4 rounded-xl border border-white/10">
          <div className="text-slate-400 text-xs font-mono">Generated Chunks</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{totalChunks.toLocaleString()}</div>
        </div>
        <div className="tool-card p-4 rounded-xl border border-white/10">
          <div className="text-slate-400 text-xs font-mono">Index Vector Size</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">~{vectorStorageMB} MB</div>
        </div>
        <div className="tool-card p-4 rounded-xl border border-white/10">
          <div className="text-slate-400 text-xs font-mono">Base Embedding Cost</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">
            ${((estimatedTotalTokens / 1_000_000) * 0.02).toFixed(4)}
          </div>
        </div>
      </div>

      {/* Sliders & Vector Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Settings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="tool-card p-6 rounded-2xl border border-white/10 space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers size={18} className="text-cyan-400" /> Pipeline Parameters
            </h2>

            {/* Paste Sample */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Paste Corpus / Text (Optional Auto-Word Count):
              </label>
              <textarea
                rows={3}
                value={docText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Paste raw documentation, PDF text, or markdown to estimate scale..."
                className="w-full bg-[#0A0D12] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-none"
              />
            </div>

            {/* Document Word Count */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Total Words in Knowledge Base</span>
                <span className="text-cyan-400 font-mono font-bold">{totalWordCount.toLocaleString()} words</span>
              </div>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="5000"
                value={totalWordCount}
                onChange={(e) => setTotalWordCount(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Target Chunk Size */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Chunk Size (Target Tokens)</span>
                <span className="text-blue-400 font-mono font-bold">{chunkSize} tokens</span>
              </div>
              <input
                type="range"
                min="128"
                max="2048"
                step="64"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Recommended: 256–512 for accurate semantic retrieval</span>
            </div>

            {/* Chunk Overlap */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Chunk Overlap (Context Window Stitching)</span>
                <span className="text-purple-400 font-mono font-bold">{chunkOverlap} tokens</span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.floor(chunkSize / 2)}
                step="10"
                value={chunkOverlap}
                onChange={(e) => setChunkOverlap(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Related Link */}
            <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
              <Link href="/prompt-compressor" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <Scissors size={13} /> Need to compress retrieved system context?
              </Link>
            </div>
          </div>
        </div>

        {/* Right Embedding Models Table */}
        <div className="lg:col-span-7">
          <div className="tool-card rounded-2xl overflow-hidden border border-white/10">
            <div className="p-4 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Database size={16} className="text-cyan-400" /> Embedding API Pricing Matrix
              </h2>
              <span className="text-xs font-mono text-slate-400">One-Time Ingestion Cost</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-mono text-slate-400 bg-black/20">
                    <th className="p-3.5">Embedding Model</th>
                    <th className="p-3.5">Dimensions</th>
                    <th className="p-3.5">Price / 1M Tokens</th>
                    <th className="p-3.5 text-right">Total Ingestion Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {EMBEDDING_MODELS.map((model) => {
                    const cost = (estimatedTotalTokens / 1_000_000) * model.costPerMillion;
                    return (
                      <tr key={model.name} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-white">{model.name}</div>
                          <span className="text-[10px] text-slate-500 font-mono">{model.provider}</span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-400">{model.dimensions} dims</td>
                        <td className="p-3.5 font-mono text-slate-400">${model.costPerMillion.toFixed(3)}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-cyan-400">
                          ${cost < 0.0001 ? cost.toFixed(6) : cost.toFixed(4)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-black/20 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-slate-400">Plan to query this index with LLMs?</span>
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                Estimate Inference on Calculator <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* SEO Explanatory Guide */}
      <section className="tool-card p-8 rounded-2xl space-y-6 text-slate-300 text-sm leading-relaxed border border-white/10">
        <h2 className="text-xl font-bold text-white">How to Optimize Chunk Sizes in RAG Architectures</h2>
        <p>
          Retrieval-Augmented Generation relies on splitting large enterprise knowledge bases into digestible chunks before creating semantic embeddings. Selecting the right chunk parameters directly dictates response accuracy and query overhead.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
            <h3 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">Small Chunks (128–256 tokens)</h3>
            <p className="text-xs text-slate-400">Yield precise vector similarity scores for single-fact lookups, but risk losing global context across extended narratives.</p>
          </div>
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
            <h3 className="font-bold text-blue-400 text-xs uppercase tracking-wider">Balanced Chunks (512 tokens)</h3>
            <p className="text-xs text-slate-400">The industry standard for documentation, technical manuals, and multi-paragraph retrieval with minimal noise.</p>
          </div>
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
            <h3 className="font-bold text-purple-400 text-xs uppercase tracking-wider">Chunk Overlap (10–15%)</h3>
            <p className="text-xs text-slate-400">Ensures critical contextual links are not clipped midway through sentences during boundary splits.</p>
          </div>
        </div>
      </section>

    </div>
  );
}