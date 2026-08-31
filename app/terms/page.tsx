import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | TokenCost AI",
  description: "Terms and Conditions of TokenCost AI.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <FileText size={13} /> Terms & Conditions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="tool-card p-8 rounded-2xl border border-white/10 space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using TokenCost AI, you agree to comply with and be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Disclaimer of Financial Liability</h2>
          <p>
            The calculations, pricing data, and token estimates provided on this site are for informational and planning purposes only. AI vendors may adjust per-token pricing, batch rates, or cache tiers without prior notice. Always verify official billing documentation with your API provider.
          </p>
        </section>
      </div>
    </div>
  );
}