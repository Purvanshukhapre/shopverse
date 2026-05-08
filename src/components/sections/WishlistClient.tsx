"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import ProductCard from "@/components/product/ProductCard";
import { Heart, ShoppingBag, ShoppingCart, Trash2, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function WishlistClient() {
  const { items }  = useAppSelector((s) => s.wishlist);
  const dispatch   = useAppDispatch();

  const handleAddAllToCart = () => {
    items.forEach(product => {
      dispatch(addToCart({ ...product, quantity: 1 }));
    });
    toast.success(`${items.length} items added to cart!`);
  };

  const handleClearWishlist = () => {
    items.forEach(product => dispatch(toggleWishlist(product)));
    toast.success("Wishlist cleared");
  };

  /* ── EMPTY STATE ── */
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-28 h-28 bg-red-50 rounded-full flex items-center justify-center mb-8"
          >
            <Heart className="w-14 h-14 text-red-300" />
          </motion.div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-3">
            Your Wishlist is Empty
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
            Save your favourite items here and they'll be waiting for you when you're ready to buy.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white font-black uppercase tracking-wider text-sm rounded-xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Explore Products
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-5 text-xs text-gray-400">
            or check out{" "}
            <Link href="/deals" className="text-blue-600 font-bold underline underline-offset-2 hover:text-blue-800">
              today's deals
            </Link>
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── WISHLIST WITH ITEMS ── */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 md:py-12">

      {/* Page Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">My Wishlist</h1>
            <span className="text-sm font-black text-white bg-[#0A0A0A] px-2.5 py-1 rounded-full">
              {items.length}
            </span>
          </div>
          <p className="text-sm text-gray-500">{items.length} item{items.length > 1 ? "s" : ""} saved for later</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleClearWishlist}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors border border-gray-200 hover:border-red-200 px-3.5 py-2.5 rounded-xl"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
          <button
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors border border-gray-200 hover:border-gray-400 px-3.5 py-2.5 rounded-xl"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button
            onClick={handleAddAllToCart}
            className="flex items-center gap-2 text-xs font-black text-white bg-[#FB641B] hover:bg-[#e55a16] px-4 py-2.5 rounded-xl transition-all shadow-md shadow-orange-100"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add All to Cart
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              layout
            >
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-gray-900 mb-0.5">
            Ready to buy?
          </p>
          <p className="text-xs text-gray-500">Move all your favourites to cart and place your order.</p>
        </div>
        <button
          onClick={handleAddAllToCart}
          className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white font-black text-xs uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all shadow-md"
        >
          <ShoppingCart className="w-4 h-4" />
          Move All to Cart
        </button>
      </div>
    </div>
  );
}
