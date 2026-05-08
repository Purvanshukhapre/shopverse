"use client";

import { useEffect, useState } from "react";
import { Timer, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  initialSeconds: number;
}

export default function LiveCountdown({ initialSeconds }: CountdownProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  const Unit = ({ val, label }: { val: string; label: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
         <div className="bg-[#111111] text-white text-3xl md:text-5xl font-black px-4 py-6 rounded-[20px] shadow-2xl shadow-black/20 tabular-nums min-w-[70px] md:min-w-[100px] flex items-center justify-center border border-white/10 overflow-hidden group">
            <span className="relative z-10">{val}</span>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/40" />
         </div>
      </div>
      <span className="text-[10px] md:text-[11px] font-black text-[#777777] uppercase tracking-[0.2em]">{label}</span>
    </div>
  );

  return (
    <div className="flex items-start gap-3 md:gap-6">
      <Unit val={pad(h)} label="Hours" />
      <span className="text-3xl md:text-5xl font-black text-[#111111] pt-4">:</span>
      <Unit val={pad(m)} label="Mins" />
      <span className="text-3xl md:text-5xl font-black text-[#111111] pt-4">:</span>
      <Unit val={pad(s)} label="Secs" />
    </div>
  );
}
