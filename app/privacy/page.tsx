import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | TokenCost AI",
  description: "Privacy Policy for TokenCost AI visitors and users.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <ShieldCheck size={13} /> Legal & Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="tool-card p-8 rounded-2xl border border-white/10 space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
          <p>
            TokenCost AI operates as a client-side calculation utility. Any prompt text, characters, or figures you enter into our calculators remain strictly within your device's browser memory and are never transmitted, stored, or processed on our backend servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Log Files & Analytics</h2>
          <p>
            Like most standard web servers, we may log anonymous visitor metadata including internet protocol (IP) addresses, browser type, referring pages, and date/time stamps to analyze traffic trends and maintain security.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Cookies & Advertising Partners</h2>
          <p>
            We partner with third-party advertising vendors (such as Google AdSense). These vendors use cookies (such as the DoubleClick DART cookie) to serve relevant advertisements based on your visits to this and other websites across the Internet. You may opt out of personalized advertising by visiting Google Ad Settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy, you can reach out via our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}