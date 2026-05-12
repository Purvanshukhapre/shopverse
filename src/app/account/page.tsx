"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, User, CreditCard, Package2, Settings, Bell, HelpCircle, LogOut } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function AccountPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the account page
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
            <h1 className="h1 mb-4">Your Account</h1>
            <p className="text-xl mb-6">Manage your profile, orders, and preferences</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              Everything you need to manage your ShopEverse experience in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/account/profile" className="btn-premium btn-primary !h-12 !px-8">
                View Profile
              </Link>
              <Link href="/account/orders" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                My Orders
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Account Dashboard */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Account Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/account/profile" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Profile & Settings</h3>
              <p className="text-[#555555] text-sm">
                Update your personal information, contact details, and account preferences.
              </p>
            </Link>
            
            <Link href="/account/orders" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Package2 className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">My Orders</h3>
              <p className="text-[#555555] text-sm">
                Track current orders, view order history, and manage returns.
              </p>
            </Link>
            
            <Link href="/account/wishlist" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Wishlist</h3>
              <p className="text-[#555555] text-sm">
                Manage your saved items and get notified when they&apos;re back in stock.
              </p>
            </Link>
            
            <Link href="/account/payment" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Payment Methods</h3>
              <p className="text-[#555555] text-sm">
                Add, edit, or remove payment methods for faster checkout.
              </p>
            </Link>
          </div>
        </section>
        
        {/* Quick Actions */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/account/notifications" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Notifications</h3>
              <p className="text-[#555555] text-sm">
                Manage email and push notifications for order updates and promotions.
              </p>
            </Link>
            
            <Link href="/account/security" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Security</h3>
              <p className="text-[#555555] text-sm">
                Change password, enable two-factor authentication, and review login activity.
              </p>
            </Link>
            
            <Link href="/account/help" className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Help & Support</h3>
              <p className="text-[#555555] text-sm">
                Access help center, contact support, and find answers to common questions.
              </p>
            </Link>
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
        
        {/* Logout Button */}
        <section className="text-center">
          <button className="btn-premium !h-14 !px-8 bg-red-500 hover:bg-red-600 text-white transition-colors">
            <LogOut className="w-5 h-5 mr-2 inline" />
            Sign Out
          </button>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}