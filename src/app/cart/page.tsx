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
import type { CartItem } from "@/types";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { calculateDiscount } from "@/lib/utils";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get cart items from Redux store
  const cartState = useSelector((state: RootState) => state.cart.items);
  
  useEffect(() => {
    if (cartState) {
      setCartItems(cartState);
      setLoading(false);
    }
  }, [cartState]);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 499 ? 0 : 99;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  
  const handleRemoveItem = (id: string, selectedColor?: string, selectedSize?: string) => {
    // This would dispatch removeFromCart action in a real implementation
    toast.success('Item removed from cart', {
      icon: <Trash2 className="w-4 h-4 text-red-500" />, 
      className: "rounded-[20px] border-red-100 bg-red-50 text-red-900 font-bold"
    });
  };
  
  const handleQuantityChange = (id: string, newQuantity: number, selectedColor?: string, selectedSize?: string) => {
    // This would dispatch updateQuantity action in a real implementation
    if (newQuantity > 0) {
      toast.success(`Quantity updated`, {
        icon: <CheckCircle className="w-4 h-4 text-emerald-500" />, 
        className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
      });
    }
  };
  
  if (loading || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8]">
        <Navbar />
        <div className="container-premium py-16">
          <h1 className="h1 mb-8">Your Shopping Cart</h1>
          <div className="bg-white rounded-xl p-8 border border-gray-100 max-w-3xl mx-auto">
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-[#DC2626] mx-auto mb-4" />
              <h2 className="h2 mb-2">Your cart is empty</h2>
              <p className="text-lg text-[#555555] mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/" className="btn-premium btn-primary !h-12 !px-8">
                Continue Shopping
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
        <h1 className="h1 mb-8">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <h2 className="h2">Cart Items ({cartItems.length})</h2>
                <button className="text-sm text-[#DC2626] hover:text-[#B91C1C] transition-colors">
                  Clear All
                </button>
              </div>
              
              <AnimatePresence>
                {cartItems.map((item, idx) => (
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
                      
                      {item.selectedColor && (
                        <div className="mt-2 text-sm text-[#777777]">
                          Color: <span className="font-medium">{item.selectedColor}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1), item.selectedColor, item.selectedSize)}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveItem(item.id, item.selectedColor, item.selectedSize)}
                          className="text-sm text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-lg font-bold">₹{Math.round((item.price * item.quantity) / 100).toLocaleString()}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 sticky top-24">
              <h2 className="h2 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Subtotal ({cartItems.length} items)</span>
                  <span className="font-bold">₹{Math.round(subtotal / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Shipping</span>
                  <span className="font-bold">₹{shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Tax</span>
                  <span className="font-bold">₹{tax}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{Math.round(total / 100).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <Link href="/checkout" className="btn-premium btn-primary w-full !h-14 !px-8 shadow-premium hover:shadow-premium-hover">
                  Proceed to Checkout
                </Link>
                <Link href="/" className="btn-premium w-full !h-14 !px-8 bg-gray-100 text-[#111111] hover:bg-gray-200">
                  Continue Shopping
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#111111]" />
                  <div>
                    <p className="font-medium">Secure Checkout</p>
                    <p className="text-sm text-[#555555]">All transactions are encrypted and secure</p>
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