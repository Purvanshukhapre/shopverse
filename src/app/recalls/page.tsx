"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award, AlertTriangle, CheckCircle2, Calendar, MapPin, Phone, Mail, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function RecallsPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Get some featured products for the recalls page
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
            <h1 className="h1 mb-4">Recalls & Safety</h1>
            <p className="text-xl mb-6">Your safety is our top priority</p>
            <p className="text-lg text-[#AAAAAA] mb-8">
              We maintain the highest standards for product safety and quality assurance across our entire marketplace.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/recalls/current" className="btn-premium btn-primary !h-12 !px-8">
                View Current Recalls
              </Link>
              <Link href="/recalls/safety" className="btn-premium !h-12 !px-8 bg-white text-[#111111] hover:bg-gray-100">
                Safety Information
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-premium py-16">
        {/* Safety Commitment */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Our Safety Commitment</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-[#DC2626]" />
              </div>
              <div className="flex-1">
                <h3 className="h3 font-bold text-[#111111] mb-3">Rigorous Quality Assurance</h3>
                <p className="text-[#555555] mb-4">
                  Every product on ShopEverse undergoes multiple layers of safety testing and quality verification before it reaches our customers.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                    <span className="text-[#555555]">Pre-listing Safety Checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                    <span className="text-[#555555]">Third-party Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                    <span className="text-[#555555]">Ongoing Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Current Recalls */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Current Recalls</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                    <span>RECALL NOTICE</span>
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>May 2024</span>
                  </div>
                  <h3 className="h3 font-bold text-[#111111] mb-2">ShopEverse Smart Power Strip - Model SP-2000</h3>
                  <p className="text-[#555555] mb-4">
                    Potential overheating issue that could lead to fire hazard. Affected units manufactured between March 1, 2024 and April 30, 2024.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link href="/recalls/sp-2000" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                      View Details
                      <ChevronDown className="w-4 h-4" />
                    </Link>
                    <button className="btn-premium !h-10 !px-4 text-sm">
                      Check Your Unit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-premium-hover transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                    <span>RECALL NOTICE</span>
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>April 2024</span>
                  </div>
                  <h3 className="h3 font-bold text-[#111111] mb-2">ShopEverse Wireless Earbuds - Model WE-500</h3>
                  <p className="text-[#555555] mb-4">
                    Battery charging circuit issue that may cause battery swelling. Affected units manufactured between January 15, 2024 and March 20, 2024.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link href="/recalls/we-500" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                      View Details
                      <ChevronDown className="w-4 h-4" />
                    </Link>
                    <button className="btn-premium !h-10 !px-4 text-sm">
                      Check Your Unit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Safety Resources */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Safety Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Product Safety Guide</h3>
              <p className="text-[#555555] mb-4">
                Learn how to identify safe products, understand safety certifications, and recognize potential hazards.
              </p>
              <Link href="/safety/guide" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                Read Guide
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Safety Certification</h3>
              <p className="text-[#555555] mb-4">
                Understand the safety certifications we require for different product categories.
              </p>
              <Link href="/safety/certifications" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                View Certifications
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Reporting Safety Issues</h3>
              <p className="text-[#555555] mb-4">
                Report potential safety concerns or product issues directly to our safety team.
              </p>
              <Link href="/safety/report" className="text-[#DC2626] font-semibold hover:text-[#B91C1C] flex items-center gap-1">
                Report Issue
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="mb-24">
          <h2 className="h2 mb-8">Contact Our Safety Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Safety Hotline</h3>
              <p className="text-[#555555] mb-2">+91 98765 43210</p>
              <p className="text-[#555555]">24/7 Emergency Support</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Email Support</h3>
              <p className="text-[#555555] mb-2">safety@shopverse.io</p>
              <p className="text-[#555555]">Response within 2 hours</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="h3 mb-2">Safety Office</h3>
              <p className="text-[#555555] mb-2">ShopEverse Safety Division</p>
              <p className="text-[#555555]">Mumbai, Maharashtra 400001</p>
              <p className="text-[#555555]">India</p>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}