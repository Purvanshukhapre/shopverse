"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Search, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Simulate search on mount or when searchTerm changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }
    
    setLoading(true);
    
    const timer = setTimeout(() => {
      try {
        // Simple case-insensitive search across name, category, and description
        const results = allProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        setProducts(results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // In a real app, this would navigate to /search?q=searchTerm
      toast.success(`Searching for "${searchTerm}"`, {
        icon: <Search className="w-4 h-4 text-blue-500" />, 
        className: "rounded-[20px] border-blue-100 bg-blue-50 text-blue-900 font-bold"
      });
    }
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    setProducts([]);
  };
  
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      
      {/* Search Header */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="container-premium">
          <div className="max-w-2xl mx-auto">
            <h1 className="h1 mb-2">Search Results</h1>
            <p className="text-lg text-[#555555]">
              {searchTerm ? `Showing results for "${searchTerm}"` : 'Search for products, categories, or brands'}
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mt-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products, categories, or brands..."
                  className="w-full h-14 pl-12 pr-4 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent text-base"
                />
                {searchTerm && (
                  <button 
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-[#AAAAAA]" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="container-premium py-12">
        {/* Search Results */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="h2">
            {searchTerm ? (
              <span>Results for &quot;{searchTerm}&quot;</span>
            ) : (
              <span>Popular Searches</span>
            )}
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#555555]">
            <span>{products.length} products found</span>
            <Filter className="w-4 h-4" />
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
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
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 text-red-500 mb-6">
              <Search className="w-12 h-12" />
            </div>
            <h2 className="h2 mb-2">No products found</h2>
            <p className="text-lg text-[#555555] mb-6">We couldn&apos;t find any products matching your search.</p>
            <div className="space-y-3 max-w-md mx-auto">
              <p className="text-[#555555]">Try searching for:</p>
              <div className="flex flex-wrap gap-2">
                <Link href="/electronics" className="px-4 py-2 bg-gray-100 text-[#111111] rounded-lg hover:bg-gray-200 transition-colors">
                  Electronics
                </Link>
                <Link href="/fashion" className="px-4 py-2 bg-gray-100 text-[#111111] rounded-lg hover:bg-gray-200 transition-colors">
                  Fashion
                </Link>
                <Link href="/home" className="px-4 py-2 bg-gray-100 text-[#111111] rounded-lg hover:bg-gray-200 transition-colors">
                  Home & Living
                </Link>
                <Link href="/beauty" className="px-4 py-2 bg-gray-100 text-[#111111] rounded-lg hover:bg-gray-200 transition-colors">
                  Beauty
                </Link>
              </div>
              <Link href="/" className="btn-premium btn-primary !h-12 !px-8 mt-4">
                Browse All Products
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}