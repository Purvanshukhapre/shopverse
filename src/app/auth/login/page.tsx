"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      dispatch(login({ 
        user: { id: '1', name: 'John Doe', email: email }, 
        token: 'fake-jwt-token' 
      }));
      toast.success('Login successful!', {
        icon: <CheckCircle className="w-4 h-4 text-emerald-500" />, 
        className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
      });
      // In a real app, this would redirect to dashboard or home
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Banner Section (65%) */}
      <div className="w-2/3 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Welcome Back</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-md mx-auto">
              Sign in to access your personalized shopping experience, order tracking, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Secure checkout</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Truck className="w-5 h-5" />
                <span className="text-sm">Free shipping on orders above ₹499</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Shield className="w-5 h-5" />
                <span className="text-sm">100% secure payments</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right Content Card (35%) */}
      <div className="w-1/3 flex items-center justify-center p-8 bg-[#F8F8F8]">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-premium"
          >
            <div className="text-center mb-8">
              <h2 className="h2 text-center mb-2">Sign In to Your Account</h2>
              <p className="text-sm text-[#555555]">Access your orders, wishlist, and personalized recommendations</p>
            </div>
            
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}