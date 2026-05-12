"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Briefcase, Building, Calendar, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function CareersPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the careers page
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
            <h1 className="h1 mb-4">Join Our Team</h1>
            <p className="text-xl mb-6">Build the future of e-commerce with us</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              We&apos;re looking for passionate engineers, designers, and retail experts who share our vision of premium shopping.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-premium btn-primary !h-12 !px-8">
                View Open Positions
              </Link>
              <Link href="/contact" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Contact HR
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Why Join Us */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Why Join ShopEverse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Impactful Work</h3>
              <p className="text-[#555555]">
                Build products that millions of customers use every day. Your work directly impacts the shopping experience.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Building className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Growth Opportunities</h3>
              <p className="text-[#555555]">
                Accelerate your career with mentorship, learning opportunities, and clear paths for advancement.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Work-Life Balance</h3>
              <p className="text-[#555555]">
                Flexible hours, remote options, and generous time off to help you thrive both professionally and personally.
              </p>
            </div>
          </div>
        </section>
        
        {/* Open Positions */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Open Positions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="h3 font-bold text-[#111111]">Senior Frontend Engineer</h3>
                  <p className="text-[#555555] mt-1">Engineering • Full-time • Mumbai</p>
                </div>
                <Link href="/careers/senior-frontend-engineer" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-[#555555] mt-4">
                Build cutting-edge e-commerce experiences using React, Next.js, and modern web technologies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="h3 font-bold text-[#111111]">Product Designer</h3>
                  <p className="text-[#555555] mt-1">Design • Full-time • Remote</p>
                </div>
                <Link href="/careers/product-designer" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-[#555555] mt-4">
                Design intuitive, beautiful interfaces that delight our customers and drive business results.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="h3 font-bold text-[#111111]">Retail Operations Manager</h3>
                  <p className="text-[#555555] mt-1">Operations • Full-time • Mumbai</p>
                </div>
                <Link href="/careers/retail-operations-manager" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-[#555555] mt-4">
                Optimize our supply chain, logistics, and fulfillment operations to deliver exceptional customer experiences.
              </p>
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
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-2xl p-12 text-center">
          <h2 className="h2 mb-4">Ready to Build the Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join a team of passionate professionals who are redefining what&apos;s possible in e-commerce.
          </p>
          <Link href="/careers" className="btn-premium btn-primary !h-14 !px-8 text-lg">
            Explore All Opportunities
          </Link>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}