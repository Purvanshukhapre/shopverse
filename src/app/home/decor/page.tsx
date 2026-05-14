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
import FilterSidebar from "@/components/search/FilterSidebar";
import NavigationLoader from "@/components/layout/NavigationLoader";

export default function DecorPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get decor products
        const decorProducts = allProducts.filter(p => p.category === 'Home' && 
          (p.name.toLowerCase().includes('wall art') || 
           p.name.toLowerCase().includes('lighting') || 
           p.name.toLowerCase().includes('vase') || 
           p.name.toLowerCase().includes('mirror') || 
           p.name.toLowerCase().includes('sculpture') || 
           p.name.toLowerCase().includes('decoration')));
        setProducts(decorProducts);
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
            <h1 className="h1 mb-4">Home Décor</h1>
            <p className="text-xl mb-6">Elevate your living space with beautiful home décor</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              From wall art and lighting to vases and decorative accents.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/home" className="btn-premium btn-primary !h-12 !px-8">
                Browse All Home & Living
              </Link>
              <Link href="/search" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Search Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="container-premium py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-1/4">
            <FilterSidebar 
              categories={Array.from(new Set(products.map(p => p.category)))}
              brands={["West Elm", "CB2", "Anthropologie", "H&M Home", "IKEA"]}
              activeFilters={[]}
              onFiltersChange={() => {}}
              onFilterChange={(filters) => {}}
            />
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="h2">All Décor</h2>
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
            
            {products.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="h3 mb-2">No D&eacute;cor Available</h3>
                <p className="text-[#555555] mb-6">We&apos;re working on expanding our d&eacute;cor collection. Check back soon!</p>
                <Link href="/home" className="btn-premium btn-primary !h-12 !px-8">
                  Browse All Home & Living
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}