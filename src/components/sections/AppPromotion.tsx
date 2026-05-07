"use client";

import Image from "next/image";
import { CheckCircle2, Smartphone } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const features = [
  "Exclusive app-only discounts and offers",
  "Real-time order tracking and notifications",
  "Faster checkout with saved payment methods",
  "Early access to upcoming sales",
];

export default function AppPromotion() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#F4F4F5] overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-[#E5E5E5] shadow-xl shadow-black/[0.02]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Content */}
            <div className="p-8 md:p-16 lg:pr-0">
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider">
                    ShopEverse App
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tight leading-tight mb-4">
                  Shop faster and better with our mobile app
                </h2>
                <p className="text-[#525252] mb-8 max-w-md">
                  Download the ShopEverse app to enjoy a seamless shopping
                  experience, exclusive deals, and much more.
                </p>

                <ul className="space-y-3 mb-10">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0A0A0A] shrink-0 mt-0.5" />
                      <span className="text-[#525252]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl hover:bg-[#333333] transition-colors flex items-center gap-2"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] leading-none text-white/80">
                          Download on the
                        </span>
                        <span className="text-sm font-bold leading-tight">
                          App Store
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl hover:bg-[#333333] transition-colors flex items-center gap-2"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] leading-none text-white/80">
                          GET IT ON
                        </span>
                        <span className="text-sm font-bold leading-tight">
                          Google Play
                        </span>
                      </div>
                    </a>
                  </div>
                  
                  {/* QR Code Placeholder */}
                  <div className="hidden sm:flex items-center gap-4 pl-6 border-l border-[#E5E5E5]">
                    <div className="w-20 h-20 bg-white rounded-lg border border-[#E5E5E5] p-2 flex items-center justify-center">
                      <div className="w-full h-full bg-[#F3F4F6] border border-dashed border-[#D1D1D1] rounded flex items-center justify-center text-xs text-[#9CA3AF] text-center">
                        QR Code
                      </div>
                    </div>
                    <p className="text-xs text-[#525252] max-w-[100px]">
                      Scan to download app
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Image mockups */}
            <div className="relative h-[400px] lg:h-[600px] hidden md:block">
              <ScrollReveal direction="left" delay={0.2} className="w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[580px] bg-white rounded-[40px] border-8 border-[#0A0A0A] shadow-2xl overflow-hidden z-20 translate-x-8">
                  <div className="w-full h-full bg-[#F8F8F8] p-4 flex flex-col">
                    <div className="h-6 w-1/3 bg-[#E5E5E5] rounded mx-auto mb-4" />
                    <div className="h-32 bg-[#E5E5E5] rounded-xl mb-4" />
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="h-40 bg-[#E5E5E5] rounded-xl" />
                      <div className="h-40 bg-[#E5E5E5] rounded-xl" />
                    </div>
                    <div className="h-20 bg-[#E5E5E5] rounded-xl" />
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[540px] bg-white rounded-[36px] border-8 border-[#E5E5E5] shadow-xl overflow-hidden z-10 -translate-x-32 rotate-[-5deg] opacity-70">
                   <div className="w-full h-full bg-[#F3F4F6]" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
