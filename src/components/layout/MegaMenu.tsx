"use client";

import { motion } from "framer-motion";
import { MEGA_MENU_CATEGORIES } from "@/lib/constants";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
      />

      {/* Menu */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-full left-0 right-0 z-50 bg-white border-t border-[#E5E5E5] shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-4 gap-8">
            {MEGA_MENU_CATEGORIES.map((category) => (
              <div key={category.title}>
                <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5E5E5]">
                  {category.title}
                </h3>
                <ul className="space-y-2.5">
                  {category.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors block"
                        onClick={onClose}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
