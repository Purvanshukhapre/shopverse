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
            : "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
        }`}
      >
        {/* Top Bar (Professional Utility) */}
        <div className="border-b border-gray-100 bg-[#F8F8F8]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex items-center justify-between h-10 text-[11px] font-bold text-[#555555] uppercase tracking-wider">
              <div className="hidden md:flex items-center gap-6">
                <a href="#" className="flex items-center gap-1.5 hover:text-[#111111] transition-colors">
                  <MapPin className="w-3.5 h-3.5" />
                  Deliver to Mumbai 400001
                </a>
                <a href="#" className="hover:text-[#111111] transition-colors">
                  Sell on {SITE_NAME}
                </a>
              </div>
              <div className="flex items-center gap-6 ml-auto">
                <a href="#" className="hover:text-[#111111] transition-colors">
                  Customer Service
                </a>
                <a href="#" className="hover:text-[#111111] transition-colors">
                  Track Order
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Bar (Authority) */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-6 md:gap-10 h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-[#111111]" />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-[#111111]">
                Shop<span className="text-[#DC2626]">Everse</span>
              </h1>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
              <SearchBar />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Account */}
              <button className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <User className="w-5 h-5 text-[#555555] group-hover:text-[#111111]" />
                </div>
                <span className="hidden lg:block text-left">
                  <span className="block text-[10px] text-[#777777] font-bold uppercase tracking-tight leading-none mb-1">Account</span>
                  <span className="text-xs font-black text-[#111111] flex items-center gap-0.5">
                    Sign In <ChevronDown className="w-3 h-3" />
                  </span>
                </span>
              </button>

              <div className="w-px h-8 bg-gray-100 hidden md:block" />

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-3 rounded-xl hover:bg-gray-100 transition-all group"
                aria-label="Wishlist"
              >
                <Heart className="w-6 h-6 text-[#555555] group-hover:text-[#111111] group-hover:scale-110 transition-all" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#111111] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-black/20 animate-fade-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-3 rounded-xl bg-gray-900 hover:bg-black transition-all group shadow-xl shadow-black/10"
                aria-label="Cart"
              >
                <ShoppingCart className="w-6 h-6 text-white group-hover:scale-110 transition-all" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DC2626] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-red-500/20 animate-fade-in">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Category Bar (Desktop) */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex items-center gap-2 h-12">
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="flex items-center gap-2 px-4 h-full text-xs font-black text-[#111111] uppercase tracking-widest hover:bg-gray-50 transition-colors rounded-lg"
              >
                <Grid3X3 className="w-4 h-4" />
                All Categories
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isMegaMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div className="w-px h-6 bg-gray-100 mx-2" />
              {categories.slice(0, 8).map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="px-4 h-full flex items-center text-xs font-bold text-[#555555] uppercase tracking-wider hover:text-[#111111] hover:bg-gray-50 transition-all rounded-lg"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/deals"
                className="px-5 h-full flex items-center text-xs font-black text-[#DC2626] uppercase tracking-widest hover:bg-red-50 transition-all rounded-lg ml-auto"
              >
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse mr-2" />
                Flash Deals
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
        <div className="md:hidden px-4 pb-4">
          <SearchBar />
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Spacer (Consistent for taller navbar) */}
      <div className="h-[140px] md:h-[160px] lg:h-[180px]" />
    </>
  );
}
