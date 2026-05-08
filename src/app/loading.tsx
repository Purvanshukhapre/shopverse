"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#F8F8F8] flex flex-col items-center justify-center">
      {/* Brand Focal Point */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-8"
      >
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#111111] relative z-10">
            Shop<span className="text-[#DC2626]">Everse</span>
          </h1>
          {/* Subtle Glow Pulse */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-[#DC2626] rounded-full blur-[40px] -z-10"
          />
        </div>

        {/* High-Fidelity Progress Bar */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#111111] to-transparent"
          />
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#777777] animate-pulse">
          Engineered for Excellence
        </p>
      </motion.div>
    </div>
  );
}
