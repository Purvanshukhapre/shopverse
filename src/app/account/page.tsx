import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, User, Mail, Phone, MapPin, Calendar, Settings, LogOut } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

export default function AccountPage() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    toast.success('You have been signed out!', {
      icon: <CheckCircle className="w-4 h-4 text-emerald-500" />, 
      className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
    });
  };

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="h1 mb-4">Account Required</h1>
          <p className="text-lg mb-6">Please sign in to access your account</p>
          <Link href="/auth/login" className="btn-premium btn-primary !h-12 !px-8">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      
      <div className="container-premium py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-premium">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-[#555555]" />
                  </div>
                  <div>
                    <h2 className="h2 font-black text-[#111111]">{user?.name || 'My Account'}</h2>
                    <p className="text-sm text-[#555555]">{user?.email || 'user@example.com'}</p>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  <Link 
                    href="/account" 
                    className="flex items-center gap-3 px-4 py-3 w-full text-sm text-[#111111] hover:bg-gray-50 hover:text-[#DC2626] transition-colors rounded-lg font-bold"
                  >
                    <User className="w-4 h-4" />
                    My Account
                  </Link>
                  <Link 
                    href="/orders" 
                    className="flex items-center gap-3 px-4 py-3 w-full text-sm text-[#555555] hover:bg-gray-50 hover:text-[#DC2626] transition-colors rounded-lg"
                  >
                    <Package className="w-4 h-4" />
                    Orders
                  </Link>
                  <Link 
                    href="/wishlist" 
                    className="flex items-center gap-3 px-4 py-3 w-full text-sm text-[#555555] hover:bg-gray-50 hover:text-[#DC2626] transition-colors rounded-lg"
                  >
                    <Heart className="w-4 h-4" />
                    Wishlist
                  </Link>
                  <Link 
                    href="/account/settings" 
                    className="flex items-center gap-3 px-4 py-3 w-full text-sm text-[#555555] hover:bg-gray-50 hover:text-[#DC2626] transition-colors rounded-lg"
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-premium">
                <h2 className="h2 mb-6">My Account</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="h3 font-bold text-[#111111] mb-2">Personal Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="text-sm text-[#555555]">Name</span>
                          <span className="font-bold text-[#111111]">{user?.name || 'John Doe'}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="text-sm text-[#555555]">Email</span>
                          <span className="font-bold text-[#111111]">{user?.email || 'john@example.com'}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="text-sm text-[#555555]">Phone</span>
                          <span className="font-bold text-[#111111]">+91 98765 43210</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="h3 font-bold text-[#111111] mb-2">Account Security</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="text-sm text-[#555555]">Password</span>
                          <span className="font-bold text-[#111111]">••••••••••</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="text-sm text-[#555555]">Two-Factor Auth</span>
                          <span className="font-bold text-[#111111]">Disabled</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="h3 font-bold text-[#111111] mb-2">Shipping Address</h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-bold text-[#111111] mb-1">John Doe</p>
                        <p className="text-sm text-[#555555] mb-1">123 Main Street</p>
                        <p className="text-sm text-[#555555] mb-1">Mumbai, Maharashtra 400001</p>
                        <p className="text-sm text-[#555555]">India</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="h3 font-bold text-[#111111] mb-2">Payment Methods</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                              <span className="font-bold text-blue-700">VISA</span>
                            </div>
                            <div>
                              <p className="font-bold text-[#111111]">•••• 4242</p>
                              <p className="text-xs text-[#555555]">Expires 12/25</p>
                            </div>
                          </div>
                          <span className="text-sm text-[#555555]">Default</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                              <span className="font-bold text-green-700">UPI</span>
                            </div>
                            <div>
                              <p className="font-bold text-[#111111]">john@example.upi</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="h3 font-bold text-[#111111] mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#111111]">Order #SHOPE-2023-001</p>
                        <p className="text-sm text-[#555555]">Placed on May 10, 2023 • ₹2,499</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#111111]">Order #SHOPE-2023-002</p>
                        <p className="text-sm text-[#555555]">Shipped on May 8, 2023 • ₹1,299</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                        <Heart className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#111111]">Added to Wishlist</p>
                        <p className="text-sm text-[#555555]">iPhone 14 Pro • ₹1,29,900</p>
                      </div>
                    </div>
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