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

export default function ElectronicsPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get featured products for the electronics page
        const electronicsProducts = allProducts.filter(p => p.category === 'Electronics').slice(0, 8);
        setProducts(electronicsProducts);
      } catch (error) {
        console.error('Error fetching electronics products:', error);
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
      <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1F1F1F] text-white py-24">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="h1 mb-4">Premium Electronics</h1>
            <p className="text-xl mb-6">Discover cutting-edge technology, premium gadgets, and innovative accessories</p>
            <p className="text-lg text-[#AAAAAA] mb-8 max-w-2xl">
              From smartphones and laptops to audio systems and smart home devices - shop the latest tech with premium quality assurance and fast delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/electronics/smartphones" className="btn-premium btn-primary !h-12 !px-8">
                Shop Smartphones & Tablets
              </Link>
              <Link href="/electronics/laptops" className="btn-premium !h-12 !px-8 bg-white text-[#0A0A0A] hover:bg-gray-100">
                Shop Laptops & PCs
              </Link>
              <Link href="/electronics/headphones" className="btn-premium !h-12 !px-8 bg-white text-[#0A0A0A] hover:bg-gray-100">
                Shop Audio & Headphones
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#DC2626]" />
                <div>
                  <p className="font-bold">Free Shipping</p>
                  <p className="text-sm text-[#AAAAAA]">On orders above ₹499</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#DC2626]" />
                <div>
                  <p className="font-bold">100% Secure</p>
                  <p className="text-sm text-[#AAAAAA]">Encrypted checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-[#DC2626]" />
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
              <h2 className="h2 mb-2">🔥 Hot Deals This Week</h2>
              <p className="text-lg">Up to 50% off on top electronics brands</p>
            </div>
            <Link href="/deals" className="btn-premium btn-primary !h-12 !px-8">
              Shop Deals →
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
          {[{ name: "Smartphones", href: "/mobiles/smartphones", image: "https://images.unsplash.com/photo-1593642634443-78ec7571ae3d?w=400&h=500&fit=crop&q=80" },
            { name: "Laptops & PCs", href: "/electronics/laptops", image: "https://images.unsplash.com/photo-1593642634443-78ec7571ae3d?w=400&h=500&fit=crop&q=80" },
            { name: "Audio & Headphones", href: "/electronics/headphones", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80" },
            { name: "Cameras", href: "/electronics/cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop&q=80" },
            { name: "Wearables", href: "/electronics/wearables", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=500&fit=crop&q=80" },
            { name: "Accessories", href: "/electronics/accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" }
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
            { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo.png" },
            { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Samsung_logo.svg" },
            { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Sony_logo.svg" },
            { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Dell_logo.svg" },
            { name: "JBL", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/JBL_logo.svg" },
            { name: "Bose", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Bose_logo.svg" }
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
              <p className="text-sm text-[#555555] mt-2">Premium electronics</p>
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
          <h2 className="h2">Featured Electronics</h2>
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