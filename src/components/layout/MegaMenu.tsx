"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

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
          <div className="grid grid-cols-5 gap-8">
            {NAV_LINKS.slice(0, 5).map((navItem) => (
              <div key={navItem.label}>
                <Link
                  href={navItem.href}
                  onClick={onClose}
                  className="block text-sm font-black text-[#0A0A0A] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5E5E5] hover:text-primary transition-colors"
                >
                  {navItem.label}
                </Link>
                <ul className="space-y-3">
                  {navItem.children?.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href.replace(/\/shirts|\/trousers|\/jeans|\/jackets|\/footwear|\/accessories|\/dresses|\/tops|\/laptops|\/headphones|\/cameras|\/speakers|\/wearables|\/accessories|\/refrigerators|\/washing-machines|\/microwaves|\/air-purifiers|\/hepa|\/activated-carbon|\/smart|\/living-room|\/bedroom|\/dining|\/office|\/outdoor|\/storage|\/casual|\/formal|\/sports/g, '')}
                        className="text-sm font-medium text-[#525252] hover:text-[#0A0A0A] hover:translate-x-1 inline-block transition-all"
                        onClick={onClose}
                      >
                        {child.label}
                      </Link>
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
