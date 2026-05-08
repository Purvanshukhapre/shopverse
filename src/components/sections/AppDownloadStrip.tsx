"use client";

import { Smartphone, Apple, PlayCircle } from "lucide-react";

export default function AppDownloadStrip() {
  return (
    <section className="py-12 bg-[#0A0A0A]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary/20 to-zinc-900 rounded-[2rem] p-8 md:p-12 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
              <Smartphone className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic">Shop Better with our App</h2>
              <p className="text-zinc-400 text-sm font-medium mt-1">Get exclusive early access to deals, order tracking, and more.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              <Apple className="w-5 h-5" />
              <span>App Store</span>
            </button>
            <button className="flex items-center gap-3 bg-white/10 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/10">
              <PlayCircle className="w-5 h-5" />
              <span>Google Play</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
