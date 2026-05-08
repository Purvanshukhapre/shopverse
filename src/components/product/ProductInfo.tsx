"use client";

import { useState } from "react";
import {
  Heart, ShoppingCart, Shield, Truck, RotateCcw, Share2,
  Plus, Minus, Check, ChevronRight, MapPin, Zap, Star,
  Package, Award, Info
} from "lucide-react";
import { Product } from "@/types";
import Link from "next/link";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { toast } from "sonner";

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
  const [pincodeChecked, setPincodeChecked] = useState(false);

  const discount = calculateDiscount(product.originalPrice, product.price);
  const savings  = product.originalPrice - product.price;

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(addToCart({ ...product, quantity, selectedColor, selectedSize }));
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    if (!isWishlisted) toast.success(`${product.name} saved to wishlist`);
  };

  return (
    <div className="flex flex-col gap-5">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 uppercase tracking-widest">
        <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-gray-700 transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600 font-semibold truncate max-w-[180px]">{product.name}</span>
      </nav>

      {/* ── Title ── */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
            {product.name}
          </h1>
          <button
            onClick={handleWishlist}
            className={cn(
              "flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all",
              isWishlisted
                ? "border-red-400 bg-red-50 text-red-500"
                : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
            )}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </button>
        </div>

        {/* Rating row */}
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <div className="flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
            <span>{product.rating.toFixed(1)}</span>
            <Star className="w-3 h-3 fill-white" />
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {product.reviewCount.toLocaleString()} Ratings & Reviews
          </span>
          <div className="h-3 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-emerald-600">In Stock</span>
          </div>
          <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors ml-auto">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>

      {/* ── Price Block ── */}
      <div className="bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
        <div className="flex items-baseline flex-wrap gap-2 mb-3">
          <span className="text-3xl font-black text-gray-900 tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-base text-gray-400 line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-base font-black text-[#DC2626]">
                {discount}% off
              </span>
            </>
          )}
        </div>
        {savings > 0 && (
          <p className="text-xs font-bold text-emerald-600 mb-3">
            You save: {formatPrice(savings)} 🎉
          </p>
        )}

        {/* Available Offers */}
        <div className="border-t border-gray-200 pt-3">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2.5">Available Offers</p>
          <div className="space-y-2">
            <div className="flex gap-2.5 items-start">
              <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Bank Offer</p>
                <p className="text-[11px] text-gray-500">10% off on HDFC Bank Credit Cards, up to ₹1,500</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <RotateCcw className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">No Cost EMI</p>
                <p className="text-[11px] text-gray-500">EMI from ₹{Math.round(product.price / 12).toLocaleString("en-IN")}/month</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Package className="w-3 h-3 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Partner Offer</p>
                <p className="text-[11px] text-gray-500">Buy 2 get 5% extra off. <span className="text-blue-600 font-bold cursor-pointer">View more</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Color Selector ── */}
      {product.variants?.colors && (
        <div>
          <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2.5">
            Color: <span className="text-gray-900 font-bold">{selectedColor}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "w-10 h-10 rounded-full border-2 p-0.5 transition-all",
                  selectedColor === color ? "border-gray-900 scale-110 shadow-md" : "border-transparent hover:scale-105 hover:border-gray-300"
                )}
              >
                <div
                  className="w-full h-full rounded-full border border-black/10"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Size Selector ── */}
      {product.variants?.sizes && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-black text-gray-500 uppercase tracking-wider">
              Size: <span className="text-gray-900 font-bold">{selectedSize}</span>
            </p>
            <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.variants.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "min-w-[44px] h-10 px-3 text-xs font-bold rounded-lg border-2 transition-all",
                  selectedSize === size
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-700 hover:border-gray-600 hover:text-gray-900"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Quantity ── */}
      <div className="flex items-center gap-3">
        <p className="text-xs font-black text-gray-500 uppercase tracking-wider">Qty:</p>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center text-sm font-black text-gray-900">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">Max 10 per order</span>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="flex gap-3">
        <button
          disabled={isAdding}
          onClick={handleAddToCart}
          className={cn(
            "flex-1 h-13 py-3.5 flex items-center justify-center gap-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md",
            isAdding
              ? "bg-emerald-500 text-white shadow-emerald-200"
              : "bg-[#FF9F00] text-gray-900 hover:bg-[#f09000] active:scale-[0.98] shadow-amber-200"
          )}
        >
          {isAdding
            ? <><Check className="w-4 h-4" /> Added to Cart</>
            : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
          }
        </button>
        <Link
          href="/checkout"
          onClick={handleAddToCart}
          className="flex-1 h-13 py-3.5 flex items-center justify-center gap-2.5 rounded-xl bg-[#FB641B] text-white font-black text-xs uppercase tracking-wider hover:bg-[#e55a16] transition-all shadow-md shadow-orange-200 active:scale-[0.98]"
        >
          Buy Now
        </Link>
      </div>

      {/* ── Delivery Info ── */}
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Delivery & Services</p>
        </div>
        <div className="p-4 space-y-3.5">
          {/* Pincode check */}
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                maxLength={6}
                className="flex-1 border-b border-gray-200 pb-0.5 text-xs font-medium text-gray-700 outline-none focus:border-gray-900 placeholder:text-gray-400 bg-transparent"
              />
              <button
                onClick={() => setPincodeChecked(true)}
                className="text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-wider transition-colors flex-shrink-0"
              >
                Check
              </button>
            </div>
          </div>
          {pincodeChecked && pincode.length === 6 && (
            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              Delivery by Tomorrow, FREE
            </p>
          )}

          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-800">Free Delivery</p>
              <p className="text-[10px] text-gray-500">On orders above ₹5,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-800">10 Day Return & Exchange</p>
              <p className="text-[10px] text-gray-500">Read our returns policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-800">1 Year Warranty</p>
              <p className="text-[10px] text-gray-500">Manufacturer warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Seller Info ── */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Sold by: <span className="font-bold text-gray-900">ShopEverse Retail</span></span>
        </div>
        <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
}
