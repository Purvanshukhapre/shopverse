"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, Truck, Shield, MapPin, Phone, Clock, Globe, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function AboutPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the about page
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
            <h1 className="h1 mb-4">About ShopEverse</h1>
            <p className="text-xl mb-6">Redefining retail through engineering excellence and luxury curation.</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              We don&apos;t just sell products; we deliver a premium standard of life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-premium btn-primary !h-12 !px-8">
                Explore Products
              </Link>
              <Link href="/contact" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Our Story */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-[#555555] mb-6">
                Founded in 2024, ShopEverse began as a vision to transform the e-commerce experience.&apos;
                We recognized that shopping should be more than just transactions—it should be an experience&apos;
                that delights, inspires, and elevates.
              </p>
              <p className="text-lg text-[#555555] mb-6">
                Today, we&apos;re a team of engineers, designers, and retail experts dedicated to building the&apos;
                most sophisticated shopping platform in India. Our mission is simple: to make every purchase&apos;
                feel like a premium experience.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <Globe className="w-6 h-6 text-[#DC2626]" />
                <span className="text-lg font-bold">Global Standards, Indian Roots</span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1552674605-d0a089ecb9de?w=800&h=600&fit=crop&q=80"
                alt="ShopEverse Team"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#DC2626] flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Premium Quality</h3>
              <p className="text-[#555555]">
                Every product on ShopEverse undergoes rigorous quality control. We partner only with brands 
                that meet our exacting standards for craftsmanship, materials, and performance.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Lightning Fast</h3>
              <p className="text-[#555555]">
                From browsing to checkout, our platform delivers instant responses. We&apos;ve optimized every&apos;
                interaction to eliminate friction and maximize speed.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#DC2626] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-3">Reliable Delivery</h3>
              <p className="text-[#555555]">
                Our logistics network ensures your orders arrive on time, every time. With real-time tracking 
                and flexible delivery options, you're always in control.
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
        
        {/* Contact Info */}
        <section>
          <h2 className="h2 mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Our Location</h3>
              <p className="text-[#555555] mb-2">Mumbai, Maharashtra</p>
              <p className="text-[#555555]">India</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Contact Us</h3>
              <p className="text-[#555555] mb-2">+91 98765 43210</p>
              <p className="text-[#555555]">support@shopverse.io</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Business Hours</h3>
              <p className="text-[#555555] mb-2">Monday - Friday: 9AM - 6PM</p>
              <p className="text-[#555555]">Saturday: 10AM - 4PM</p>
              <p className="text-[#555555]">Sunday: Closed</p>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}