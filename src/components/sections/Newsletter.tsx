"use client";

import { Send, ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function Newsletter() {
  return (
    <section className="section-padding bg-[#F8F8F8] overflow-hidden">
      <div className="container-premium">
        <div className="bg-[#111111] rounded-[48px] overflow-hidden relative min-h-[500px] flex items-center">
          {/* Editorial Background Image (Faded) */}
          <div className="absolute inset-0 z-0">
             <Image 
               src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
               alt="Lifestyle" 
               fill 
               className="object-cover opacity-20 grayscale"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent" />
          </div>

          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="w-5 h-5 text-[#DC2626]" />
                    <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">
                      The Editorial List
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
                    Curated <span className="text-[#DC2626]">Intelligence.</span><br />
                    Delivered Weekly.
                  </h2>
                  
                  <p className="text-lg text-white/50 mb-10 leading-relaxed font-medium">
                    Join over 50,000 retail visionaries receiving exclusive insights, early access to limited drops, and global trend reports.
                  </p>

                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col sm:flex-row gap-4 group"
                  >
                    <div className="relative flex-1">
                      <input
                        type="email"
                        placeholder="Your elite email address"
                        required
                        className="w-full h-16 px-6 bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-2xl focus:outline-none focus:border-[#DC2626]/50 transition-all text-sm font-medium"
                        suppressHydrationWarning={true}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-premium !h-16 !bg-white !text-black hover:!bg-[#DC2626] hover:!text-white shadow-premium"
                    >
                      Initialize Access
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <p className="text-[10px] font-bold text-white/20 mt-6 uppercase tracking-widest">
                    Unsubscribe with a single click. Zero Noise. Pure Signal.
                  </p>
                </div>
              </ScrollReveal>

              <div className="hidden lg:block">
                 <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "New Arrivals", val: "+240" },
                      { label: "Global Trends", val: "Weekly" },
                      { label: "Exclusive Offers", val: "Elite" },
                      { label: "Priority fulfillment", icon: ArrowRight },
                    ].map((item, i) => (
                      <ScrollReveal key={i} delay={0.2 + i * 0.1}>
                        <div className="p-8 rounded-[32px] border border-white/5 bg-white/5 backdrop-blur-sm">
                           <p className="text-[10px] font-black text-[#DC2626] uppercase tracking-widest mb-2">{item.label}</p>
                           <p className="text-2xl font-black text-white">{item.val || "Active"}</p>
                        </div>
                      </ScrollReveal>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
