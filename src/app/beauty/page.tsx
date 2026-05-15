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

export default function BeautyPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get featured products for the beauty page
        const beautyProducts = allProducts.filter(p => p.category === 'Beauty').slice(0, 8);
        setProducts(beautyProducts);
      } catch (error) {
        console.error('Error fetching beauty products:', error);
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
      <div className="bg-gradient-to-r from-[#EC4899] to-[#D946EF] text-white py-24">
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="h1 mb-4">Premium Beauty & Personal Care</h1>
            <p className="text-xl mb-6">Discover luxury skincare, premium makeup, and professional-grade personal care</p>
            <p className="text-lg text-[#AAAAAA] mb-8 max-w-2xl">
              From dermatologist-approved skincare to celebrity makeup and premium fragrances - shop the world's most trusted beauty brands with premium quality assurance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/beauty/skincare" className="btn-premium btn-primary !h-12 !px-8">
                Shop Skincare & Wellness
              </Link>
              <Link href="/beauty/makeup" className="btn-premium !h-12 !px-8 bg-white text-[#EC4899] hover:bg-gray-100">
                Shop Makeup & Cosmetics
              </Link>
              <Link href="/beauty/fragrances" className="btn-premium !h-12 !px-8 bg-white text-[#EC4899] hover:bg-gray-100">
                Shop Fragrances & Perfumes
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
                  <p className="font-bold">100% Authentic</p>
                  <p className="text-sm text-[#AAAAAA]">Genuine products only</p>
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
              <h2 className="h2 mb-2">🔥 Beauty Week Deals</h2>
              <p className="text-lg">Up to 45% off on premium beauty brands</p>
            </div>
            <Link href="/deals" className="btn-premium btn-primary !h-12 !px-8">
              Shop Beauty Deals →
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[{ name: "Skincare", href: "/beauty/skincare", image: "https://images.unsplash.com/photo-1571829425921-0d4b83b6720c?w=400&h=500&fit=crop&q=80" },
            { name: "Makeup", href: "/beauty/makeup", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
            { name: "Haircare", href: "/beauty/haircare", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
            { name: "Fragrances", href: "/beauty/fragrances", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop&q=80" },
            { name: "Grooming", href: "/beauty/grooming", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" }
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
            { name: "L&apos;Oreal", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/L%27Or%C3%A9al_logo.svg" },
            { name: "Estée Lauder", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Estee_Lauder_logo.svg" },
            { name: "MAC", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1e/MAC_Cosmetics_logo.svg" },
            { name: "The Body Shop", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/The_Body_Shop_logo.svg" },
            { name: "Sephora", logo: "https://upload.wikimedia.org/wikipedia/commons/1/14/Sephora_logo.svg" },
            { name: "Kiehl's", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Kiehl%27s_logo.svg" }
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
              <p className="text-sm text-[#555555] mt-2">Premium beauty</p>
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
          <h2 className="h2">Featured Beauty</h2>
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