"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const Unit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div className="bg-[#1A1A1A] text-white/90 text-xl md:text-2xl font-bold w-12 md:w-16 h-14 md:h-16 rounded-xl flex items-center justify-center shadow-lg shadow-black/5 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="tabular-nums"
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        </div>
        {/* Pulsing indicator for seconds */}
        {label === "Secs" && (
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-[#DC2626] rounded-full blur-[2px]"
          />
        )}
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#777777] mt-2">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Unit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-black text-[#111111] -mt-6">:</span>
      <Unit value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl font-black text-[#111111] -mt-6">:</span>
      <Unit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
