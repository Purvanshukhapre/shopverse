"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, CreditCard, MapPin, Phone, Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { CartItem } from "@/types";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function CheckoutPage() {
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
  
  if (loading || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8]">
        <Navbar />
        <div className="container-premium py-16">
          <h1 className="h1 mb-8">Checkout</h1>
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626] mx-auto mb-4"></div>
              <p className="text-lg text-[#555555]">Loading your order details...</p>
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
        <h1 className="h1 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <h2 className="h2 mb-6">Order Summary</h2>
            
            <div className="space-y-6">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-b-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#111111]">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold">₹{Math.round(item.price / 100).toLocaleString()}</span>
                      <span className="text-sm text-[#AAAAAA]">x {item.quantity}</span>
                    </div>
                    {item.selectedColor && (
                      <div className="mt-2 text-sm text-[#777777]">
                        Color: <span className="font-medium">{item.selectedColor}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">₹{Math.round((item.price * item.quantity) / 100).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Subtotal</span>
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
                <div className="flex justify-between pt-4 border-t border-gray-100 mt-4">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">₹{Math.round(total / 100).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping & Payment */}
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <h2 className="h2 mb-6">Shipping & Payment</h2>
            
            <div className="space-y-8">
              {/* Shipping Address */}
              <div>
                <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-[#DC2626]" />
                    <h4 className="font-semibold">John Doe</h4>
                  </div>
                  <p className="text-[#555555] mb-2">123 Main Street</p>
                  <p className="text-[#555555] mb-2">Mumbai, Maharashtra 400001</p>
                  <p className="text-[#555555]">India</p>
                  <div className="mt-4 flex gap-3">
                    <button className="btn-premium !h-12 !px-6 text-sm">
                      Edit Address
                    </button>
                    <button className="btn-premium btn-primary !h-12 !px-6 text-sm">
                      Add New
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div>
                <h3 className="font-bold text-lg mb-4">Payment Method</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-sm text-[#555555]">Expires 12/2026</div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-[#DC2626] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#DC2626]"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">ShopEverse Pay</div>
                      <div className="text-sm text-[#555555]">Pay with your ShopEverse balance</div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-[#555555]">Pay when your order is delivered</div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                  </div>
                </div>
              </div>
              
              {/* Place Order Button */}
              <div className="pt-6">
                <button className="btn-premium btn-primary w-full !h-14 !px-8 shadow-premium hover:shadow-premium-hover">
                  <Zap className="w-5 h-5 mr-2" />
                  Place Order - ₹{Math.round(total / 100).toLocaleString()}
                </button>
                <p className="text-center text-sm text-[#555555] mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}