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
import NavigationLoader from "@/components/layout/NavigationLoader";

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white py-24">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="h1 mb-4">Premium Sports & Outdoors</h1>
            <p className="text-xl mb-6">Discover premium sports gear, fitness equipment, and outdoor adventure essentials</p>
            <p className="text-lg text-[#AAAAAA] mb-8 max-w-2xl">
              From professional-grade activewear and fitness equipment to premium outdoor gear and sports footwear - shop the world&apos;s most trusted sports brands with premium quality assurance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sports/activewear" className="btn-premium btn-primary !h-12 !px-8">
                Shop Activewear & Sportswear
              </Link>
              <Link href="/sports/fitness-equipment" className="btn-premium !h-12 !px-8 bg-white text-[#1E3A8A] hover:bg-gray-100">
                Shop Fitness Equipment
              </Link>
              <Link href="/sports/outdoor-gear" className="btn-premium !h-12 !px-8 bg-white text-[#1E3A8A] hover:bg-gray-100">
                Shop Outdoor Gear
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-white" />
                <div>
                  <p className="font-bold">Free Shipping</p>
                  <p className="text-sm text-[#AAAAAA]">On orders above ₹499</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-white" />
                <div>
                  <p className="font-bold">Premium Quality</p>
                  <p className="text-sm text-[#AAAAAA]">Professional-grade gear</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-white" />
                <div>
                  <p className="font-bold">Easy Returns</p>
                  <p className="text-sm text-[#AAAAAA]">30-day hassle-free returns</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Top Deals Banner */}
      <div className="container-premium py-8">
        <div className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="h2 mb-2">🔥 Sports Week Deals</h2>
              <p className="text-lg">Up to 40% off on premium sports gear</p>
            </div>
            <Link href="/deals" className="btn-premium btn-primary !h-12 !px-8">
              Shop Sports Deals →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Subcategory Navigation */}
      <div className="container-premium py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="h2">Shop by Category</h2>
          <Link href="/products" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
            View All Categories →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[{ name: "Activewear", href: "/sports/activewear", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&q=80" },
            { name: "Fitness Equipment", href: "/sports/fitness-equipment", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
            { name: "Outdoor Gear", href: "/sports/outdoor-gear", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
            { name: "Sports Footwear", href: "/sports/sports-footwear", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" }
          ].map((category, idx) => (
            <Link 
              key={idx}
              href={category.href}
              className="group block"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 group-hover:-translate-y-1">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg">{category.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Trending Now */}
      <div className="container-premium py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="h2">Trending Now</h2>
          <Link href="/deals" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
      
      {/* Customer Favorites */}
      <div className="container-premium py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="h2">Customer Favorites</h2>
          <Link href="/products" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
      
      {/* Brand Spotlight */}
      <div className="container-premium py-12">
        <h2 className="h2 mb-8">Brand Spotlight</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
            { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_logo.svg" },
            { name: "Under Armour", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Under_Armour_logo.svg" },
            { name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Puma_logo.svg" },
            { name: "Reebok", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Reebok_logo.svg" },
            { name: "Asics", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/ASICS_logo.svg" }
          ].map((brand, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="h3 font-bold">{brand.name}</h3>
              <p className="text-sm text-[#555555] mt-2">Premium sports</p>
              <Link href={`/products?brand=${brand.name.toLowerCase()}`} className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors mt-4 inline-block">
                Shop {brand.name} →
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="container-premium pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="h2">Featured Sports & Outdoors</h2>
          <Link href="/products" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}