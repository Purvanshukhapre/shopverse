"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, Mail, Phone, MapPin, Calendar, Users2, Send, MessageCircle, HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function ContactPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the contact page
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent!', {
      icon: <Send className="w-4 h-4 text-emerald-500" />, 
      className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
    });
  };
  
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
            <h1 className="h1 mb-4">Contact Us</h1>
            <p className="text-xl mb-6">We&apos;re here to help you with any questions or concerns</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              Our customer support team is available to assist you with everything from account management to technical issues.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/help" className="btn-premium btn-primary !h-12 !px-8">
                Visit Help Center
              </Link>
              <Link href="/contact/live-chat" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Live Chat
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Contact Information */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Our Location</h3>
              <p className="text-[#555555] mb-2">ShopEverse Headquarters</p>
              <p className="text-[#555555]">Mumbai, Maharashtra 400001</p>
              <p className="text-[#555555]">India</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Customer Support</h3>
              <p className="text-[#555555] mb-2">+91 98765 43210</p>
              <p className="text-[#555555]">Mon-Fri: 9AM - 6PM</p>
              <p className="text-[#555555]">Sat: 10AM - 4PM</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Email Support</h3>
              <p className="text-[#555555] mb-2">support@shopverse.io</p>
              <p className="text-[#555555]">Response within 24 hours</p>
              <p className="text-[#555555]">24/7 for urgent issues</p>
            </div>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Send Us a Message</h2>
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#111111] mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full h-12 px-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#111111] mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full h-12 px-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-[#111111] mb-2">Subject</label>
                <select
                  id="subject"
                  required
                  className="w-full h-12 px-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="account">Account Issues</option>
                  <option value="orders">Order Related</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-[#111111] mb-2">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="btn-premium btn-primary w-full !h-14 !px-8"
              >
                <Send className="w-5 h-5 mr-2 inline" />
                Send Message
              </button>
            </form>
          </div>
        </section>
        
        {/* Quick Links */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Help Center</h3>
              <p className="text-[#555555] text-sm">
                Find answers to common questions and get step-by-step guidance.
              </p>
              <Link href="/help" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1 mt-2">
                Visit Help Center
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Shipping & Returns</h3>
              <p className="text-[#555555] text-sm">
                Understand our shipping options, delivery times, and return policy.
              </p>
              <Link href="/returns" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1 mt-2">
                View Policy
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#DC2626] hover:shadow-premium-hover transition-all">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 font-bold text-[#111111] mb-2">Privacy & Security</h3>
              <p className="text-[#555555] text-sm">
                Learn how we protect your personal information and ensure secure transactions.
              </p>
              <Link href="/privacy" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1 mt-2">
                Read Policy
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