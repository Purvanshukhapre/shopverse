"use client";

import { useState, useEffect } from "react";
import {
  Heart, ShoppingCart, Shield, Truck, RotateCcw, Share2,
  Plus, Minus, Check, ChevronRight, MapPin, Zap,
  Award, Lock, BadgeCheck, Sparkles
} from "lucide-react";
import { Product } from "@/types";
import Link from "next/link";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import RatingStars from "../shared/RatingStars";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const dispatch     = useAppDispatch();
  const wishlist     = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);

  const [quantity, setQuantity]         = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.variants?.colors?.[0] || "");
  const [selectedSize, setSelectedSize]   = useState(product.variants?.sizes?.[0]  || "");
  const [isAdding, setIsAdding]         = useState(false);
  const [pincode, setPincode]           = useState("");
  const [isScrolledPastCTA, setIsScrolledPastCTA] = useState(false);

  const discount = calculateDiscount(product.originalPrice, product.price);

  useEffect(() => {
    const handleScroll = () => {
      const cta = document.getElementById("main-cta-section");
      if (cta) {
        const rect = cta.getBoundingClientRect();
        setIsScrolledPastCTA(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(addToCart({ ...product, quantity, selectedColor, selectedSize }));
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    if (!isWishlisted) toast.success("Saved to Wishlist");
  };

  return (
    <div className="flex flex-col gap-10"> {/* 32px-40px Vertical breathing room */}

      {/* ── 1. Header & Title (Hierarchy) ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#DCFCE7] text-[#15803D] text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm">
            <BadgeCheck className="w-3 h-3" />
            Verified Authentic
          </div>
          <div className="flex items-center gap-1 bg-[#F8F8F8] text-[#555555] text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border border-gray-100">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Best Seller
          </div>
        </div>
        
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-3xl md:text-4xl font-black text-[#111111] leading-[1.1] tracking-tight">
            {product.name}
          </h1>
          <button
            onClick={handleWishlist}
            className={cn(
              "flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl border-2 transition-all duration-300",
              isWishlisted
                ? "border-[#DC2626] bg-[#FFF1F2] text-[#DC2626]"
                : "border-gray-100 text-[#AAAAAA] hover:border-[#DC2626] hover:text-[#DC2626] hover:bg-red-50"
            )}
          >
            <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
        </div>
      </div>

      {/* ── 2. Price Section (Dramatic) ── */}
      <div className="p-8 rounded-[24px] bg-[#F8F8F8] border border-gray-100 space-y-6">
        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-black text-[#111111] tracking-tighter">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <div className="flex flex-col">
              <span className="text-lg text-[#777777] line-through font-bold">{formatPrice(product.originalPrice)}</span>
              <span className="text-base font-black text-[#DC2626]">{discount}% OFF TOTAL</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Zap,  title: "Bank Offer",   desc: "10% Instant Discount on HDFC Bank Cards" },
            { icon: Award, title: "Special Deal", desc: "Buy 2 and get extra 5% discount" }
          ].map((offer, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-3 shadow-sm hover:shadow-md transition-shadow">
               <offer.icon className="w-5 h-5 text-amber-500 flex-shrink-0" />
               <div className="space-y-0.5">
                 <p className="text-[11px] font-black text-[#111111] uppercase tracking-widest">{offer.title}</p>
                 <p className="text-[11px] text-[#555555] font-medium leading-tight">{offer.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Variants & Qty (Breathing Room) ── */}
      <div className="space-y-8">
        {/* Colors */}
        {product.variants?.colors && (
          <div className="space-y-4">
            <p className="text-[11px] font-black text-[#777777] uppercase tracking-[0.2em]">Select Appearance</p>
            <div className="flex flex-wrap gap-4">
              {product.variants.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-12 h-12 rounded-full border-2 transition-all p-1 hover:scale-110 active:scale-95",
                    selectedColor === color ? "border-[#111111] shadow-xl" : "border-transparent"
                  )}
                >
                  <div className="w-full h-full rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: color.toLowerCase() }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.variants?.sizes && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-[11px] font-black text-[#777777] uppercase tracking-[0.2em]">Choose Size</p>
              <button className="text-[11px] font-black text-[#1D4ED8] uppercase tracking-widest underline underline-offset-4">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.variants.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "min-w-[60px] h-12 px-4 rounded-xl border-2 font-black text-[13px] transition-all active:scale-95",
                    selectedSize === size ? "bg-[#111111] text-white border-[#111111] shadow-xl" : "bg-white text-[#555555] border-gray-100 hover:border-gray-300"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity (Stepper Design) */}
        <div className="space-y-4">
          <p className="text-[11px] font-black text-[#777777] uppercase tracking-[0.2em]">Quantity</p>
          <div className="inline-flex items-center bg-[#F3F4F6] p-1.5 rounded-2xl border border-gray-200">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white transition-all text-[#555555] active:scale-90"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-14 text-center text-sm font-black text-[#111111] tabular-nums">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white transition-all text-[#555555] active:scale-90"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 4. Main CTAs (52px height + Micro-interactions) ── */}
      <div id="main-cta-section" className="flex flex-col sm:flex-row gap-5 pt-6">
        <button
          className="btn-premium flex-1 bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-premium hover:shadow-premium-hover active:scale-95"
        >
          <Zap className="w-5 h-5 mr-3" />
          Express Buy
        </button>
        <button
          disabled={isAdding}
          onClick={handleAddToCart}
          className={cn(
            "btn-premium flex-1 group !bg-white !text-black border-2 border-gray-100 hover:border-black active:scale-95 transition-all duration-500",
            isAdding ? "!bg-[#15803D] !text-white !border-emerald-500" : ""
          )}
        >
          {isAdding ? <><Check className="w-5 h-5 mr-3" /> Added Successfully</> : <><ShoppingCart className="w-5 h-5 mr-3 group-hover:-translate-y-1 transition-transform" /> Add To Bag</>}
        </button>
      </div>

      {/* ── 5. Trust Signals (Subtle Cards) ── */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Truck,     label: "Free Delivery", desc: "On all premium orders" },
          { icon: RotateCcw, label: "30 Day Return", desc: "Hassle-free exchange" },
          { icon: Shield,    label: "Safe Payment",  desc: "SSL Secured Gateway" },
          { icon: Lock,      label: "Authentic",     desc: "100% Genuine Items" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-gray-100 text-center space-y-2 hover:bg-[#F8F8F8] transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-1">
              <item.icon className="w-5 h-5 text-[#555555]" />
            </div>
            <p className="text-[11px] font-black text-[#111111] uppercase tracking-widest">{item.label}</p>
            <p className="text-[10px] text-[#777777] font-medium leading-tight">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ── 6. Mobile Sticky CTA Bar ── */}
      <AnimatePresence>
        {isScrolledPastCTA && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="mobile-sticky-cta lg:hidden"
          >
            <div className="flex-1">
              <p className="text-[10px] font-black text-[#777777] uppercase tracking-widest leading-none mb-1">Total Price</p>
              <p className="text-lg font-black text-[#111111] leading-none">{formatPrice(product.price)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="h-12 px-8 bg-[#111111] text-white font-black text-[11px] uppercase tracking-widest rounded-xl shadow-xl shadow-black/10 active:scale-95"
            >
               Add To Bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
