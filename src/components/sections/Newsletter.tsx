"use client";

import { Send } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function Newsletter() {
  return (
    <section className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/5 rotate-12 blur-3xl rounded-full" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[150%] bg-white/5 -rotate-12 blur-3xl rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Join the inner circle
          </h2>
          <p className="text-white/70 mb-10 max-w-xl mx-auto text-sm md:text-base">
            Subscribe to our newsletter and be the first to know about exclusive
            offers, new product launches, and shopping trends.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row max-w-md mx-auto gap-3"
          >
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                suppressHydrationWarning
                className="w-full h-12 px-5 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-xl focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-8 bg-white text-[#0A0A0A] font-semibold rounded-xl hover:bg-[#F3F4F6] transition-colors flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              Subscribe
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>

          <p className="text-xs text-white/40 mt-6">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
            You can unsubscribe at any time.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
