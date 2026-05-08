"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import {
  ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck,
  RefreshCw, ChevronRight, Sparkles, BadgePercent
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem";
import { motion, AnimatePresence } from "framer-motion";

export default function CartClient() {
  const { items } = useAppSelector((state) => state.cart);

  const subtotal  = items.reduce((t, i) => t + i.price * i.quantity, 0);
  const originalTotal = items.reduce((t, i) => t + (i.originalPrice || i.price) * i.quantity, 0);
  const totalSavings  = originalTotal - subtotal;
  const shipping  = subtotal > 5000 ? 0 : 499;
  const tax       = subtotal * 0.18;
  const total     = subtotal + shipping + tax;

  /* ── EMPTY STATE ─────────────────────────────────────────── */
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-32 h-32 mb-8">
            <div className="w-full h-full bg-amber-50 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-amber-300" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-500 font-black text-xs">0</span>
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-3">
            Your cart is empty!
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet. 
            Explore thousands of premium products and find something you love.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FB641B] text-white font-black uppercase tracking-wider text-sm rounded-xl hover:bg-[#e55a16] transition-all shadow-lg shadow-orange-200 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-6 text-xs text-gray-400 font-medium">
            or{" "}
            <Link href="/deals" className="text-blue-600 hover:text-blue-800 font-bold underline underline-offset-2">
              explore today's deals
            </Link>
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── CART WITH ITEMS ──────────────────────────────────────── */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 md:py-10">

      {/* Page title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{items.length} item{items.length > 1 ? "s" : ""} in your cart</p>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
        >
          Continue Shopping <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Left: Cart Items ── */}
        <div className="flex-1 min-w-0 space-y-3">

          {/* Savings banner */}
          {totalSavings > 0 && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-center gap-3">
              <BadgePercent className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <p className="text-sm font-bold text-emerald-700">
                🎉 You're saving <span className="font-black">{formatPrice(totalSavings)}</span> on this order!
              </p>
            </div>
          )}

          {/* Cart Items */}
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16, height: 0 }}
                transition={{ delay: index * 0.04 }}
                layout
              >
                <CartItem item={item} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Trust features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            {[
              { icon: Truck,       color: "text-blue-500",   bg: "bg-blue-50",   title: "Free Delivery",      sub: "On orders above ₹5,000" },
              { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50", title: "Secure Checkout",   sub: "256-bit SSL encrypted" },
              { icon: RefreshCw,   color: "text-purple-500", bg: "bg-purple-50",  title: "Easy Returns",      sub: "30-day hassle free" },
            ].map(({ icon: Icon, color, bg, title, sub }) => (
              <div key={title} className={`${bg} rounded-xl p-4 flex items-center gap-3 border border-white`}>
                <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                <div>
                  <p className="text-xs font-black text-gray-800">{title}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Order Summary ── */}
        <aside className="w-full lg:w-[360px] flex-shrink-0 lg:sticky lg:top-40 space-y-3">

          {/* Promo Code */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="relative flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-1 text-xs font-semibold text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
              />
              <button className="text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-wider transition-colors flex-shrink-0">
                Apply
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">
              Price Details ({items.length} item{items.length > 1 ? "s" : ""})
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Total MRP</span>
                <span className="text-gray-900 font-bold">{formatPrice(originalTotal)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Discount on MRP</span>
                  <span className="text-emerald-600 font-bold">−{formatPrice(totalSavings)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Platform Discount</span>
                <span className="text-emerald-600 font-bold">−₹0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Delivery Fee</span>
                <span className={shipping === 0 ? "text-emerald-600 font-bold" : "text-gray-900 font-bold"}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">GST (18%)</span>
                <span className="text-gray-900 font-bold">{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-black text-gray-900">Total Amount</span>
                <span className="text-xl font-black text-gray-900 tracking-tight">{formatPrice(total)}</span>
              </div>
              {totalSavings > 0 && (
                <p className="text-xs font-bold text-emerald-600 mt-1.5">
                  You will save {formatPrice(totalSavings)} on this order
                </p>
              )}
            </div>

            <Link
              href="/checkout"
              className="w-full mt-5 h-13 py-3.5 flex items-center justify-center gap-2 bg-[#FB641B] text-white font-black uppercase tracking-wider text-sm rounded-xl hover:bg-[#e55a16] transition-all shadow-md shadow-orange-100 active:scale-[0.98]"
            >
              Place Order
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[10px] text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Safe and Secure Payments. 100% Authentic products.
            </p>
          </div>

          {/* Deals promo */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-4 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-black text-gray-800">Bank Offer Available!</p>
              <p className="text-[10px] text-gray-500 mt-0.5">10% off with HDFC Bank cards. Max ₹1,500 discount.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
