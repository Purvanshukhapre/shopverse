"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Newspaper, Calendar, Users2, Globe, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function PressPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the press page
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
            <h1 className="h1 mb-4">Press & Media</h1>
            <p className="text-xl mb-6">News, announcements, and media resources</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              Stay updated with the latest ShopEverse news, product launches, and company announcements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-premium btn-primary !h-12 !px-8">
                Contact Press Team
              </Link>
              <Link href="/media-kit" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Media Kit
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Latest News */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Latest News</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <Newspaper className="w-8 h-8 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-[#555555] mb-2">
                    <span>June 15, 2024</span>
                    <span className="w-1 h-1 bg-[#555555] rounded-full"></span>
                    <span>Press Release</span>
                  </div>
                  <h3 className="h3 font-bold text-[#111111] mb-2">ShopEverse Launches Premium E-commerce Platform in India</h3>
                  <p className="text-[#555555] mb-4">
                    ShopEverse announces the launch of its premium e-commerce platform, redefining online shopping experiences with Amazon and Flipkart-inspired features.
                  </p>
                  <Link href="/press/shopiverse-launch" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                    Read Full Release
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <Users2 className="w-8 h-8 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-[#555555] mb-2">
                    <span>May 22, 2024</span>
                    <span className="w-1 h-1 bg-[#555555] rounded-full"></span>
                    <span>Company News</span>
                  </div>
                  <h3 className="h3 font-bold text-[#111111] mb-2">ShopEverse Appoints New CTO to Lead Engineering Innovation</h3>
                  <p className="text-[#555555] mb-4">
                    Industry veteran joins ShopEverse to accelerate development of next-generation e-commerce technologies and AI-powered shopping experiences.
                  </p>
                  <Link href="/press/cto-appointment" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                    Read Full Story
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-8 h-8 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-[#555555] mb-2">
                    <span>April 10, 2024</span>
                    <span className="w-1 h-1 bg-[#555555] rounded-full"></span>
                    <span>Product Announcement</span>
                  </div>
                  <h3 className="h3 font-bold text-[#111111] mb-2">ShopEverse Introduces AI-Powered Shopping Assistant</h3>
                  <p className="text-[#555555] mb-4">
                    New AI assistant helps customers find perfect products through natural language conversations and personalized recommendations.
                  </p>
                  <Link href="/press/ai-assistant" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                    Learn More
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Media Resources */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Media Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Newspaper className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Press Releases</h3>
              <p className="text-[#555555] mb-4">
                Official announcements, product launches, and company news.
              </p>
              <Link href="/press/releases" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                View All Releases
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Media Kit</h3>
              <p className="text-[#555555] mb-4">
                Logos, brand guidelines, product images, and company information.
              </p>
              <Link href="/media-kit" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                Download Kit
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Users2 className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Executive Bios</h3>
              <p className="text-[#555555] mb-4">
                Profiles and background information for ShopEverse leadership team.
              </p>
              <Link href="/press/executives" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                Meet the Team
                <ChevronDown className="w-4 h-4" />
              </Link>
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
      </div>
      
      <Footer />
    </div>
  );
}