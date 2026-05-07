"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import RatingStars from "./RatingStars";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const discount = calculateDiscount(product.originalPrice, product.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col h-full relative bg-white rounded-xl shadow-sm shadow-black/[0.03] border border-[#E5E5E5] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:border-[#D1D1D1] hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F8F8]">
        {/* Skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#F3F4F6] animate-pulse" />
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#DC2626] text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}

        {/* Product Badge */}
        {product.badge && (
          <div className="absolute top-3 right-12 bg-[#0A0A0A] text-white text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wider">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? "fill-[#DC2626] text-[#DC2626]"
                : "text-[#525252]"
            }`}
          />
        </motion.button>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-20">
          <div className="flex gap-2">
            <button className="flex-1 bg-[#0A0A0A] text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#333333] transition-colors">
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </button>
            <button className="w-10 bg-white text-[#0A0A0A] border border-[#E5E5E5] rounded-lg flex items-center justify-center hover:bg-[#F8F8F8] transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <p className="text-[11px] md:text-xs text-[#9CA3AF] uppercase tracking-wider mb-1.5 font-semibold">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-[#0A0A0A] line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base md:text-lg font-bold text-[#0A0A0A]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-[#9CA3AF] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

          {product.inStock && (
            <p className="text-[11px] md:text-xs text-[#16A34A] font-medium mt-1.5">
              In Stock
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
