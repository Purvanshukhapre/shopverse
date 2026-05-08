"use client";

import { useEffect, useState } from "react";
import { Zap, Timer, TrendingDown, Star, ChevronRight } from "lucide-react";

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

  return (
    <div className="flex items-center gap-2">
      <Timer className="w-4 h-4 text-red-400 flex-shrink-0" />
      <div className="flex items-center gap-1.5">
        {[pad(h), pad(m), pad(s)].map((unit, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="bg-red-600 text-white text-base font-black px-2.5 py-1.5 rounded-lg tabular-nums min-w-[40px] text-center">
              {unit}
            </span>
            {i < 2 && <span className="text-red-400 font-black text-base">:</span>}
          </span>
        ))}
      </div>
      <span className="text-xs font-bold text-red-400 uppercase tracking-wider">left</span>
    </div>
  );
}
