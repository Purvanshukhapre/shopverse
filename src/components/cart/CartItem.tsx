"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, Heart } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
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
  const savings  = (item.originalPrice - item.price) * item.quantity;

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
    toast.error(`${item.name} removed from cart`);
  };

  const handleMoveToWishlist = () => {
    dispatch(toggleWishlist(item));
    dispatch(removeFromCart({
      id: item.id,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    }));
    toast.success(`${item.name} moved to wishlist`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
      <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5">
        {/* Product Image */}
        <Link
          href={`/product/${item.slug}`}
          className="relative w-full sm:w-28 aspect-square flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100"
        >
          <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
          {discount > 0 && (
            <div className="absolute top-1.5 left-1.5 bg-[#DC2626] text-white text-[8px] font-black px-1.5 py-0.5 rounded">
              {discount}% OFF
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Top row: name + remove */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{item.category}</p>
              <Link href={`/product/${item.slug}`}>
                <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 hover:text-blue-700 transition-colors">
                  {item.name}
                </h3>
              </Link>
              {/* Variants */}
              {(item.selectedColor || item.selectedSize) && (
                <div className="flex items-center gap-3 mt-1.5">
                  {item.selectedColor && (
                    <span className="text-[10px] text-gray-500 font-medium">
                      Color: <span className="font-bold text-gray-700">{item.selectedColor}</span>
                    </span>
                  )}
                  {item.selectedSize && (
                    <span className="text-[10px] text-gray-500 font-medium">
                      Size: <span className="font-bold text-gray-700">{item.selectedSize}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={handleRemove}
              className="flex-shrink-0 p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-black text-gray-900 tracking-tight">{formatPrice(item.price)}</span>
            {item.originalPrice > item.price && (
              <span className="text-xs text-gray-400 line-through font-medium">{formatPrice(item.originalPrice)}</span>
            )}
            {discount > 0 && (
              <span className="text-xs font-black text-[#DC2626]">{discount}% off</span>
            )}
          </div>

          {savings > 0 && (
            <p className="text-[10px] font-bold text-emerald-600 mt-0.5">
              You save: {formatPrice(savings)}
            </p>
          )}

          {/* Delivery */}
          <p className="text-[10px] font-bold text-emerald-600 mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Free Delivery by Tomorrow
          </p>

          {/* Bottom row: qty + subtotal + wishlist */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
            {/* Quantity Selector */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-9 text-center text-sm font-black text-gray-900">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleMoveToWishlist}
                className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-red-500 transition-colors"
              >
                <Heart className="w-3.5 h-3.5" />
                Save for Later
              </button>

              <div className="text-right">
                <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">Subtotal</p>
                <p className="text-sm font-black text-gray-900">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
