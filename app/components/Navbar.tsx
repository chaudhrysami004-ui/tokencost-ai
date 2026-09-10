import Link from "next/link";
import { Calculator, Scissors, Cpu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-[#0A0D12]/80 backdrop-blur-md sticky top-0 z-50 py-3.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-base tracking-tight">
          <Cpu className="text-cyan-400 w-5 h-5" />
          <span>TokenCost<span className="text-cyan-400 font-mono">.AI</span></span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <Link href="/" className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors">
            <Calculator size={14} /> Cost Calculator
          </Link>
          <Link href="/prompt-compressor" className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors">
            <Scissors size={14} /> Prompt Compressor
          </Link>
        </div>
      </div>
    </nav>
  );
}