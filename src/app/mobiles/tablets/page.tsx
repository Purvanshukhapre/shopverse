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

export default function TabletsPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get tablet products - filter by category and keyword matching
        const tabletProducts = allProducts.filter(p => 
          p.category === 'Electronics' && 
          (p.name.toLowerCase().includes('tablet') || 
           p.name.toLowerCase().includes('ipad') || 
           p.name.toLowerCase().includes('surface') ||
           p.name.toLowerCase().includes('galaxy tab') ||
           p.description.toLowerCase().includes('tablet'))
        ).slice(0, 8);
        setProducts(tabletProducts);
      } catch (error) {
        console.error('Error fetching tablet products:', error);
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
      <div className="bg-gradient-to-r from-[#111111] to-[#333333] text-white py-24">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="h1 mb-4">Tablets</h1>
            <p className="text-xl mb-6">Powerful computing devices for work and entertainment</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              From premium tablets to budget-friendly options for every need.
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
      
      {/* Main Content Area */}
      <div className="container-premium py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-1/4">
            <FilterSidebar 
              products={products} 
              categories={Array.from(new Set(products.map(p => p.category)))}
              brands={"Apple", "Samsung", "Microsoft", "Lenovo", "Huawei"]}
              activeFilters={[]}
              onFiltersChange={() => {}}
              category="Electronics"
            />
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="h2">All Tablets</h2>
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
                <p className="text-lg text-[#555555]">No tablets available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}