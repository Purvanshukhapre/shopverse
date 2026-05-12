"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Store, DollarSign, Calendar, Users2, Rocket, Trophy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function SellPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the sell page
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
            <h1 className="h1 mb-4">Sell on ShopEverse</h1>
            <p className="text-xl mb-6">Join India&apos;s fastest-growing premium marketplace</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              Reach millions of customers with our powerful selling platform and premium brand positioning.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/seller/signup" className="btn-premium btn-primary !h-12 !px-8">
                Start Selling Today
              </Link>
              <Link href="/seller/guide" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Seller Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Why Sell With Us */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Why Sell on ShopEverse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Store className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Premium Marketplace</h3>
              <p className="text-[#555555]">
                Position your brand alongside premium retailers and reach high-value customers who expect quality.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Competitive Fees</h3>
              <p className="text-[#555555]">
                Industry-leading commission rates starting at just 8%, with no hidden fees or subscription costs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Fast Setup</h3>
              <p className="text-[#555555]">
                Get your store live in under 24 hours with our streamlined onboarding process and dedicated support.
              </p>
            </div>
          </div>
        </section>
        
        {/* Seller Benefits */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Seller Benefits</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="h3 font-bold text-[#111111] mb-2">Priority Customer Support</h3>
                  <p className="text-[#555555] mb-4">
                    Dedicated account manager and 24/7 seller support team to help you grow your business.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="h3 font-bold text-[#111111] mb-2">Flexible Inventory Management</h3>
                  <p className="text-[#555555] mb-4">
                    Real-time inventory sync, automated stock alerts, and seamless integration with your existing systems.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <Users2 className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="h3 font-bold text-[#111111] mb-2">Marketing & Promotion</h3>
                  <p className="text-[#555555] mb-4">
                    Access to ShopEverse&apos;s marketing programs, sponsored listings, and promotional campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="h2">Featured Products</h2>
            <Link href="/" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
              View All →
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
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-2xl p-12 text-center">
          <h2 className="h2 mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers who are growing their brands with ShopEverse.
          </p>
          <Link href="/seller/signup" className="btn-premium btn-primary !h-14 !px-8 text-lg">
            Get Started Today
          </Link>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}