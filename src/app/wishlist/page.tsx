"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Trash2, Plus, Minus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { calculateDiscount } from "@/lib/utils";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get wishlist items from Redux store (assuming similar structure to cart)
  const wishlistState = useSelector((state: RootState) => state.wishlist?.items || []);
  
  useEffect(() => {
    if (wishlistState) {
      setWishlistItems(wishlistState);
      setLoading(false);
    }
  }, [wishlistState]);
  
  const handleRemoveFromWishlist = (id: string) => {
    // This would dispatch removeFromWishlist action in a real implementation
    toast.success('Item removed from wishlist', {
      icon: <Trash2 className="w-4 h-4 text-red-500" />, 
      className: "rounded-[20px] border-red-100 bg-red-50 text-red-900 font-bold"
    });
  };
  
  const handleAddToCart = (item: Product) => {
    // This would dispatch addToCart action in a real implementation
    toast.success(`${item.name} added to cart`, {
      icon: <ShoppingCart className="w-4 h-4 text-emerald-500" />, 
      className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
    });
  };
  
  if (loading || wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8]">
        <Navbar />
        <div className="container-premium py-16">
          <h1 className="h1 mb-8">Your Wishlist</h1>
          <div className="bg-white rounded-xl p-8 border border-gray-100 max-w-3xl mx-auto">
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-[#DC2626] mx-auto mb-4" />
              <h2 className="h2 mb-2">Your wishlist is empty</h2>
              <p className="text-lg text-[#555555] mb-6">Start adding your favorite products to your wishlist.</p>
              <Link href="/" className="btn-premium btn-primary !h-12 !px-8">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      
      <div className="container-premium py-12">
        <h1 className="h1 mb-8">Your Wishlist</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <h2 className="h2">Wishlist ({wishlistItems.length})</h2>
                <button className="text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors">
                  Clear All
                </button>
              </div>
              
              <AnimatePresence>
                {wishlistItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-start gap-6 py-6 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#111111]">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold">₹{Math.round(item.price / 100).toLocaleString()}</span>
                        {calculateDiscount(item.originalPrice, item.price) > 0 && (
                          <span className="text-xs text-[#DC2626] font-black">{calculateDiscount(item.originalPrice, item.price)}% OFF</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="btn-premium btn-primary !h-10 !px-4 text-sm"
                        >
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-lg font-bold">₹{Math.round(item.price / 100).toLocaleString()}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Wishlist Summary */}
          <div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 sticky top-24">
              <h2 className="h2 mb-6">Wishlist Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Total Items</span>
                  <span className="font-bold">{wishlistItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Estimated Value</span>
                  <span className="font-bold">₹{Math.round(wishlistItems.reduce((sum, item) => sum + item.price, 0) / 100).toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{Math.round(wishlistItems.reduce((sum, item) => sum + item.price, 0) / 100).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <button className="btn-premium btn-primary w-full !h-14 !px-8 shadow-premium hover:shadow-premium-hover">
                  Add All to Cart
                </button>
                <Link href="/" className="btn-premium w-full !h-14 !px-8 bg-gray-100 text-[#111111] hover:bg-gray-200">
                  Continue Shopping
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#DC2626]" />
                  <div>
                    <p className="font-medium">Save for Later</p>
                    <p className="text-sm text-[#555555]">Products you love but aren't ready to buy yet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}