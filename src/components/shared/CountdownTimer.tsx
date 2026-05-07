"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 opacity-0">
        <span className="text-sm font-medium text-[#DC2626] mr-1">Ends in</span>
      </div>
    );
  }

  if (isExpired) {
    return (
      <span className="text-sm font-medium text-[#DC2626]">Sale Ended</span>
    );
  }

  const timeBlocks = [
    { value: hours, label: "Hrs" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-medium text-[#DC2626] mr-1">Ends in</span>
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="flex items-center gap-1.5">
          <div className="bg-[#0A0A0A] text-white text-sm font-bold px-2 py-1 rounded min-w-[36px] text-center tabular-nums">
            {String(block.value).padStart(2, "0")}
          </div>
          <span className="text-xs text-[#9CA3AF] uppercase">{block.label}</span>
          {index < timeBlocks.length - 1 && (
            <span className="text-[#0A0A0A] font-bold mx-0.5">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
