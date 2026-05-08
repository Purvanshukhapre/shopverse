"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Check, Star, Zap, Award, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
  layout?: "grid" | "list";
}

// Small inline star component for the card
function MiniStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-2.5 h-2.5",
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i < rating
              ? "fill-amber-200 text-amber-200"
              : "text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

// Determine badge for product
function getProductBadge(product: Product, index: number) {
  if (index === 0) return { label: "Best Seller", color: "bg-amber-100 text-amber-800" };
  if (index % 7 === 0) return { label: "New Arrival", color: "bg-emerald-100 text-emerald-800" };
  if (index % 5 === 0) return { label: "Top Rated", color: "bg-violet-100 text-violet-800" };
  return null;
}

// ── LIST LAYOUT ──────────────────────────────────────────────
function ListCard({ product, index }: { product: Product; index: number }) {
  const dispatch     = useAppDispatch();
  const wishlist     = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const [isAdding, setIsAdding] = useState(false);
  const discount     = calculateDiscount(product.originalPrice, product.price);
  const brand        = product.name.split(" ")[0];
  const badge        = getProductBadge(product, index);

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
    if (!isWishlisted) toast.success(`${product.name} saved to wishlist`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2) }}
      viewport={{ once: true }}
      className="group bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-gray-200 transition-all flex gap-4 sm:gap-6 p-4"
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-36 sm:w-44 flex-shrink-0 aspect-square rounded-lg overflow-hidden bg-gray-50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-[#DC2626] text-white text-[9px] font-black px-1.5 py-0.5 rounded">
            {discount}% OFF
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 min-w-0 py-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {badge && (
              <span className={cn("inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded mb-1", badge.color)}>
                {badge.label}
              </span>
            )}
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">{brand}</p>
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug hover:text-blue-700 transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          <button
            onClick={handleWishlist}
            className={cn("flex-shrink-0 p-1.5 rounded-full transition-all", isWishlisted ? "text-red-500" : "text-gray-300 hover:text-red-400")}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          <MiniStars rating={product.rating} />
          <span className="text-[10px] text-gray-500 font-medium">
            {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-black text-gray-900 tracking-tight">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through font-medium">{formatPrice(product.originalPrice)}</span>
          )}
          {discount > 0 && (
            <span className="text-xs font-black text-[#DC2626]">{discount}% off</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Free Delivery
          </span>
          <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Bank Offer
          </span>
        </div>

        <div className="mt-auto pt-3">
          <button
            disabled={isAdding}
            onClick={handleAddToCart}
            className={cn(
              "h-9 px-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all",
              isAdding
                ? "bg-emerald-500 text-white"
                : "bg-[#0A0A0A] text-white hover:bg-gray-800"
            )}
          >
            {isAdding ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            {isAdding ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── GRID LAYOUT (default) ────────────────────────────────────
export default function ProductCard({ product, index = 0, layout = "grid" }: ProductCardProps) {
  const dispatch     = useAppDispatch();
  const wishlist     = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding]   = useState(false);

  const discount = calculateDiscount(product.originalPrice, product.price);
  const brand    = product.name.split(" ")[0];
  const badge    = getProductBadge(product, index);

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
    if (!isWishlisted) toast.success(`${product.name} saved to wishlist`);
  };

  if (layout === "list") return <ListCard product={product} index={index} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-gray-200 transition-all duration-200 h-full overflow-hidden"
    >
      {/* ── Image Zone ── */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={index < 6}
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-108"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={cn(
            "absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all z-10",
            isWishlisted
              ? "text-red-500 scale-110"
              : "text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:scale-105"
          )}
        >
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
        </button>

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-[#DC2626] text-white text-[9px] font-black px-2 py-0.5 rounded z-10">
            {discount}% OFF
          </div>
        )}

        {/* Product label badge */}
        {badge && !discount && (
          <div className={cn("absolute top-2.5 left-2.5 text-[9px] font-black px-2 py-0.5 rounded z-10", badge.color)}>
            {badge.label}
          </div>
        )}

        {/* Quick Add bar — slides up on hover */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 transition-transform duration-300",
          isHovered ? "translate-y-0" : "translate-y-full"
        )}>
          <button
            disabled={isAdding}
            onClick={handleAddToCart}
            className={cn(
              "w-full h-10 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider transition-all",
              isAdding
                ? "bg-emerald-500 text-white"
                : "bg-[#0A0A0A] text-white hover:bg-gray-900"
            )}
          >
            {isAdding
              ? <><Check className="w-3.5 h-3.5" /> Added</>
              : <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
            }
          </button>
        </div>
      </Link>

      {/* ── Info Zone ── */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        {/* Brand */}
        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{brand}</p>

        {/* Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[34px] hover:text-blue-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex items-center gap-1 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
            <span>{product.rating.toFixed(1)}</span>
            <Star className="w-2.5 h-2.5 fill-white" />
          </div>
          <span className="text-[10px] text-gray-400 font-medium">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-base font-black text-gray-900 tracking-tight">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through font-medium">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Trust signals */}
        <div className="mt-1 space-y-0.5">
          <p className="text-[9px] font-bold text-emerald-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Free Delivery
          </p>
          {discount > 30 && (
            <p className="text-[9px] font-bold text-blue-600 flex items-center gap-1.5">
              <Zap className="w-2.5 h-2.5" />
              Bank Offer Available
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
