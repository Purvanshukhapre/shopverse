"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  ChevronRight,
  User,
  ShoppingBag,
  Heart,
  MapPin,
  HelpCircle,
} from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 bottom-0 z-50 w-[320px] max-w-[85vw] bg-white overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#0A0A0A]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Hello, Sign In</p>
                  <p className="text-white/60 text-xs">Account & Lists</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Links */}
            <div className="px-5 py-3 border-b border-[#E5E5E5]">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: ShoppingBag, label: "Orders" },
                  { icon: Heart, label: "Wishlist" },
                  { icon: MapPin, label: "Address" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="flex flex-col items-center gap-1.5 py-3 rounded-lg hover:bg-[#F8F8F8] transition-colors"
                  >
                    <Icon className="w-5 h-5 text-[#525252]" />
                    <span className="text-xs text-[#525252]">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="py-2">
              <p className="px-5 py-2 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                Shop by Category
              </p>
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="border-b border-[#F3F4F6] last:border-0">
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === link.label ? null : link.label
                      )
                    }
                    className="flex items-center justify-between w-full px-5 py-3 text-sm text-[#0A0A0A] hover:bg-[#F8F8F8] transition-colors"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 text-[#9CA3AF] transition-transform ${
                        expandedCategory === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === link.label && link.children && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-2">
                          {link.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              className="flex items-center gap-2 px-8 py-2 text-sm text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F8F8F8] transition-colors"
                              onClick={onClose}
                            >
                              <ChevronRight className="w-3 h-3" />
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Bottom Links */}
            <div className="px-5 py-4 border-t border-[#E5E5E5] mt-auto">
              <a
                href="#"
                className="flex items-center gap-3 py-2.5 text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors"
              >
                <HelpCircle className="w-4.5 h-4.5" />
                Help & Support
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
