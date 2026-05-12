"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Brain, Code, Lightbulb, Target, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function SciencePage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the science page
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
            <h1 className="h1 mb-4">ShopEverse Science</h1>
            <p className="text-xl mb-6">Where engineering meets retail excellence</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              Our research and development team is building the future of e-commerce through cutting-edge technology and scientific innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-premium btn-primary !h-12 !px-8">
                Contact R&D Team
              </Link>
              <Link href="/careers" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Join Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Our Research Areas */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Our Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">AI & Machine Learning</h3>
              <p className="text-[#555555]">
                Developing intelligent recommendation engines, personalized shopping experiences, and predictive analytics.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Engineering Excellence</h3>
              <p className="text-[#555555]">
                Building scalable, high-performance systems that handle millions of transactions per day with sub-second response times.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Innovation Lab</h3>
              <p className="text-[#555555]">
                Exploring emerging technologies like AR/VR shopping experiences, voice commerce, and blockchain-powered supply chains.
              </p>
            </div>
          </div>
        </section>
        
        {/* Featured Technologies */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Featured Technologies</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="h3 font-bold text-[#111111] mb-2">Personalized Recommendations</h3>
                  <p className="text-[#555555] mb-4">
                    Our AI algorithms analyze over 100 data points per customer to deliver hyper-personalized product recommendations with 92% accuracy.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#555555]">
                    <span>Accuracy:</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#DC2626] w-4/5"></div>
                    </div>
                    <span>92%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="h3 font-bold text-[#111111] mb-2">Real-time Analytics</h3>
                  <p className="text-[#555555] mb-4">
                    Process 2.5 million events per second to provide real-time insights into customer behavior and inventory optimization.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#555555]">
                    <span>Throughput:</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#DC2626] w-full"></div>
                    </div>
                    <span>2.5M/sec</span>
                  </div>
                </div>
              </div>
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