"use client";

import { Truck, Shield, RotateCcw, Headphones, BadgeCheck } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const trustItems = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above ₹499",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "15-day return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated help center",
  },
  {
    icon: BadgeCheck,
    title: "Authentic Products",
    description: "Verified brands only",
  },
];

export default function TrustBar() {
  return (
    <section className="py-8 md:py-12 bg-white relative z-0 border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 md:divide-x md:divide-[#E5E5E5]">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 md:justify-center md:px-4 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F8F8F8] flex items-center justify-center shrink-0 group-hover:bg-[#0A0A0A] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#525252] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A0A0A]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
