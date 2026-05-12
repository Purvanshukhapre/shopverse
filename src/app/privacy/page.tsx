"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Lock, Globe, Calendar, Users2, FileText, Mail, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function PrivacyPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the privacy page
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
            <h1 className="h1 mb-4">Privacy Policy</h1>
            <p className="text-xl mb-6">Your privacy is our priority</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              We respect your privacy and are committed to protecting your personal data in accordance with applicable laws.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-premium btn-primary !h-12 !px-8">
                Contact Privacy Team
              </Link>
              <Link href="/terms" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Introduction</h2>
          <p className="text-lg text-[#555555] mb-4">
            Welcome to ShopEverse's Privacy Policy. This policy explains how we collect, use, disclose, and protect your personal information when you use our website, mobile applications, and services.
          </p>
          <p className="text-lg text-[#555555]">
            By using ShopEverse, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, you may choose not to use our website or services.
          </p>
        </section>
        
        {/* Information Collection */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Information We Collect</h2>
          <div className="space-y-6">
            <div>
              <h3 className="h3 font-bold text-[#111111] mb-3">Personal Information</h3>
              <p className="text-[#555555] mb-4">
                When you create an account, make a purchase, or contact customer support, we may collect personal information such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#555555]">
                <li>Your name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Date of birth and gender (optional)</li>
                <li>Account preferences and communication settings</li>
              </ul>
            </div>
            
            <div>
              <h3 className="h3 font-bold text-[#111111] mb-3">Technical Information</h3>
              <p className="text-[#555555] mb-4">
                We automatically collect technical information when you visit our website, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#555555]">
                <li>IP address, browser type, and operating system</li>
                <li>Pages visited, time spent on pages, and navigation paths</li>
                <li>Device information and unique identifiers</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* How We Use Information */}
        <section className="mb-12">
          <h2 className="h2 mb-6">How We Use Your Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Lock className="w-6 h-6 text-[#DC2626]" />
              </div>
              <div className="flex-1">
                <h3 className="h3 font-bold text-[#111111] mb-2">To Provide Services</h3>
                <p className="text-[#555555]">
                  Process orders, manage accounts, provide customer support, and deliver personalized shopping experiences.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Globe className="w-6 h-6 text-[#DC2626]" />
              </div>
              <div className="flex-1">
                <h3 className="h3 font-bold text-[#111111] mb-2">To Improve Our Services</h3>
                <p className="text-[#555555]">
                  Analyze usage patterns, conduct research, and develop new features and products.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Users2 className="w-6 h-6 text-[#DC2626]" />
              </div>
              <div className="flex-1">
                <h3 className="h3 font-bold text-[#111111] mb-2">For Marketing and Communications</h3>
                <p className="text-[#555555]">
                  Send promotional offers, newsletters, and personalized recommendations (with your consent).
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Data Sharing */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Sharing of Personal Information</h2>
          <p className="text-lg text-[#555555] mb-4">
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Service Providers</h3>
              <p className="text-[#555555]">
                Third-party vendors who help us operate our business, process payments, ship orders, and provide technical support.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Legal Requirements</h3>
              <p className="text-[#555555]">
                When required by law, regulation, legal process, or government request, or to protect our rights, property, or safety.
              </p>
            </div>
          </div>
        </section>
        
        {/* Security */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Data Security</h2>
          <p className="text-lg text-[#555555] mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#16A34A]" />
              </div>
              <span className="text-[#555555]">SSL encryption for all transactions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#16A34A]" />
              </div>
              <span className="text-[#555555]">Secure payment processing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#16A34A]" />
              </div>
              <span className="text-[#555555]">Regular security audits</span>
            </div>
          </div>
        </section>
        
        {/* Contact */}
        <section className="mb-24">
          <h2 className="h2 mb-6">Contact Us</h2>
          <p className="text-lg text-[#555555] mb-6">
            If you have any questions about this Privacy Policy or how we handle your personal information, please contact our Privacy Team:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Email</h3>
              <p className="text-[#555555]">privacy@shopverse.io</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Phone</h3>
              <p className="text-[#555555]">+91 98765 43210</p>
              <p className="text-[#555555]">Mon-Fri: 9AM - 6PM</p>
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