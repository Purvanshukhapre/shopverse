"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, FileText, Calendar, Users2, Globe, ShieldCheck, Mail, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function TermsPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the terms page
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
            <h1 className="h1 mb-4">Terms of Service</h1>
            <p className="text-xl mb-6">Effective Date: May 1, 2024</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              These Terms of Service govern your use of ShopEverse's website, mobile applications, and services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-premium btn-primary !h-12 !px-8">
                Contact Legal Team
              </Link>
              <Link href="/privacy" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Privacy Policy
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
            Welcome to ShopEverse. These Terms of Service ("Terms") govern your access to and use of our website, mobile applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
          </p>
          <p className="text-lg text-[#555555]">
            If you do not agree to these Terms, you may not use our Services. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting on our website.
          </p>
        </section>
        
        {/* Account Registration */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Account Registration</h2>
          <div className="space-y-4">
            <div>
              <h3 className="h3 font-bold text-[#111111] mb-3">Eligibility</h3>
              <p className="text-[#555555] mb-4">
                You must be at least 18 years old to use our Services. By creating an account, you represent and warrant that you meet this age requirement and that all information you provide is accurate and complete.
              </p>
            </div>
            
            <div>
              <h3 className="h3 font-bold text-[#111111] mb-3">Account Security</h3>
              <p className="text-[#555555] mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized access or security breach.
              </p>
            </div>
          </div>
        </section>
        
        {/* Purchases & Payments */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Purchases & Payments</h2>
          <div className="space-y-4">
            <div>
              <h3 className="h3 font-bold text-[#111111] mb-3">Order Acceptance</h3>
              <p className="text-[#555555] mb-4">
                All orders are subject to acceptance by ShopEverse. We reserve the right to refuse or cancel any order for any reason, including but not limited to pricing errors, product availability issues, or suspicious activity.
              </p>
            </div>
            
            <div>
              <h3 className="h3 font-bold text-[#111111] mb-3">Pricing & Taxes</h3>
              <p className="text-[#555555] mb-4">
                Prices displayed on our website are in Indian Rupees (₹) and include applicable taxes unless otherwise stated. We reserve the right to change prices at any time without notice.
              </p>
            </div>
            
            <div>
              <h3 className="h3 font-bold text-[#111111] mb-3">Payment Methods</h3>
              <p className="text-[#555555] mb-4">
                We accept various payment methods including credit/debit cards, net banking, UPI, and cash on delivery. All payments are processed securely through third-party providers.
              </p>
            </div>
          </div>
        </section>
        
        {/* Returns & Refunds */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Returns & Refunds</h2>
          <div className="space-y-4">
            <div>
              <h3 className="h3 font-bold text-[#111111] mb-3">Return Policy</h3>
              <p className="text-[#555555] mb-4">
                Our standard return policy allows returns within 30 days of delivery. Items must be in original condition with all packaging and accessories included. Some items may be subject to different return policies.
              </p>
            </div>
            
            <div>
              <h3 className="h3 font-bold text-[#111111] mb-3">Refund Process</h3>
              <p className="text-[#555555] mb-4">
                Refunds will be processed to the original payment method within 2 business days of receiving and inspecting your return. Shipping costs are non-refundable unless the return is due to our error.
              </p>
            </div>
          </div>
        </section>
        
        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Intellectual Property</h2>
          <p className="text-lg text-[#555555] mb-4">
            All content on our website, including text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of ShopEverse or its content suppliers and is protected by Indian and international copyright laws.
          </p>
          <p className="text-lg text-[#555555]">
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.
          </p>
        </section>
        
        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Limitation of Liability</h2>
          <p className="text-lg text-[#555555] mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SHOPEVERSE AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE OUR SERVICES.
          </p>
          <p className="text-lg text-[#555555]">
            OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID TO US IN THE PREVIOUS SIX MONTHS.
          </p>
        </section>
        
        {/* Governing Law */}
        <section className="mb-12">
          <h2 className="h2 mb-6">Governing Law & Dispute Resolution</h2>
          <p className="text-lg text-[#555555] mb-4">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any dispute arising out of or related to these Terms shall be resolved exclusively in the courts located in Mumbai, Maharashtra.
          </p>
          <p className="text-lg text-[#555555]">
            For any disputes involving amounts less than ₹20,000, we encourage informal resolution through our customer support team before pursuing formal legal action.
          </p>
        </section>
        
        {/* Contact */}
        <section className="mb-24">
          <h2 className="h2 mb-6">Contact Us</h2>
          <p className="text-lg text-[#555555] mb-6">
            If you have any questions about these Terms of Service, please contact our Legal Team:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Email</h3>
              <p className="text-[#555555]">legal@shopverse.io</p>
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