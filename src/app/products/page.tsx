"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { notFound } from "next/navigation";
import FilterSidebar from "@/components/search/FilterSidebar";
import NavigationLoader from "@/components/layout/NavigationLoader";

interface CategoryInfo {
  name: string;
  description: string;
  heroGradient: string;
  subcategories: Array<{
    name: string;
    href: string;
    image: string;
  }>;
}

const CATEGORY_INFO: Record<string, CategoryInfo> = {
  electronics: {
    name: "Electronics",
    description: "Cutting-edge technology and premium quality",
    heroGradient: "from-[#111111] to-[#333333]",
    subcategories: [
      { name: "Laptops", href: "/electronics/laptops", image: "https://images.unsplash.com/photo-1593642634443-78ec7571ae3d?w=400&h=500&fit=crop&q=80" },
      { name: "Headphones", href: "/electronics/headphones", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80" },
      { name: "Cameras", href: "/electronics/cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop&q=80" },
      { name: "Speakers", href: "/electronics/speakers", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=500&fit=crop&q=80" },
      { name: "Wearables", href: "/electronics/wearables", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=500&fit=crop&q=80" },
      { name: "Accessories", href: "/electronics/accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" }
    ]
  },
  fashion: {
    name: "Fashion",
    description: "Discover timeless style and modern elegance",
    heroGradient: "from-[#DC2626] to-[#B91C1C]",
    subcategories: [
      { name: "Men's Clothing", href: "/fashion/men", image: "https://images.unsplash.com/photo-1527515635267-19c47f32010d?w=400&h=500&fit=crop&q=80" },
      { name: "Women's Clothing", href: "/fashion/women", image: "https://images.unsplash.com/photo-1527515635267-19c47f32010d?w=400&h=500&fit=crop&q=80" },
      { name: "Kids' Wear", href: "/fashion/kids", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3241?w=400&h=500&fit=crop&q=80" },
      { name: "Footwear", href: "/fashion/footwear", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3241?w=400&h=500&fit=crop&q=80" },
      { name: "Watches", href: "/fashion/watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
      { name: "Bags & Wallets", href: "/fashion/bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop&q=80" }
    ]
  },
  home: {
    name: "Home & Living",
    description: "Transform your space with premium home essentials",
    heroGradient: "from-[#1E3A8A] to-[#3B82F6]",
    subcategories: [
      { name: "Furniture", href: "/home/furniture", image: "https://images.unsplash.com/photo-1571829425921-0d4b83b6720c?w=400&h=500&fit=crop&q=80" },
      { name: "Decor", href: "/home/decor", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
      { name: "Kitchen", href: "/home/kitchen", image: "https://images.unsplash.com/photo-1571829425921-0d4b83b6720c?w=400&h=500&fit=crop&q=80" },
      { name: "Bedding", href: "/home/bedding", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
      { name: "Lighting", href: "/home/lighting", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" },
      { name: "Storage", href: "/home/storage", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80" }
    ]
  }
};

export default function ProductsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Extract category from pathname (e.g., /electronics, /fashion, /home)
  const getCategoryFromPath = () => {
    const parts = pathname.split('/');
    return parts[1] || 'electronics';
  };
  
  const currentCategory = getCategoryFromPath();
  const categoryInfo = CATEGORY_INFO[currentCategory as keyof typeof CATEGORY_INFO] || CATEGORY_INFO.electronics;
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Filter products by category
        const categoryProducts = allProducts.filter(p => p.category === categoryInfo.name);
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
      } catch (error) {
         console.error(`Error fetching ${categoryInfo.name} products`, error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [pathname, categoryInfo.name]);
  

  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F8]">
        <Navbar />
        <NavigationLoader />
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${categoryInfo.heroGradient} text-white py-20`}>
        <div className="container-premium">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="h1 mb-4">{categoryInfo.name}</h1>
            <p className="text-xl mb-6">{categoryInfo.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${currentCategory}`} className="btn-premium btn-primary !h-12 !px-8">
                Shop {categoryInfo.name}
              </Link>
              <Link href="/products" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                View All Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="container-premium py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-1/4">
            <FilterSidebar 
              categories={Array.from(new Set(products.map(p => p.category)))}
              brands={["Sony", "Apple", "Nike", "Samsung", "Adidas", "Canon", "Levi's"]}
              activeFilters={activeFilters}
              onFiltersChange={setActiveFilters}
              onFilterChange={(filters) => {}}
            />
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="h2">Featured {categoryInfo.name}</h2>
              <Link href={`/${currentCategory}`} className="text-[#DC2626] font-semibold hover:text-[#B91C1C] transition-colors">
                View All →
              </Link>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    index={idx}
                    layout="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-[#555555]">No {categoryInfo.name.toLowerCase()} products available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Subcategory Navigation */}
      <div className="container-premium py-12">
        <h2 className="h2 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryInfo.subcategories.map((subcategory, idx) => (
            <Link 
              key={idx}
              href={subcategory.href}
              className="group block"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 group-hover:-translate-y-1">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <Image
                    src={subcategory.image}
                    alt={subcategory.name}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg">{subcategory.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}