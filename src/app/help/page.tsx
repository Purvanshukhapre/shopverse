"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, HelpCircle, Search, Calendar, Phone, Mail, BookOpen, Lightbulb, Headphones, User, Package2, CreditCard } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function HelpPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the help page
        const featuredProducts = allProducts.slice(0, 4);
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [pathname]);
  
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
            className="max-w-3xl"
          >
            <h1 className="h1 mb-4">Help & Support</h1>
            <p className="text-xl mb-6">Find answers to your questions and get support</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              We're here to help you with everything from account management to technical issues.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/help/search" className="btn-premium btn-primary !h-12 !px-8">
                Search Help Center
              </Link>
              <Link href="/help/contact" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Search Bar */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA]" />
              <input
                type="text"
                placeholder="Search for answers, topics, or keywords..."
                className="w-full h-14 pl-12 pr-4 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent text-base"
              />
            </div>
          </div>
        </section>
        
        {/* Popular Topics */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/help/account" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Account Management</h3>
              <p className="text-[#555555] text-sm">
                Create, update, and manage your ShopEverse account settings.
              </p>
            </Link>
            
            <Link href="/help/orders" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Package2 className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Orders & Shipping</h3>
              <p className="text-[#555555] text-sm">
                Track orders, understand shipping options, and manage deliveries.
              </p>
            </Link>
            
            <Link href="/help/returns" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Returns & Exchanges</h3>
              <p className="text-[#555555] text-sm">
                Initiate returns, process exchanges, and track return status.
              </p>
            </Link>
            
            <Link href="/help/payment" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Payment Methods</h3>
              <p className="text-[#555555] text-sm">
                Add, edit, and manage payment methods for secure checkout.
              </p>
            </Link>
            
            <Link href="/help/security" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Security & Privacy</h3>
              <p className="text-[#555555] text-sm">
                Understand our security measures and privacy policies.
              </p>
            </Link>
            
            <Link href="/help/technical" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Technical Support</h3>
              <p className="text-[#555555] text-sm">
                Troubleshoot website issues, app problems, and technical errors.
              </p>
            </Link>
          </div>
        </section>
        
        {/* Help Center Categories */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Help Center Categories</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <h3 className="h3 font-bold text-[#111111]">Getting Started</h3>
                </div>
                <ChevronDown className="w-5 h-5 text-[#555555]" />
              </div>
              <div className="mt-4 pl-14 space-y-2 text-sm">
                <p className="text-[#555555]">• How to create an account</p>
                <p className="text-[#555555]">• Setting up your profile</p>
                <p className="text-[#555555]">• Navigating the website</p>
                <p className="text-[#555555]">• Understanding product pages</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <h3 className="h3 font-bold text-[#111111]">Shopping & Checkout</h3>
                </div>
                <ChevronDown className="w-5 h-5 text-[#555555]" />
              </div>
              <div className="mt-4 pl-14 space-y-2 text-sm">
                <p className="text-[#555555]">• Adding items to cart</p>
                <p className="text-[#555555]">• Using coupons and discounts</p>
                <p className="text-[#555555]">• Completing checkout</p>
                <p className="text-[#555555]">• Order confirmation process</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <h3 className="h3 font-bold text-[#111111]">Shipping & Delivery</h3>
                </div>
                <ChevronDown className="w-5 h-5 text-[#555555]" />
              </div>
              <div className="mt-4 pl-14 space-y-2 text-sm">
                <p className="text-[#555555]">• Shipping options and costs</p>
                <p className="text-[#555555]">• Delivery time estimates</p>
                <p className="text-[#555555]">• Tracking your order</p>
                <p className="text-[#555555]">• International shipping</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="h2">Recommended Products</h2>
            <Link href="/" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
              Browse All →
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  index={idx}
                  layout="grid"
                />
              ))}
            </div>
          )}
        </section>
        
        {/* Support Options */}
        <section className="text-center">
          <h2 className="h2 mb-6">Need Immediate Assistance?</h2>
          <p className="text-lg text-[#555555] mb-8 max-w-2xl mx-auto">
            Our support team is available to help you with any questions or issues you may have.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/help/live-chat" className="btn-premium btn-primary !h-14 !px-8">
              Live Chat
            </Link>
            <Link href="/help/phone" className="btn-premium !h-14 !px-8 bg-white text-[#111111] hover:bg-gray-100">
              Call Us
            </Link>
            <Link href="/help/email" className="btn-premium !h-14 !px-8 bg-white text-[#111111] hover:bg-gray-100">
              Email Us
            </Link>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}