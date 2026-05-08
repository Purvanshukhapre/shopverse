"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Check, Zap } from "lucide-react";
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

// ── SHARED BADGE ───────────────────────────────────────────
function ProductBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-sm", color)}>
      {label}
    </span>
  );
}

// ── LIST LAYOUT ──────────────────────────────────────────────
function ListCard({ product, index }: { product: Product; index: number }) {
  const dispatch     = useAppDispatch();
  const wishlist     = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const [isAdding, setIsAdding] = useState(false);
  const discount     = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsAdding(true);
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      viewport={{ once: true }}
      className="group bg-white border border-gray-100 rounded-[16px] hover:shadow-2xl hover:shadow-black/5 hover:border-gray-300 transition-all duration-300 flex gap-6 p-5"
    >
      {/* Image Area (Increased Ratio) */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-48 sm:w-56 aspect-[4/5] flex-shrink-0 rounded-[12px] overflow-hidden bg-[#F8F8F8] border border-gray-50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#DC2626] text-white text-[10px] font-black px-2 py-1 rounded shadow-lg shadow-red-500/20">
            {discount}% OFF
          </div>
        )}
      </Link>

      {/* Info Area (Strict Hierarchy) */}
      <div className="flex flex-col flex-1 py-1">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#777777]">{product.category}</p>
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-[17px] font-medium text-[#111111] line-clamp-2 leading-tight hover:text-[#DC2626] transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          <button
            onClick={handleWishlist}
            className={cn("p-2.5 rounded-full border border-gray-100 transition-all hover:bg-red-50", isWishlisted ? "text-[#DC2626] border-red-100 bg-red-50" : "text-[#777777]")}
          >
            <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
          </button>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-[11px] font-black text-[#15803D] uppercase tracking-wider">Free Delivery</span>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-[#111111] tracking-tight">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-[#777777] line-through font-medium">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <p className="text-xs font-bold text-[#DC2626]">Limited time offer</p>
        </div>

        <div className="mt-auto pt-6 flex gap-3">
          <button
            disabled={isAdding}
            onClick={handleAddToCart}
            className={cn(
              "btn-premium btn-primary flex-1",
              isAdding && "bg-[#15803D] border-[#15803D]"
            )}
          >
            {isAdding ? <><Check className="w-4 h-4 mr-2" /> Added</> : <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>}
          </button>
          <button className="btn-premium btn-secondary px-6">
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── GRID LAYOUT ──────────────────────────────────────────────
export default function ProductCard({ product, index = 0, layout = "grid" }: ProductCardProps) {
  const dispatch     = useAppDispatch();
  const wishlist     = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const [isAdding, setIsAdding] = useState(false);

  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsAdding(true);
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  if (layout === "list") return <ListCard product={product} index={index} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      viewport={{ once: true }}
      className="group flex flex-col bg-white border border-gray-100 rounded-[16px] hover:shadow-2xl hover:shadow-black/5 hover:border-gray-300 transition-all duration-500 h-full overflow-hidden"
    >
      {/* 1. Image Area (Geometry Fixed) */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#F8F8F8] flex-shrink-0 border-b border-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Floating Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleWishlist}
            className={cn(
              "w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110",
              isWishlisted ? "text-[#DC2626]" : "text-[#777777] hover:text-[#DC2626]"
            )}
          >
            <Heart className={cn("w-4.5 h-4.5", isWishlisted && "fill-current")} />
          </button>
        </div>

        {/* Badges */}
        {discount > 0 ? (
          <div className="absolute top-3 left-3 bg-[#DC2626] text-white text-[10px] font-black px-2 py-1 rounded shadow-lg shadow-red-500/10">
            -{discount}%
          </div>
        ) : product.rating >= 4.8 ? (
          <div className="absolute top-3 left-3">
             <ProductBadge label="Best Seller" color="bg-[#111111] text-white" />
          </div>
        ) : null}

        {/* Quick Add (Hover revealed) */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            disabled={isAdding}
            onClick={handleAddToCart}
            className={cn(
              "w-full h-11 bg-white text-[#111111] border border-gray-200 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all",
              isAdding && "bg-[#15803D] text-white border-[#15803D]"
            )}
          >
            {isAdding ? <Check className="w-4 h-4 mx-auto" /> : "Quick Add"}
          </button>
        </div>
      </Link>

      {/* 2. Info Area (Breathing Room + Hierarchy) */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand/Category */}
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#777777] mb-1.5">{product.category}</p>

        {/* Title (Medium) */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-base font-medium text-[#111111] leading-snug line-clamp-2 min-h-[48px] mb-2 hover:text-[#DC2626] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-3">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="xs" />
        </div>

        {/* Price (Bold + High Contrast) */}
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="text-[19px] font-black text-[#111111] tracking-tight">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-[#777777] line-through font-medium">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Trust Signals */}
        <div className="mt-2.5 pt-2.5 border-t border-gray-50 flex items-center justify-between">
          <span className="text-[9px] font-black text-[#15803D] uppercase tracking-widest">Free Delivery</span>
          <span className="text-[9px] font-bold text-[#555555] uppercase tracking-widest">In Stock</span>
        </div>
      </div>
    </motion.div>
  );
}
