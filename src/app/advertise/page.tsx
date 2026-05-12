"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function AdvertisePage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get advertising information products
        const advertiseProducts = allProducts.filter(p => p.category === 'Electronics' || p.category === 'Fashion');
        setProducts(advertiseProducts);
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
            <h1 className="h1 mb-4">Advertise Your Products</h1>
            <p className="text-xl mb-6">Reach millions of customers with ShopEverse&apos;s powerful advertising platform</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              Drive sales and increase brand visibility with targeted advertising solutions designed specifically for e-commerce.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sell" className="btn-premium btn-primary !h-12 !px-8">
                Sell on ShopEverse
              </Link>
              <Link href="/contact" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Advertising Solutions */}
        <div className="mb-16">
          <h2 className="h2 mb-8">Advertising Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Sponsored Products</h3>
              <p className="text-[#555555] mb-4">Get your products featured at the top of search results and category pages.</p>
              <Link href="/advertise/sponsored-products" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                Learn More →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Display Advertising</h3>
              <p className="text-[#555555] mb-4">Banner ads across our website and mobile app to build brand awareness.</p>
              <Link href="/advertise/display" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                Learn More →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Influencer Marketing</h3>
              <p className="text-[#555555] mb-4">Connect with our network of trusted influencers to promote your products.</p>
              <Link href="/advertise/influencers" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Why Advertise With Us */}
        <div className="mb-16">
          <h2 className="h2 mb-8">Why Advertise With ShopEverse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Massive Audience</h3>
              <p className="text-[#555555]">Reach over 10 million monthly active users across India.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">High Intent Traffic</h3>
              <p className="text-[#555555]">Our users are actively shopping and ready to buy.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Advanced Targeting</h3>
              <p className="text-[#555555]">Target by demographics, interests, purchase behavior, and more.</p>
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
        
        {/* Get Started */}
        <div className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="h2 mb-4">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of brands that have increased their sales with ShopEverse advertising.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sell" className="btn-premium btn-primary !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Start Selling
              </Link>
              <Link href="/contact" className="btn-premium !h-12 !px-8 bg-transparent border-2 border-white hover:bg-white/10">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}