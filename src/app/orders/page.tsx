"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Package2, Calendar, Clock, MapPin, Phone, Mail, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function OrdersPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the orders page
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
            <h1 className="h1 mb-4">My Orders</h1>
            <p className="text-xl mb-6">Track your current orders and view order history</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              Everything you need to manage your ShopEverse purchases in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/orders/current" className="btn-premium btn-primary !h-12 !px-8">
                View Current Orders
              </Link>
              <Link href="/orders/history" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Order History
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Order Summary */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Order Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Package2 className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Current Orders</h3>
              <p className="text-3xl font-bold text-[#111111] mb-1">3</p>
              <p className="text-[#555555]">Active orders being processed or shipped</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Completed Orders</h3>
              <p className="text-3xl font-bold text-[#111111] mb-1">24</p>
              <p className="text-[#555555]">Orders delivered and completed</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Recent Returns</h3>
              <p className="text-3xl font-bold text-[#111111] mb-1">2</p>
              <p className="text-[#555555]">Returns processed in last 30 days</p>
            </div>
          </div>
        </section>
        
        {/* Recent Orders */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="h2">Recent Orders</h2>
            <Link href="/orders/history" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
              View All →
            </Link>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-bold text-[#111111]">Order #SE-789456</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Delivered</span>
                  </div>
                  <p className="text-[#555555] mb-2">May 15, 2024 • Delivered May 18, 2024</p>
                  <div className="flex items-center gap-2 text-sm text-[#555555] mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-[#111111]">₹4,299</span>
                    <span className="text-[#555555]">3 items</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button className="text-[#DC2626] font-semibold hover:text-[#B91C1C] mb-2">
                    View Details
                  </button>
                  <button className="text-[#DC2626] font-semibold hover:text-[#B91C1C]">
                    Reorder
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-bold text-[#111111]">Order #SE-789455</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Shipped</span>
                  </div>
                  <p className="text-[#555555] mb-2">May 12, 2024 • Shipped May 13, 2024</p>
                  <div className="flex items-center gap-2 text-sm text-[#555555] mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-[#111111]">₹2,899</span>
                    <span className="text-[#555555]">2 items</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button className="text-[#DC2626] font-semibold hover:text-[#B91C1C] mb-2">
                    Track Order
                  </button>
                  <button className="text-[#DC2626] font-semibold hover:text-[#B91C1C]">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-bold text-[#111111]">Order #SE-789454</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Processing</span>
                  </div>
                  <p className="text-[#555555] mb-2">May 10, 2024 • Processing</p>
                  <div className="flex items-center gap-2 text-sm text-[#555555] mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-[#111111]">₹1,299</span>
                    <span className="text-[#555555]">1 item</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button className="text-[#DC2626] font-semibold hover:text-[#B91C1C] mb-2">
                    Track Order
                  </button>
                  <button className="text-[#DC2626] font-semibold hover:text-[#B91C1C]">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Order Management */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Order Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Order Invoices</h3>
              <p className="text-[#555555] mb-4">
                Download invoices and receipts for your orders.
              </p>
              <Link href="/orders/invoices" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                View Invoices
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Shipping Tracking</h3>
              <p className="text-[#555555] mb-4">
                Real-time tracking for all your orders with delivery estimates.
              </p>
              <Link href="/orders/tracking" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                Track Orders
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Returns & Exchanges</h3>
              <p className="text-[#555555] mb-4">
                Initiate returns, exchanges, and track return status.
              </p>
              <Link href="/returns" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                Start Return
                <ChevronDown className="w-4 h-4" />
              </Link>
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