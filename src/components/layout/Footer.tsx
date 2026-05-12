"use client";

import { ChevronUp, Smartphone, ShieldCheck, Zap, ArrowRight, Globe, Mail, MessageCircle, Share2 } from "lucide-react";
import { SITE_NAME, FOOTER_LINKS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] text-white">
      {/* ━━━ 1. BACK TO TOP (Sleek Authority) ━━━ */}
      <button
        onClick={scrollToTop}
        className="w-full py-6 bg-white/5 hover:bg-white/10 transition-all text-[11px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center justify-center gap-3 border-b border-white/5 group"
      >
        <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        Return to Elevation
      </button>

      {/* ━━━ 2. PRIMARY FOOTER CONTENT ━━━ */}
      <div className="container-premium py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand Vision */}
          <div className="lg:col-span-4 space-y-10 lg:pr-20">
             <Link href="/">
                <h2 className="text-4xl font-black tracking-tighter">
                  Shop<span className="text-[#DC2626]">Everse</span>
                </h2>
             </Link>
             <p className="text-base text-[#777777] font-medium leading-relaxed">
                Defining the future of retail through engineering excellence and luxury curation. We don't just sell products; we deliver a premium standard of life.
             </p>
             <div className="flex gap-4">
                {[Globe, Mail, MessageCircle, Share2].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
             </div>
          </div>

          {/* Quick Links (Simplified Hierarchy) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-12">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="space-y-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-white">
                  {title}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] text-[#777777] hover:text-white transition-colors font-semibold"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* High-Impact Utility */}
          <div className="lg:col-span-3 space-y-10 bg-white/5 p-10 rounded-[32px] border border-white/10">
             <div className="space-y-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Join the ecosystem</h3>
                <p className="text-xs text-[#777777] leading-relaxed">Early access, limited drops, and member-only pricing.</p>
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full h-14 bg-black border border-white/10 rounded-2xl px-6 text-sm outline-none focus:border-white/30 transition-all pr-12"
                    suppressHydrationWarning={true}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-[#DC2626] hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
             </div>
             
             <div className="pt-8 border-t border-white/10 flex items-center gap-6">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest mb-1">Global Support</span>
                   <span className="text-sm font-bold">support@shopverse.io</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest mb-1">Status</span>
                   <span className="text-sm font-bold text-emerald-500">Operational</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* ━━━ 3. SYSTEM STRIP ━━━ */}
      <div className="bg-black py-12 border-t border-white/5">
        <div className="container-premium flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex flex-col md:flex-row items-center gap-8 text-[11px] font-black tracking-widest text-[#444444] uppercase">
             <span>© 2026 {SITE_NAME} SYSTEMS. EST. 2024.</span>
             <div className="flex gap-8 border-l border-white/10 pl-8">
                <a href="#" className="hover:text-white transition-colors">Security</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Legal</a>
             </div>
          </div>

          <div className="flex items-center gap-10 opacity-30 grayscale group-hover:opacity-60 transition-all duration-700">
             <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={48} height={16} />
             <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={28} height={28} />
             <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={56} height={16} />
             <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" width={48} height={20} className="invert" />
          </div>
        </div>
      </div>
    </footer>
  );
}
