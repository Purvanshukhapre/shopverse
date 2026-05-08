"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Heart,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  Grid3X3,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { categories } from "@/data/categories";
import SearchBar from "./SearchBar";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export default function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const isVisible = scrollDirection === "up" || isAtTop;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isAtTop
            ? "bg-white"
            : "bg-white/95 backdrop-blur-md shadow-sm"
        }`}
      >
        {/* Top Bar */}
        <div className="border-b border-[#F3F4F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex items-center justify-between h-8 text-xs text-[#525252]">
              <div className="hidden md:flex items-center gap-4">
                <a href="#" className="flex items-center gap-1 hover:text-[#0A0A0A] transition-colors">
                  <MapPin className="w-3 h-3" />
                  Deliver to Mumbai
                </a>
                <span className="text-[#E5E5E5]">|</span>
                <a href="#" className="hover:text-[#0A0A0A] transition-colors">
                  Sell on {SITE_NAME}
                </a>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <a href="#" className="hover:text-[#0A0A0A] transition-colors">
                  Customer Service
                </a>
                <span className="text-[#E5E5E5]">|</span>
                <a href="#" className="hover:text-[#0A0A0A] transition-colors">
                  Track Order
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-4 md:gap-6 h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1.5 hover:bg-[#F8F8F8] rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-[#0A0A0A]" />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#0A0A0A]">
                Shop<span className="text-[#525252]">Everse</span>
              </h1>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1">
              <SearchBar />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Account */}
              <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[#F8F8F8] transition-colors group">
                <User className="w-5 h-5 text-[#525252] group-hover:text-[#0A0A0A] transition-colors" />
                <span className="hidden lg:block text-left">
                  <span className="block text-[10px] text-[#9CA3AF] leading-none">Hello, Sign In</span>
                  <span className="text-xs font-semibold text-[#0A0A0A] flex items-center gap-0.5">
                    Account <ChevronDown className="w-3 h-3" />
                  </span>
                </span>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-lg hover:bg-[#F8F8F8] transition-colors group"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-[#525252] group-hover:text-[#0A0A0A] transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#0A0A0A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-lg hover:bg-[#F8F8F8] transition-colors group"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 text-[#525252] group-hover:text-[#0A0A0A] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#DC2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Category Bar (Desktop) */}
        <div className="hidden lg:block border-t border-[#F3F4F6] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex items-center gap-1 h-10">
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="flex items-center gap-1.5 px-3 h-full text-sm font-medium text-[#0A0A0A] hover:bg-[#F8F8F8] transition-colors rounded"
              >
                <Grid3X3 className="w-4 h-4" />
                All Categories
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    isMegaMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div className="w-px h-5 bg-[#E5E5E5] mx-1" />
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="px-3 h-full flex items-center text-sm text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F8F8F8] transition-colors rounded"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/deals"
                className="px-3 h-full flex items-center text-sm font-semibold text-[#DC2626] hover:bg-red-50 transition-colors rounded ml-auto"
              >
                Today&apos;s Deals
              </Link>
            </div>
          </div>

          <AnimatePresence>
            {isMegaMenuOpen && (
              <MegaMenu
                isOpen={isMegaMenuOpen}
                onClose={() => setIsMegaMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Search (below main bar on small screens) */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Spacer */}
      <div className="h-[130px] md:h-[140px] lg:h-[150px]" />
    </>
  );
}
