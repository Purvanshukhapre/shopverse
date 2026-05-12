"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Mail, Loader2, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address', {
        icon: <AlertTriangle className="w-4 h-4 text-red-500" />, 
        className: "rounded-[20px] border-red-100 bg-red-50 text-red-900 font-bold"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Password reset email sent!', {
        icon: <CheckCircle className="w-4 h-4 text-emerald-500" />, 
        className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
      });
      // In a real app, this would redirect to success page
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
            <h1 className="h1 mb-4">Reset Your Password</h1>
            <p className="text-xl mb-6">Enter your email to receive reset instructions</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              We&apos;ll send you a link to reset your password. Please check your inbox and spam folder.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-premium">
            <h2 className="h2 text-center mb-8">Forgot Your Password?</h2>
            
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
                <p className="text-xs text-[#555555] mt-2">
                  Enter the email address associated with your account. We&apos;ll send you instructions to reset your password.
                </p>
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
                Send Reset Link
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-[#555555] mb-4">Remember your password?</p>
              <Link href="/auth/login" className="btn-premium w-full !h-14 !px-8 bg-gray-100 text-[#111111] hover:bg-gray-200">
                Sign In
              </Link>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-[#555555]">
                Need help? Contact our support team at <a href="mailto:support@shopverse.io" className="text-[#DC2626] hover:text-[#B91C1C] font-semibold">support@shopverse.io</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}