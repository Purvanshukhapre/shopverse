"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, PackageCheck, Calendar, MapPin, Phone, Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function ReturnsPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the returns page
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
            <h1 className="h1 mb-4">Returns & Exchanges</h1>
            <p className="text-xl mb-6">Simple, hassle-free returns and exchanges</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              We make it easy to return or exchange items with our flexible policy and fast processing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/returns/initiate" className="btn-premium btn-primary !h-12 !px-8">
                Start a Return
              </Link>
              <Link href="/returns/policy" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Return Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Return Policy Summary */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Our Return Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <RotateCcw className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">30-Day Returns</h3>
              <p className="text-[#555555]">
                Return most items within 30 days of delivery for a full refund or exchange.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <PackageCheck className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Free Returns</h3>
              <p className="text-[#555555]">
                Free return shipping on all orders over ₹499. Easy pickup at your doorstep.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Fast Processing</h3>
              <p className="text-[#555555]">
                Process returns within 2 business days. Refunds issued immediately upon receipt.
              </p>
            </div>
          </div>
        </section>
        
        {/* How to Return */}
        <section className="mb-24">
          <h2 className="h2 mb-8">How to Return an Item</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-[#DC2626]">1</span>
              </div>
              <div className="flex-1">
                <h3 className="h3 font-bold text-[#111111] mb-2">Initiate Your Return</h3>
                <p className="text-[#555555]">
                  Log in to your account, go to Order History, and select "Return Items" for the order you want to return.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-[#DC2626]">2</span>
              </div>
              <div className="flex-1">
                <h3 className="h3 font-bold text-[#111111] mb-2">Print Your Return Label</h3>
                <p className="text-[#555555]">
                  Download and print your prepaid return shipping label. Attach it securely to your package.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-[#DC2626]">3</span>
              </div>
              <div className="flex-1">
                <h3 className="h3 font-bold text-[#111111] mb-2">Ship Your Package</h3>
                <p className="text-[#555555]">
                  Drop off your package at any courier service point or schedule a free pickup.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-[#DC2626]">4</span>
              </div>
              <div className="flex-1">
                <h3 className="h3 font-bold text-[#111111] mb-2">Get Your Refund</h3>
                <p className="text-[#555555]">
                  Once we receive and inspect your return, your refund will be processed within 2 business days.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Need Help With Your Return?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Return Address</h3>
              <p className="text-[#555555] mb-2">ShopEverse Returns Center</p>
              <p className="text-[#555555]">Mumbai, Maharashtra 400001</p>
              <p className="text-[#555555]">India</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Customer Support</h3>
              <p className="text-[#555555] mb-2">+91 98765 43210</p>
              <p className="text-[#555555]">Mon-Fri: 9AM - 6PM</p>
              <p className="text-[#555555]">Sat: 10AM - 4PM</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Email Support</h3>
              <p className="text-[#555555] mb-2">returns@shopverse.io</p>
              <p className="text-[#555555]">Response within 24 hours</p>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="h2">Recommended Products</h2>
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
      </div>
      
      <Footer />
    </div>
  );
}