"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, Heart, ShieldCheck } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { updateQuantity, removeFromCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { toast } from "sonner";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const discount = calculateDiscount(item.originalPrice, item.price);

  const handleUpdateQuantity = (newQty: number) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({
      id: item.id,
      quantity: newQty,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart({
      id: item.id,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    }));
    toast.error("Item removed from bag");
  };

  const handleMoveToWishlist = () => {
    dispatch(toggleWishlist(item));
    dispatch(removeFromCart({
      id: item.id,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    }));
    toast.success("Moved to Wishlist");
  };

  return (
    <div className="group p-6 sm:p-8 hover:bg-[#FBFBFB] transition-colors">
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        
        {/* 1. Image Area (Geometry Fixed) */}
        <Link
          href={`/product/${item.slug}`}
          className="relative w-full sm:w-32 aspect-[4/5] flex-shrink-0 rounded-[12px] overflow-hidden bg-[#F8F8F8] border border-gray-100 group-hover:shadow-lg transition-all"
        >
          <Image src={item.image} alt={item.name} fill className="object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-[#DC2626] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
              -{discount}%
            </div>
          )}
        </Link>

        {/* 2. Content Area (Hierarchy) */}
        <div className="flex flex-col flex-1 min-w-0 w-full">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-[#777777] uppercase tracking-[0.2em]">{item.category}</p>
              <Link href={`/product/${item.slug}`}>
                <h3 className="text-lg font-bold text-[#111111] leading-tight hover:text-[#DC2626] transition-colors line-clamp-1">
                  {item.name}
                </h3>
              </Link>
              
              {/* Variant Details */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                {item.selectedColor && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: item.selectedColor.toLowerCase() }} />
                    <span className="text-[11px] font-bold text-[#555555] uppercase tracking-widest">{item.selectedColor}</span>
                  </div>
                )}
                {item.selectedSize && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black text-[#777777] uppercase tracking-widest">Size:</span>
                    <span className="text-[11px] font-black text-[#111111] bg-gray-100 px-2 py-0.5 rounded uppercase">{item.selectedSize}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Section (High Contrast) */}
            <div className="text-right flex flex-col items-end">
               <span className="text-xl font-black text-[#111111] tracking-tight">{formatPrice(item.price * item.quantity)}</span>
               {item.quantity > 1 && (
                 <span className="text-[10px] font-bold text-[#777777] uppercase tracking-widest mt-1">
                   {formatPrice(item.price)} each
                 </span>
               )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] rounded-md border border-emerald-100">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">Premium Quality</span>
             </div>
             <span className="text-[10px] font-bold text-[#777777] uppercase tracking-widest">Free Express Shipping</span>
          </div>

          {/* 3. Action Row (Stepper + Actions) */}
          <div className="flex items-center justify-between mt-8">
            {/* Professional Stepper (Segmented) */}
            <div className="inline-flex items-center bg-[#F3F4F6] p-1 rounded-xl border border-gray-100 shadow-inner">
              <button
                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-all text-[#555555] disabled:opacity-30 active:scale-90"
                disabled={item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-12 text-center text-sm font-black text-[#111111] tabular-nums">
                {item.quantity}
              </div>
              <button
                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-all text-[#555555] active:scale-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={handleMoveToWishlist}
                className="flex items-center gap-2 text-[11px] font-black text-[#555555] hover:text-[#DC2626] uppercase tracking-widest transition-colors"
              >
                <Heart className="w-4 h-4" />
                Move to Wishlist
              </button>
              <button
                onClick={handleRemove}
                className="flex items-center gap-2 text-[11px] font-black text-[#555555] hover:text-[#111111] uppercase tracking-widest transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
