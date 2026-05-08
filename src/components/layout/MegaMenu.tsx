"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categories } from "@/data/categories";

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
            {categories.slice(0, 5).map((category) => (
              <div key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  onClick={onClose}
                  className="block text-sm font-black text-[#0A0A0A] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5E5E5] hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
                <ul className="space-y-3">
                  {category.subcategories?.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/category/${category.slug}/${sub.slug}`}
                        className="text-sm font-medium text-[#525252] hover:text-[#0A0A0A] hover:translate-x-1 inline-block transition-all"
                        onClick={onClose}
                      >
                        {sub.name}
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
