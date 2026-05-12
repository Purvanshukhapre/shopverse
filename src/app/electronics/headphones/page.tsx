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
import { notFound } from "next/navigation";

export default function HeadphonesPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Filter products by Electronics category only (no subcategory data in products)
        const headphoneProducts = allProducts.filter(p => p.category === 'Electronics');
        setProducts(headphoneProducts);
      } catch (error) {
        console.error('Error fetching headphone products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [pathname]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F8]">
        <Navbar />
        <div className="container-premium py-16">
          <h1 className="h1 mb-8">Headphones</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white py-20">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="h1 mb-4">Premium Headphones</h1>
            <p className="text-xl mb-6">Immersive audio experiences for every lifestyle</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/electronics/headphones/wireless" className="btn-premium btn-primary !h-12 !px-8">
                Shop Wireless
              </Link>
              <Link href="/electronics/headphones/wired" className="btn-premium !h-12 !px-8 bg-white text-[#7C3AED] hover:bg-gray-100">
                Shop Wired
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Subcategory Navigation */}
      <div className="container-premium py-12">
        <h2 className="h2 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Wireless", href: "/electronics/headphones/wireless", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80" },
            { name: "Wired", href: "/electronics/headphones/wired", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80" },
            { name: "Gaming", href: "/electronics/headphones/gaming", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80" },
            { name: "Studio", href: "/electronics/headphones/studio", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80" },
            { name: "Earbuds", href: "/electronics/headphones/earbuds", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80" },
            { name: "Noise-Cancelling", href: "/electronics/headphones/noise-cancelling", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80" },
          ].map((category, idx) => (
            <Link 
              key={idx}
              href={category.href}
              className="group block"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 group-hover:-translate-y-1">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg">{category.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="container-premium pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="h2">Featured Headphones</h2>
          <Link href="/electronics/headphones" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
            View All →
          </Link>
        </div>
        
        {products.length > 0 ? (
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
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-[#555555]">No headphones available at the moment.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}