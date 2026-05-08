"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Check, Zap, Eye, Star } from "lucide-react";
import { Product } from "@/types";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { toast } from "sonner";
import RatingStars from "../shared/RatingStars";

interface ProductCardProps {
  product: Product;
  index?: number;
  layout?: "grid" | "list";
}

export default function ProductCard({ product, index = 0, layout = "grid" }: ProductCardProps) {
  const dispatch     = useAppDispatch();
  const wishlist     = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsAdding(true);
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to bag`, {
      icon: <ShoppingCart className="w-4 h-4 text-emerald-500" />,
      className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
    });
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col bg-white border border-gray-100 rounded-[24px] transition-all duration-500 h-full overflow-hidden",
        "hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-gray-200"
      )}
    >
      {/* 1. IMAGE AREA (Standardized Aspect Ratio) */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#F8F8F8] flex-shrink-0 group">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            "object-contain p-8 transition-transform duration-1000 ease-out",
            isHovered ? "scale-110" : "scale-100"
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Cinematic Overlay (Subtle) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Actions (Elite Polish) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2.5 z-10">
          <button
            onClick={handleWishlist}
            className={cn(
              "w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl border",
              isWishlisted 
                ? "bg-red-500 border-red-500 text-white" 
                : "bg-white/80 border-white/40 text-[#111111] hover:bg-white hover:scale-110"
            )}
          >
            <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/40 text-[#111111] flex items-center justify-center shadow-xl translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-75 hover:bg-white hover:scale-110">
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Premium Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {discount > 0 && (
            <div className="bg-[#DC2626] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl shadow-red-500/20 tracking-wider">
              {discount}% OFF
            </div>
          )}
          {product.rating >= 4.8 && (
            <div className="bg-[#111111] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl shadow-black/20 tracking-wider flex items-center gap-1.5">
               <Zap className="w-3 h-3 text-amber-400 fill-current" />
               ELITE CHOICE
            </div>
          )}
        </div>

        {/* Bottom Reveal CTA (Elite UX) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19, 1, 0.22, 1]">
          <button
            disabled={isAdding}
            onClick={handleAddToCart}
            className={cn(
              "w-full h-12 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-2xl",
              isAdding 
                ? "bg-[#15803D] text-white" 
                : "bg-[#111111] text-white hover:bg-black active:scale-95"
            )}
          >
            {isAdding ? <><Check className="w-4 h-4" /> SECURED</> : <><ShoppingCart className="w-4 h-4" /> ADD TO BAG</>}
          </button>
        </div>
      </Link>

      {/* 2. INFO AREA (Pacing & Hierarchy) */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#777777]">{product.category}</p>
          <div className="flex items-center gap-1 bg-[#F8F8F8] px-2 py-0.5 rounded-md border border-gray-100">
             <Star className="w-2.5 h-2.5 text-amber-500 fill-current" />
             <span className="text-[9px] font-black text-[#111111]">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="text-[15px] font-bold text-[#111111] leading-tight line-clamp-2 min-h-[40px] group-hover:text-[#DC2626] transition-colors mb-4">
            {product.name}
          </h3>
        </Link>

        {/* Price Strip (High Authority) */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-[#777777] line-through font-bold mb-0.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-black text-[#111111] tracking-tighter leading-none">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-black text-[#15803D] uppercase tracking-widest">Free Shipping</span>
             <span className="text-[9px] font-bold text-[#AAAAAA] uppercase tracking-widest mt-0.5">Next Day Delivery</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
