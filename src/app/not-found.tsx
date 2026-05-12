"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Search, Home, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function NotFoundPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the 404 page
        const featuredProducts = allProducts.slice(0, 4);
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
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
            className="max-w-3xl text-center"
          >
            <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl font-bold">404</div>
            </div>
            <h1 className="h1 mb-4">Page Not Found</h1>
            <p className="text-xl mb-6">The page you&apos;re looking for doesn&apos;t exist</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              We couldn&apos;t find the page you were looking for. It might have been moved or deleted.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="btn-premium btn-primary !h-12 !px-8">
                <Home className="w-5 h-5 mr-2 inline" />
                Go Home
              </Link>
              <Link href="/search" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                <Search className="w-5 h-5 mr-2 inline" />
                Search Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Suggested Pages */}
        <section className="mb-24">
          <h2 className="h2 mb-8 text-center">You Might Be Looking For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Link href="/fashion" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all text-center">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Fashion</h3>
              <p className="text-[#555555] text-sm">Men&apos;s & Women&apos;s Clothing</p>
            </Link>
            
            <Link href="/electronics" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all text-center">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Electronics</h3>
              <p className="text-[#555555] text-sm">Laptops, Headphones & More</p>
            </Link>
            
            <Link href="/mobiles" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all text-center">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Mobiles</h3>
              <p className="text-[#555555] text-sm">Smartphones & Tablets</p>
            </Link>
            
            <Link href="/home" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all text-center">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center">
                  <span className="text-white font-bold">H</span>
                </div>
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Home & Living</h3>
              <p className="text-[#555555] text-sm">Furniture & Decor</p>
            </Link>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="h2">Popular Products</h2>
            <Link href="/" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
              Browse All →
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
        
        {/* Contact Support */}
        <section className="text-center">
          <h2 className="h2 mb-4">Still Can&apos;t Find What You Need?</h2>
          <p className="text-lg text-[#555555] mb-8 max-w-2xl mx-auto">
            Our customer support team is here to help you with any questions or issues you may have.
          </p>
          <Link href="/help" className="btn-premium btn-primary !h-14 !px-8 text-lg">
            Contact Support
          </Link>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}