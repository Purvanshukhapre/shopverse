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

export default function ActivewearPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get activewear products
        const activewearProducts = allProducts.filter(p => p.category === 'Sports' && 
          (p.name.toLowerCase().includes('activewear') || 
           p.name.toLowerCase().includes('sportswear') || 
           p.name.toLowerCase().includes('workout') || 
           p.name.toLowerCase().includes('gym') || 
           p.name.toLowerCase().includes('running') || 
           p.name.toLowerCase().includes('yoga')));
        setProducts(activewearProducts);
      } catch (error) {
        console.error('Error fetching activewear products:', error);
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
        <NavigationLoader />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white py-20">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="h1 mb-4">Activewear</h1>
            <p className="text-xl mb-6">Performance apparel for every workout</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sports/activewear" className="btn-premium btn-primary !h-12 !px-8">
                Shop All Activewear
              </Link>
              <Link href="/sports" className="btn-premium !h-12 !px-8 bg-white text-[#1E3A8A] hover:bg-gray-100">
                Back to Sports & Outdoors
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="container-premium py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-1/4">
            <FilterSidebar 
              categories={Array.from(new Set(products.map(p => p.category)))}
              brands={["Nike", "Adidas", "Under Armour", "Lululemon", "Puma"]}
              activeFilters={[]}
              onFiltersChange={() => {}}
              onFilterChange={(filters) => {}}
            />
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="h2">All Activewear</h2>
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
                <h3 className="h3 mb-2">No Activewear Available</h3>
                <p className="text-[#555555] mb-6">We're working on expanding our activewear collection. Check back soon!</p>
                <Link href="/sports" className="btn-premium btn-primary !h-12 !px-8">
                  Browse All Sports & Outdoors
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