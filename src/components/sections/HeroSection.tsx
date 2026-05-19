"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, Zap, Globe } from "lucide-react";
import { heroSlides } from "@/data/banners";

const INSIGHT_CARDS = [
  { title: "Limited Drops",  desc: "Premium releases only",  icon: Sparkles,   color: "text-amber-500",   bg: "bg-amber-50"   },
  { title: "Market Trends",  desc: "Top global analytics",   icon: TrendingUp,  color: "text-blue-500",    bg: "bg-blue-50"    },
  { title: "Flash Access",   desc: "Early member perks",     icon: Zap,         color: "text-red-500",     bg: "bg-red-50"     },
  { title: "Global Sync",    desc: "Real-time inventory",    icon: Globe,       color: "text-emerald-500", bg: "bg-emerald-50" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(current);
      setCurrent(c => (c + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [current]);

  const goTo = (i: number) => {
    if (i === current) return;
    setPrev(current);
    setCurrent(i);
  };

  const slide = heroSlides[current];

  return (
    <section className="relative bg-[#F8F8F8] overflow-hidden">

      {/* ── Hero ── */}
      <div className="relative h-[420px] md:h-[600px] lg:h-[680px] overflow-hidden">

        {/* Background image crossfade */}
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover scale-100 hover:scale-105 transition-transform duration-[18000ms] ease-out"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="w-full px-8 md:px-16 max-w-3xl">

            {/* Eyebrow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`eye-${current}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-px w-12 bg-white/35" />
                <span className="text-[11px] font-bold tracking-[2.5px] text-white/60 uppercase">
                  {slide.subtitle}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[.92] tracking-[-3px] mb-6"
              >
                {slide.title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={`block md:inline ${i === 1 ? "text-white/25" : ""}`}
                  >
                    {word}{" "}
                  </span>
                ))}
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${current}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-sm md:text-base text-white/55 mb-8 max-w-md leading-relaxed font-medium"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href={slide.ctaLink}
                className="group inline-flex items-center gap-2 h-12 px-8 bg-white text-black font-black text-sm rounded-xl hover:bg-[#DC2626] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="inline-flex items-center gap-2 h-12 px-7 border border-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                View Lookbook
              </button>
            </motion.div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-8 md:left-16 z-30 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-400 cursor-pointer"
              style={{
                width: i === current ? 32 : 12,
                background: i === current ? "#fff" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-5 right-8 z-30 text-white/40 text-xs font-bold tracking-widest tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
        </div>
      </div>

      {/* ── Floating Insight Cards ── */}
      <div className="px-4 md:px-8 lg:px-16 -mt-10 md:-mt-14 relative z-30 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INSIGHT_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-400 cursor-pointer relative overflow-hidden"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-400 ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              {/* Text */}
              <h3 className="text-[15px] font-black text-gray-900 tracking-tight mb-1 group-hover:text-[#DC2626] transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-snug">
                {card.desc}
              </p>
              {/* Decorative blob */}
              <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-gray-50 group-hover:scale-[2.5] transition-transform duration-700 -z-0" />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}