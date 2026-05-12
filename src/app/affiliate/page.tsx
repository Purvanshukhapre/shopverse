"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Truck, Shield, Users, Package, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function AffiliatePage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get affiliate program information products
        const affiliateProducts = allProducts.filter(p => p.category === 'Electronics' || p.category === 'Fashion');
        setProducts(affiliateProducts);
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
            <h1 className="h1 mb-4">Affiliate Program</h1>
            <p className="text-xl mb-6">Earn money by promoting ShopEverse products</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              Join our exclusive affiliate program and earn commissions on every sale you refer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-premium btn-primary !h-12 !px-8">
                Browse All Products
              </Link>
              <Link href="/contact" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Program Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="h3 mb-2">Up to 15% Commission</h3>
            <p className="text-[#555555]">Competitive rates across categories</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="h3 mb-2">Real-time Tracking</h3>
            <p className="text-[#555555]">Monitor clicks & conversions</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="h3 mb-2">Easy Payouts</h3>
            <p className="text-[#555555]">Monthly payments via bank transfer</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="h3 mb-2">Dedicated Support</h3>
            <p className="text-[#555555]">Personal account manager</p>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="mb-16">
          <h2 className="h2 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <div className="w-6 h-6 rounded-full bg-[#DC2626] flex items-center justify-center text-white font-bold text-sm">1</div>
              </div>
              <h3 className="h3 mb-2">Sign Up</h3>
              <p className="text-[#555555] mb-4">Create your free affiliate account in minutes</p>
              <Link href="/auth/signup" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                Get Started →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <div className="w-6 h-6 rounded-full bg-[#DC2626] flex items-center justify-center text-white font-bold text-sm">2</div>
              </div>
              <h3 className="h3 mb-2">Promote Products</h3>
              <p className="text-[#555555] mb-4">Share unique links & banners with your audience</p>
              <Link href="/dashboard" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                Access Dashboard →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <div className="w-6 h-6 rounded-full bg-[#DC2626] flex items-center justify-center text-white font-bold text-sm">3</div>
              </div>
              <h3 className="h3 mb-2">Earn Commissions</h3>
              <p className="text-[#555555] mb-4">Get paid monthly for every successful referral</p>
              <Link href="/affiliates/payouts" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                View Earnings →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="h2">Top Performing Products</h2>
            <Link href="/search" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
              Browse All →
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
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
          
          {products.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="h3 mb-2">No Featured Products Available</h3>
              <p className="text-[#555555] mb-6">We&apos;re working on expanding our top performing products. Check back soon!</p>
              <Link href="/" className="btn-premium btn-primary !h-12 !px-8">
                Browse All Products
              </Link>
            </div>
          )}
        </div>
        
        {/* FAQ */}
        <div className="mb-16">
          <h2 className="h2 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="h3 mb-2">What is the commission rate?</h3>
              <p className="text-[#555555]">Commission rates vary by category, ranging from 5% to 15%. Electronics typically offer higher commissions than fashion items.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="h3 mb-2">How are sales tracked?</h3>
              <p className="text-[#555555]">We use cookie-based tracking that lasts for 30 days. If a customer clicks your link and makes a purchase within that timeframe, you&apos;ll receive credit.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="h3 mb-2">When do I get paid?</h3>
              <p className="text-[#555555]">Payments are processed monthly on the 1st of each month for commissions earned in the previous month. Minimum payout threshold is ₹1,000.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}