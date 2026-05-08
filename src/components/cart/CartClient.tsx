"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import {
  ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck,
  RefreshCw, ChevronRight, Sparkles, BadgePercent, Package,
  ArrowLeft, Heart
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import CartItem from "./CartItem";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "@/data/products";
import ProductCard from "../product/ProductCard";

export default function CartClient() {
  const { items } = useAppSelector((state) => state.cart);

  const subtotal  = items.reduce((t, i) => t + i.price * i.quantity, 0);
  const originalTotal = items.reduce((t, i) => t + (i.originalPrice || i.price) * i.quantity, 0);
  const totalSavings  = originalTotal - subtotal;
  const shipping  = subtotal > 5000 ? 0 : 499;
  const tax       = subtotal * 0.18;
  const total     = subtotal + shipping + tax;

  /* ── 1. EMPTY STATE (Professional Illustration style) ── */
  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative mb-12">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-premium relative z-10">
               <ShoppingBag className="w-20 h-20 text-gray-200" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-bounce">
               <BadgePercent className="w-6 h-6 text-[#15803D]" />
            </div>
            <div className="absolute -bottom-2 -left-4 w-10 h-10 bg-blue-50 rounded-full border-4 border-white shadow-lg" />
          </div>

          <h1 className="text-4xl font-black text-[#111111] mb-4">Your Shopping Bag is Waiting</h1>
          <p className="text-[#555555] text-lg max-w-lg mb-10 leading-relaxed font-medium">
            Looks like you haven't added any premium essentials to your bag yet. Start exploring our latest collections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link
              href="/shop"
              className="btn-premium btn-primary px-12 shadow-2xl shadow-black/10"
            >
              Start Shopping <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/wishlist"
              className="btn-premium btn-secondary px-12"
            >
              View Wishlist
            </Link>
          </div>

          {/* Suggestions */}
          <div className="w-full border-t border-gray-100 pt-20">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-black text-[#111111]">Recommended for You</h2>
               <Link href="/shop" className="text-xs font-black text-[#1D4ED8] uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {allProducts.slice(0, 6).map((p, i) => (
                 <ProductCard key={p.id} product={p} index={i} />
               ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── 2. CART WITH ITEMS (Elevated) ── */
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-20">

      {/* Header Authority */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <nav className="flex items-center gap-2 text-[11px] font-black text-[#777777] uppercase tracking-[0.2em] mb-3">
             <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
             <ChevronRight className="w-3 h-3" />
             <span className="text-[#111111]">Shopping Bag</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tighter">
            Your Bag
            <span className="text-[#AAAAAA] ml-4 font-bold text-2xl">({items.length} Items)</span>
          </h1>
        </div>
        <Link
          href="/shop"
          className="btn-premium btn-secondary border-none px-0 hover:bg-transparent hover:text-[#111111]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">

        {/* ── Left: Items Section ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Savings Highlight */}
          {totalSavings > 0 && (
            <div className="bg-[#DCFCE7] border-2 border-white rounded-[20px] px-6 py-4 flex items-center justify-between shadow-lg shadow-emerald-500/5 overflow-hidden relative">
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                   <BadgePercent className="w-6 h-6 text-[#15803D]" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-[#15803D] uppercase tracking-widest leading-none mb-1">Order Reward</p>
                  <p className="text-lg font-black text-[#15803D]">Congrats! You're saving {formatPrice(totalSavings)} today</p>
                </div>
              </div>
              <Sparkles className="w-20 h-20 text-[#15803D]/10 absolute -right-4 -bottom-4 rotate-12" />
            </div>
          )}

          {/* Items Container */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-soft overflow-hidden">
             <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <span className="text-[11px] font-black text-[#777777] uppercase tracking-widest">Product Details</span>
                <span className="text-[11px] font-black text-[#777777] uppercase tracking-widest">Pricing & Subtotal</span>
             </div>
             <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16, height: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                    className="border-b border-gray-50 last:border-0"
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>

          {/* Trust Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "Next Day Express", desc: "Available for selected cities" },
              { icon: ShieldCheck, title: "Identity Protection", desc: "Your data is fully encrypted" },
              { icon: Package, title: "Premium Packing", desc: "Damage-proof luxury boxing" },
            ].map((feature, i) => (
               <div key={i} className="flex gap-4 p-6 rounded-[20px] bg-white border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                     <feature.icon className="w-5 h-5 text-[#555555]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#111111] uppercase tracking-widest mb-1">{feature.title}</p>
                    <p className="text-[10px] text-[#777777] font-medium leading-tight">{feature.desc}</p>
                  </div>
               </div>
            ))}
          </div>
        </div>

        {/* ── Right: Elevated Summary (Sticky) ── */}
        <aside className="w-full lg:w-[420px] flex-shrink-0 lg:sticky lg:top-48 space-y-6">
          
          {/* 1. Coupon Section (Dashed / Excited) */}
          <div className="bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-[20px] p-6 relative overflow-hidden group">
            <div className="flex items-center gap-3 relative z-10">
              <Tag className="w-6 h-6 text-[#1D4ED8] group-hover:rotate-12 transition-transform" />
              <div className="flex-1">
                <p className="text-[11px] font-black text-[#1D4ED8] uppercase tracking-widest mb-2">Have a Promo Code?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="flex-1 h-11 px-4 bg-white border border-blue-100 rounded-xl text-xs font-bold focus:border-[#1D4ED8] outline-none transition-all"
                  />
                  <button className="h-11 px-5 bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all">
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <Sparkles className="w-12 h-12 text-[#1D4ED8]/5 absolute -right-2 -top-2" />
          </div>

          {/* 2. Price Details */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-premium p-8">
            <h3 className="text-sm font-black text-[#111111] uppercase tracking-[0.2em] mb-8">Order Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#555555] font-bold">Base Value</span>
                <span className="text-[15px] text-[#111111] font-black">{formatPrice(originalTotal)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#555555] font-bold">Discount Applied</span>
                  <span className="text-[15px] text-[#15803D] font-black">−{formatPrice(totalSavings)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#555555] font-bold">Delivery Fee</span>
                <span className={cn("text-[15px] font-black", shipping === 0 ? "text-[#15803D]" : "text-[#111111]")}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#555555] font-bold">Taxation (18%)</span>
                <span className="text-[15px] text-[#111111] font-black">{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-8 pt-8 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-base font-black text-[#111111] uppercase tracking-widest">Total Payable</span>
                <span className="text-3xl font-black text-[#111111] tracking-tighter">{formatPrice(total)}</span>
              </div>
              
              <Link
                href="/checkout"
                className="btn-premium btn-primary w-full h-[60px] text-base"
              >
                Continue to Checkout <ChevronRight className="w-5 h-5 ml-2" />
              </Link>

              <div className="flex flex-col items-center gap-4">
                 <div className="flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                    <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                    <span className="text-[10px] font-black text-[#555555] uppercase tracking-widest">100% Secure Checkout</span>
                 </div>
                 <p className="text-[10px] text-[#777777] font-medium text-center leading-tight">
                    By proceeding, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                 </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
