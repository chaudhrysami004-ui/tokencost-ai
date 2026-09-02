import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, Calculator, ShieldCheck, FileText, Info, Mail } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://tokencost-ai.vercel.app"),
  title: "TokenCost AI | AI Model Token & Cost Calculator",
  description: "Calculate real-time API pricing and token costs for GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and Llama 3 models.",
  verification: {
    google: "l1uSORWyximFY0Dw2MPT0ay36kj5g3OoNyvprtWCf1g",
  },
  openGraph: {
    title: "TokenCost AI | Real-Time LLM Token & Cost Calculator",
    description: "Compare API costs across OpenAI, Anthropic, Google, and open-weight models in real time.",
    url: "https://tokencost-ai.vercel.app",
    siteName: "TokenCost AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokenCost AI Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokenCost AI | AI Model Token & Cost Calculator",
    description: "Compare API costs across major LLM providers in real time.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between">
        
        {/* Navigation */}
        <header className="border-b border-white/10 bg-[#0A0D12]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Cpu size={20} />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-white">TokenCost</span>
                <span className="text-cyan-400 font-mono text-xs ml-1">.AI</span>
              </div>
            </Link>

            <nav className="flex items-center gap-6 text-xs font-medium text-slate-400">
              <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <Calculator size={14} /> Calculator
              </Link>
              <Link href="/about" className="hover:text-cyan-400 transition-colors hidden sm:inline">About</Link>
              <Link href="/privacy" className="hover:text-cyan-400 transition-colors hidden sm:inline">Privacy Policy</Link>
            </nav>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#07090D] py-12 text-slate-500 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-slate-300 font-bold mb-1">TokenCost AI</p>
              <p>© 2026 TokenCost AI. Independent pricing analytics for developers.</p>
            </div>
            <div className="flex flex-wrap gap-6 text-slate-400">
              <Link href="/about" className="hover:text-cyan-400 flex items-center gap-1"><Info size={12} /> About</Link>
              <Link href="/privacy" className="hover:text-cyan-400 flex items-center gap-1"><ShieldCheck size={12} /> Privacy Policy</Link>
              <Link href="/terms" className="hover:text-cyan-400 flex items-center gap-1"><FileText size={12} /> Terms</Link>
              <Link href="/contact" className="hover:text-cyan-400 flex items-center gap-1"><Mail size={12} /> Contact</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}