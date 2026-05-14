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

export default function ElectronicsPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get featured products for the electronics page
        const electronicsProducts = allProducts.filter(p => p.category === 'Electronics').slice(0, 8);
        setProducts(electronicsProducts);
      } catch (error) {
        console.error('Error fetching electronics products:', error);
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
      <div className="bg-gradient-to-r from-[#111111] to-[#333333] text-white py-20">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="h1 mb-4">Electronics</h1>
            <p className="text-xl mb-6">Latest gadgets & accessories</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/electronics/smartphones" className="btn-premium btn-primary !h-12 !px-8">
                Shop Smartphones
              </Link>
              <Link href="/electronics/laptops" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Shop Laptops & PCs
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Subcategory Navigation */}
      <div className="container-premium py-12">
        <h2 className="h2 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[{ name: "Smartphones", href: "/mobiles/smartphones", image: "https://images.unsplash.com/photo-1593642634443-78ec7571ae3d?w=400&h=500&fit=crop&q=80" },
            { name: "Laptops & PCs", href: "/electronics/laptops", image: "https://images.unsplash.com/photo-1593642634443-78ec7571ae3d?w=400&h=500&fit=crop&q=80" },
            { name: "Audio & Headphones", href: "/electronics/headphones", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80" },
            { name: "Cameras", href: "/electronics/cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop&q=80" },
            { name: "Wearables", href: "/electronics/wearables", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=500&fit=crop&q=80" }
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
          <h2 className="h2">Featured Electronics</h2>
          <Link href="/products" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
            View All →
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
      </div>
      
      <Footer />
    </div>
  );
}