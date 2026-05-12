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

export default function ScreenGuardsPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get screen guards products
        const screenGuardsProducts = allProducts.filter(p => p.category === 'Electronics');
        setProducts(screenGuardsProducts);
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
            <h1 className="h1 mb-4">Screen Guards</h1>
            <p className="text-xl mb-6">Protect your device screens with premium screen protectors</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              From tempered glass to privacy filters and anti-glare solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mobiles" className="btn-premium btn-primary !h-12 !px-8">
                Browse All Mobiles
              </Link>
              <Link href="/search" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Search Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Category Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="h3 mb-2">Premium Quality</h3>
            <p className="text-[#555555]">Military-grade protection & crystal clarity</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="h3 mb-2">Free Shipping</h3>
            <p className="text-[#555555]">On orders above ₹499</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="h3 mb-2">Easy Returns</h3>
            <p className="text-[#555555]">30-day hassle-free returns</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="h3 mb-2">Wide Range</h3>
            <p className="text-[#555555]">For phones, tablets, laptops & more</p>
          </div>
        </div>
        
        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="h2 mb-8">Shop by Screen Guard Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gradient-to-r from-[#DC2626] to-[#B91C1C] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Tempered</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="h3 mb-2">Tempered Glass</h3>
                <p className="text-[#555555] mb-4">Shatter-resistant & scratch-proof protection</p>
                <Link href="/mobiles/screen-guards/tempered" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                  Shop Now →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gradient-to-r from-[#111111] to-[#333333] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Privacy</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="h3 mb-2">Privacy Filters</h3>
                <p className="text-[#555555] mb-4">Prevent shoulder surfing & protect sensitive data</p>
                <Link href="/mobiles/screen-guards/privacy" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                  Shop Now →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gradient-to-r from-[#15803D] to-[#166534] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Anti-Glare</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="h3 mb-2">Anti-Glare</h3>
                <p className="text-[#555555] mb-4">Reduce reflections & improve visibility outdoors</p>
                <Link href="/mobiles/screen-guards/anti-glare" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                  Shop Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="h2">Screen Guard Collection</h2>
            <div className="flex items-center gap-2">
              <span className="text-[#555555]">Sort by:</span>
              <select className="bg-white border border-gray-200 rounded-lg py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent appearance-none">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#555555] absolute right-2 pointer-events-none" />
            </div>
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
              <h3 className="h3 mb-2">No Screen Guards Available</h3>
              <p className="text-[#555555] mb-6">We&apos;re working on expanding our screen guard collection. Check back soon!</p>
              <Link href="/mobiles" className="btn-premium btn-primary !h-12 !px-8">
                Browse All Mobiles
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}