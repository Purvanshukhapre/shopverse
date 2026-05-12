"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
import { SITE_NAME, NAV_LINKS } from "@/lib/constants";
import SearchBar from "./SearchBar";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSearchOpen } from "@/store/slices/uiSlice";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const { scrollDirection, isAtTop } = useScrollDirection();
  const dispatch = useAppDispatch();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          "--navbar-h",
          `${headerRef.current.getBoundingClientRect().height}px`
        );
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);

    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const isVisible = scrollDirection === "up" || isAtTop;

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) ${
          isAtTop
            ? "bg-white/90 backdrop-blur-xl shadow-premium border-b border-gray-100"
            : "bg-white/90 backdrop-blur-xl shadow-premium border-b border-gray-100"
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
          <div className="flex items-center gap-3 md:gap-4 h-20">
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

            {/* Search Trigger (Refined - Removed Redundancy) */}
            <div className="hidden md:flex flex-1 max-w-xl mx-auto">
              <button 
                onClick={() => dispatch(setSearchOpen(true))}
                className="w-full h-12 px-6 bg-[#F8F8F8] border border-gray-100 rounded-full flex items-center gap-3 text-[#777777] hover:border-gray-300 hover:bg-white focus-within:ring-4 focus-within:ring-black/5 focus-within:border-black transition-all duration-500 group"
              >
                <Grid3X3 className="w-4 h-4 text-[#111111]" />
                <span className="text-[13px] font-medium">Search the ShopEverse ecosystem...</span>
                <div className="ml-auto flex items-center gap-2">
                   <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-black bg-white px-1.5 py-0.5 rounded border border-gray-100 shadow-sm">⌘</span>
                      <span className="text-[10px] font-black bg-white px-1.5 py-0.5 rounded border border-gray-100 shadow-sm">K</span>
                   </div>
                </div>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Account */}
              <Link
                href="/auth/login"
                className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
                aria-label="Account"
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <User className="w-5 h-5 text-[#555555] group-hover:text-[#111111]" />
                </div>
                <span className="hidden lg:block text-left">
                  <span className="block text-[10px] text-[#777777] font-bold uppercase tracking-tight leading-none mb-1">Account</span>
                  <span className="text-xs font-black text-[#111111] flex items-center gap-0.5">
                    Sign In <ChevronDown className="w-3 h-3" />
                  </span>
                </span>
              </Link>

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
              {NAV_LINKS.slice(0, 8).map((navItem) => (
                <Link
                  key={navItem.label}
                  href={navItem.href}
                  className="px-4 h-full flex items-center text-xs font-bold text-[#555555] uppercase tracking-wider hover:text-[#111111] hover:bg-gray-50 transition-all rounded-lg"
                >
                  {navItem.label}
                </Link>
              ))}
              <Link
                href="/deals"
                className="px-4 py-2 h-full flex items-center text-xs font-black text-[#DC2626] uppercase tracking-widest hover:bg-red-50 transition-all rounded-full ml-auto"
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

      {pathname !== "/" && (
        <div className="h-[var(--navbar-h)]" aria-hidden="true" />
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

    </>
  );
}
