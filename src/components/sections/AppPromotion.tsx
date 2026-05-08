"use client";

import Image from "next/image";
import { ArrowRight, Smartphone, ShieldCheck, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function AppPromotion() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-premium">
        <div className="bg-[#111111] rounded-[48px] overflow-hidden relative min-h-[600px] flex items-center">
          {/* Cinematic Background Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#222,transparent)] opacity-40" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#DC2626]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 w-full px-8 md:px-16 lg:px-24 py-20">
            {/* Content Area */}
            <div className="max-w-xl">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-black text-white/60 uppercase tracking-[0.3em]">
                    The Ecosystem in your pocket
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-8">
                  Retail <span className="text-[#DC2626]">Synchronized.</span>
                </h2>
                
                <p className="text-lg text-white/50 mb-12 leading-relaxed font-medium">
                  Experience zero-latency shopping, real-time inventory tracking, and exclusive app-only drops. Engineered for the modern retail visionary.
                </p>

                <div className="grid grid-cols-2 gap-8 mb-16">
                  {[
                    { label: "App-Only Drops", icon: Zap },
                    { label: "Express Tracking", icon: Star },
                    { label: "Secure Auth", icon: ShieldCheck },
                    { label: "Priority fulfillment", icon: ArrowRight },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <f.icon className="w-4 h-4 text-[#DC2626]" />
                       <span className="text-xs font-bold text-white uppercase tracking-widest">{f.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <button className="h-16 px-10 bg-white text-black rounded-2xl flex items-center gap-4 hover:bg-gray-200 transition-all group">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="App Store" width={20} height={20} className="grayscale" />
                    <div className="text-left">
                       <p className="text-[9px] font-black uppercase leading-none opacity-40">Available on</p>
                       <p className="text-sm font-black uppercase tracking-widest">App Store</p>
                    </div>
                  </button>
                  <button className="h-16 px-10 border border-white/20 text-white rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all">
                    <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                       <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                    <div className="text-left">
                       <p className="text-[9px] font-black uppercase leading-none opacity-40">Coming Soon</p>
                       <p className="text-sm font-black uppercase tracking-widest">Google Play</p>
                    </div>
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Visual Teaser */}
            <div className="relative hidden lg:flex items-center justify-center">
               <motion.div
                 initial={{ opacity: 0, y: 100, rotate: 5 }}
                 whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                 transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                 className="relative w-[300px] h-[600px] bg-[#1A1A1A] rounded-[48px] border-[8px] border-[#333] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
               >
                  <div className="absolute inset-0 bg-[#0A0A0A] p-6 flex flex-col gap-6">
                     <div className="h-4 w-1/3 bg-white/10 rounded-full" />
                     <div className="aspect-square bg-white/5 rounded-[24px] border border-white/5 shimmer" />
                     <div className="h-20 bg-white/5 rounded-[20px] border border-white/5" />
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-white/5 rounded-[20px]" />
                        <div className="h-32 bg-white/5 rounded-[20px]" />
                     </div>
                  </div>
                  {/* Dynamic Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-8 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                     <span>ShopEverse V2.0</span>
                     <span>Live Status</span>
                  </div>
               </motion.div>
               {/* Floating elements */}
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -right-10 top-20 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl"
               >
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-emerald-400" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-white/40">Real-time Sync</p>
                        <p className="text-sm font-bold text-white">Inventory Updated</p>
                     </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
