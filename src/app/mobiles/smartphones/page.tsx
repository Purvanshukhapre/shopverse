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
import FilterSidebar from "@/components/search/FilterSidebar";
import NavigationLoader from "@/components/layout/NavigationLoader";

export default function SmartphonesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const pathname = usePathname();
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get smartphone products - filter by category and keyword matching
        const smartphoneProducts = allProducts.filter(p => 
          p.category === 'Electronics' && 
          (p.name.toLowerCase().includes('smartphone') || 
           p.name.toLowerCase().includes('iphone') || 
           p.name.toLowerCase().includes('pixel') ||
           p.name.toLowerCase().includes('galaxy') ||
           p.name.toLowerCase().includes('oneplus') ||
           p.description.toLowerCase().includes('smartphone'))
        ).slice(0, 8);
        setProducts(smartphoneProducts);
      } catch (error) {
        console.error('Error fetching smartphone products:', error);
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
      <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1F1F1F] text-white py-20">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="h1 mb-4">Premium Smartphones</h1>
            <p className="text-xl mb-6">Cutting-edge technology in your pocket</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/mobiles/smartphones/flagship" className="btn-premium btn-primary !h-12 !px-8">
                Shop Flagship
              </Link>
              <Link href="/mobiles/smartphones/budget" className="btn-premium !h-12 !px-8 bg-white text-[#0A0A0A] hover:bg-gray-100">
                Shop Budget
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
              brands={["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Oppo"]}
              activeFilters={[]}
              onFiltersChange={() => {}}
              onFilterChange={(filters) => {}}
            />
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="h2">All Smartphones</h2>
              <Link href="/products" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
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
                <p className="text-lg text-[#555555]">No smartphones available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      



      
      <Footer />
    </div>
  );
}