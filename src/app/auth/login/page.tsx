"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Login successful!', {
        icon: <CheckCircle className="w-4 h-4 text-emerald-500" />, 
        className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
      });
      // In a real app, this would redirect to dashboard or home
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#111111] to-[#333333] text-white py-24">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-center"
          >
            <h1 className="h1 mb-4">Welcome Back</h1>
            <p className="text-xl mb-6">Sign in to your ShopEverse account</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              Access your orders, wishlist, and personalized shopping experience.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-premium">
            <h2 className="h2 text-center mb-8">Sign In to Your Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#111111] mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 pl-12 pr-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#111111] mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 pl-12 pr-12 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#DC2626] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#DC2626] border-gray-300 rounded focus:ring-[#DC2626]"
                  />
                  <span className="ml-2 text-sm text-[#555555]">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-[#DC2626] hover:text-[#B91C1C] font-semibold">
                  Forgot password?
                </Link>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="btn-premium btn-primary w-full !h-14 !px-8 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                Sign In
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-[#555555] mb-4">Don't have an account?</p>
              <Link href="/auth/signup" className="btn-premium w-full !h-14 !px-8 bg-gray-100 text-[#111111] hover:bg-gray-200">
                Create Account
              </Link>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-[#555555]">Or continue with</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </button>
                <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                </button>
                <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}