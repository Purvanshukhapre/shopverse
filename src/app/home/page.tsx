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

export default function HomePage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get featured products for the home page
        const homeProducts = allProducts.filter(p => p.category === 'Home').slice(0, 8);
        setProducts(homeProducts);
      } catch (error) {
        console.error('Error fetching home products:', error);
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
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white py-24">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="h1 mb-4">Premium Home & Living</h1>
            <p className="text-xl mb-6">Transform your space with premium home essentials and modern furniture</p>
            <p className="text-lg text-[#AAAAAA] mb-8 max-w-2xl">
              From stylish furniture and elegant decor to functional kitchenware and ambient lighting - create your dream living space with premium quality assurance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/home/furniture" className="btn-premium btn-primary !h-12 !px-8">
                Shop Furniture & Decor
              </Link>
              <Link href="/home/bedding" className="btn-premium !h-12 !px-8 bg-white text-[#1E3A8A] hover:bg-gray-100">
                Shop Bedding & Linens
              </Link>
              <Link href="/home/kitchen" className="btn-premium !h-12 !px-8 bg-white text-[#1E3A8A] hover:bg-gray-100">
                Shop Kitchen Essentials
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
                  <p className="text-sm text-[#AAAAAA]">Crafted for durability</p>
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
              <h2 className="h2 mb-2">🔥 Home Renovation Deals</h2>
              <p className="text-lg">Up to 55% off on furniture and decor</p>
            </div>
            <Link href="/deals" className="btn-premium btn-primary !h-12 !px-8">
              Shop Home Deals →
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[{ name: "Furniture", href: "/home/furniture", image: "https://images.unsplash.com/photo-1571829425921-0d4b83b6720c?w=400&h=500&fit=crop&q=80" },
            { name: "Bedding", href: "/home/bedding", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
            { name: "Decor", href: "/home/decor", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
            { name: "Kitchen", href: "/home/kitchen", image: "https://images.unsplash.com/photo-1571829425921-0d4b83b6720c?w=400&h=500&fit=crop&q=80" },
            { name: "Lighting", href: "/home/lighting", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
            { name: "Storage", href: "/home/storage", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" }
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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, idx) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={idx}
                layout="grid"
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Customer Favorites */}
      <div className="container-premium py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="h2">Customer Favorites</h2>
          <Link href="/products" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
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
            {products.slice(0, 4).map((product, idx) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={idx}
                layout="grid"
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Brand Spotlight */}
      <div className="container-premium py-12">
        <h2 className="h2 mb-8">Brand Spotlight</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "IKEA", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/IKEA_logo.svg" },
            { name: "Ashley", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Ashley_Furniture_logo.svg" },
            { name: "West Elm", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/West_Elm_logo.svg" },
            { name: "Williams-Sonoma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Williams_Sonoma_logo.svg" },
            { name: "Pottery Barn", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Pottery_Barn_logo.svg" },
            { name: "Crate & Barrel", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Crate_%26_Barrel_logo.svg" }
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
              <p className="text-sm text-[#555555] mt-2">Premium home goods</p>
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
          <h2 className="h2">Featured Home & Furniture</h2>
          <Link href="/products" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
            View All →
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
      </div>
      
      <Footer />
    </div>
  );
}