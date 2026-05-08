"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import ProductCard from "@/components/product/ProductCard";
import { Heart, ShoppingBag, ShoppingCart, Trash2, ArrowRight, Share2, Sparkles, User, Bookmark } from "lucide-react";
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
    toast.success(`${items.length} items moved to your bag!`);
  };

  const handleClearWishlist = () => {
    items.forEach(product => dispatch(toggleWishlist(product)));
    toast.success("Wishlist cleared");
  };

  /* ── 1. EMPTY STATE (Emotional) ── */
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-12">
            <div className="w-32 h-32 bg-white rounded-[32px] flex items-center justify-center shadow-premium rotate-6 relative z-10 border border-gray-50">
               <Heart className="w-16 h-16 text-gray-100" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-pulse">
               <Heart className="w-6 h-6 text-[#DC2626]" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-[#111111] tracking-tight mb-4">
            Curate Your Collection
          </h1>
          <p className="text-[#555555] text-lg max-w-sm mb-12 leading-relaxed font-medium">
            Your wishlist is empty. Save the items you love and we'll track their availability for you.
          </p>
          <Link
            href="/shop"
            className="btn-premium btn-primary px-12 shadow-2xl shadow-black/10"
          >
            Explore Catalog <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ── 2. WISHLIST CONTENT (Personalized) ── */
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-20">

      {/* Header (Emotional / Personalized) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#F8F8F8] flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-[#111111]" />
             </div>
             <span className="text-[11px] font-black text-[#777777] uppercase tracking-[0.2em]">Saved For Later</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#111111] tracking-tighter">
            Your Selection
            <span className="text-[#DC2626] ml-4 font-bold text-2xl">({items.length} Favorites)</span>
          </h1>
          <p className="text-lg text-[#555555] font-medium max-w-xl">
            A curated list of premium essentials saved for your next purchase. Items in your wishlist are reserved in our system for tracking.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleClearWishlist}
            className="btn-premium btn-secondary px-6 text-[#777777] border-gray-100 hover:text-[#DC2626] hover:border-red-100"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Selection
          </button>
          <button
            onClick={handleAddAllToCart}
            className="btn-premium btn-primary px-8 shadow-2xl shadow-black/10"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Move All to Bag
          </button>
        </div>
      </div>

      {/* Products Grid (Production Density) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <AnimatePresence mode="popLayout">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              layout
              className="relative"
            >
              <div className="absolute top-4 left-4 z-20">
                 <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-gray-100 shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#111111]">Saved Item</span>
                 </div>
              </div>
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Recommendation Strip */}
      <div className="mt-32 pt-20 border-t border-gray-100">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-black text-[#111111]">Complementary Items</h2>
          <Link href="/shop" className="text-xs font-black text-[#1D4ED8] uppercase tracking-widest hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 grayscale-[0.5] opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
           {items.length > 0 && items.map((_, i) => (
             <div key={i} className="aspect-[4/5] bg-[#F8F8F8] rounded-[24px] border border-dashed border-gray-200 flex items-center justify-center">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">More Like This</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
