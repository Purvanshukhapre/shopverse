"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Star, ShoppingCart, Zap, CheckCircle, Truck, Shield,
  RotateCcw, Share2, Heart, ChevronDown, Filter, Users,
  Package, Award, Tag, Clock, ChevronRight, ChevronLeft,
  Flame, TrendingUp, Search, Bell, MapPin, Percent
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

/* ─────────────────────── helpers ─────────────────────── */
const HERO_SLIDES = [
  {
    id: 1,
    headline: "Summer Sale",
    sub: "Up to 70% Off — Ends Tonight",
    tag: "LIMITED OFFER",
    cta: "Shop Now",
    href: "/fashion/sale",
    bg: "from-[#0F172A] to-[#1E3A5F]",
    accent: "#F97316",
    img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    headline: "New Season",
    sub: "Fresh Arrivals from Top Brands",
    tag: "JUST DROPPED",
    cta: "Explore",
    href: "/fashion/new-arrivals",
    bg: "from-[#1A0A2E] to-[#2D1B4E]",
    accent: "#A855F7",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    headline: "Streetwear Edit",
    sub: "Bold Looks for Bold People",
    tag: "TRENDING",
    cta: "View Looks",
    href: "/fashion/streetwear",
    bg: "from-[#0A1A0A] to-[#1A3A1A]",
    accent: "#22C55E",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  { name: "Men", href: "/fashion/men", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=400&auto=format&fit=crop", count: "2.4k+" },
  { name: "Women", href: "/fashion/women", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop", count: "5.1k+" },
  { name: "Footwear", href: "/fashion/footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop", count: "1.8k+" },
  { name: "Bags", href: "/fashion/bags", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop", count: "980+" },
  { name: "Kids", href: "/fashion/kids", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=400&auto=format&fit=crop", count: "1.2k+" },
  { name: "Watches", href: "/fashion/watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop", count: "640+" },
  { name: "Ethnic", href: "/fashion/ethnic", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop", count: "3.3k+" },
  { name: "Sports", href: "/fashion/sports", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop", count: "870+" },
];

const BRANDS = [
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", deal: "Up to 50% off" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_logo.svg", deal: "Min 40% off" },
  { name: "Levis", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Levi%27s_logo.svg", deal: "Buy 2 Get 1" },
  { name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Zara_logo.svg", deal: "New Season" },
  { name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg", deal: "₹299 onwards" },
  { name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Puma_logo.svg/200px-Puma_logo.svg.png", deal: "30–60% off" },
];

const DEAL_STRIPS = [
  { label: "FREE DELIVERY", sub: "On orders above ₹499", icon: Truck },
  { label: "EASY RETURNS", sub: "30-day hassle-free returns", icon: RotateCcw },
  { label: "SECURE PAYMENT", sub: "100% safe transactions", icon: Shield },
  { label: "24/7 SUPPORT", sub: "We're always here for you", icon: Users },
];

const FLASH_DEALS = [
  { title: "Calvin Klein Slim Tee", original: 2499, offer: 999, off: 60, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop" },
  { title: "Levi's 511 Denim", original: 4999, offer: 1999, off: 60, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&auto=format&fit=crop" },
  { title: "Nike Air Max 270", original: 9999, offer: 4499, off: 55, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop" },
  { title: "Zara Blazer Set", original: 5999, offer: 2399, off: 60, img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4de7?q=80&w=400&auto=format&fit=crop" },
  { title: "Adidas Track Jacket", original: 3999, offer: 1599, off: 60, img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=400&auto=format&fit=crop" },
  { title: "Ray-Ban Aviators", original: 6999, offer: 2799, off: 60, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop" },
];

/* ─────────────────────── Timer ─────────────────────── */
function CountdownTimer() {
  const [time, setTime] = useState({ h: 4, m: 23, s: 47 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime(t => {
        let { h, m, s } = t;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 23, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-1">
      {[pad(time.h), pad(time.m), pad(time.s)].map((val, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="bg-gray-900 text-white font-mono font-bold text-sm px-2 py-1 rounded">{val}</span>
          {i < 2 && <span className="text-gray-900 font-bold text-sm">:</span>}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────── Hero Slider ─────────────────────── */
function HeroSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);
  const slide = HERO_SLIDES[active];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "480px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bg} flex`}
        >
          {/* Text side */}
          <div className="flex-1 flex flex-col justify-center px-12 md:px-20 z-10">
            <span
              className="text-xs font-black tracking-widest mb-4 px-3 py-1 rounded-full w-fit"
              style={{ background: slide.accent, color: "#fff" }}
            >
              {slide.tag}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-3">
              {slide.headline}
            </h1>
            <p className="text-white/70 text-lg mb-8">{slide.sub}</p>
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-lg w-fit transition-transform hover:scale-105"
              style={{ background: slide.accent, color: "#fff" }}
            >
              {slide.cta} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Image side */}
          <div className="hidden md:block w-1/2 relative">
            <Image src={slide.img} alt={slide.headline} fill className="object-cover opacity-80" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all"
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              background: i === active ? slide.accent : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setActive(a => (a - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setActive(a => (a + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

/* ─────────────────────── Flash Deal Card ─────────────────────── */
function FlashDealCard({ item }: { item: typeof FLASH_DEALS[0] }) {
  const [wish, setWish] = useState(false);
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-1 rounded">
          {item.off}% OFF
        </span>
        <button
          onClick={() => setWish(w => !w)}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow transition-transform hover:scale-110"
        >
          <Heart className={`w-4 h-4 ${wish ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-1">{item.title}</p>
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-gray-900">₹{item.offer.toLocaleString()}</span>
          <span className="text-xs text-gray-400 line-through">₹{item.original.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {[1,2,3,4].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
          <Star className="w-3 h-3 text-gray-200" />
          <span className="text-xs text-gray-500 ml-1">(128)</span>
        </div>
        <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2 rounded-lg transition flex items-center justify-center gap-1">
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */
export default function FashionPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"trending" | "bestseller" | "new">("trending");

  useEffect(() => {
    const fashionProducts = allProducts.filter(p => p.category === "Fashion").slice(0, 12);
    setProducts(fashionProducts);
    setLoading(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F4F4F4] font-sans">
      <Navbar />

      {/* ── Announcement Bar ── */}
      <div className="bg-gray-900 text-white text-xs text-center py-2 px-4 font-medium tracking-wide">
        🔥 SUMMER SALE LIVE — Extra 10% off with code <span className="font-black text-orange-400">SUMMER10</span> &nbsp;|&nbsp; Free shipping above ₹499
      </div>

      {/* ── Hero Slider ── */}
      <HeroSlider />

      {/* ── Trust Strip ── */}
      <div className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {DEAL_STRIPS.map(({ label, sub, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 py-4 px-6">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 tracking-wide">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* ── Shop by Category ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-gray-900">Shop by Category</h2>
              <p className="text-sm text-gray-500">Find exactly what you're looking for</p>
            </div>
            <Link href="/products" className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
              All Categories <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {CATEGORIES.map(cat => (
              <Link key={cat.name} href={cat.href} className="group flex flex-col items-center gap-2">
                <div className="w-full aspect-square rounded-2xl overflow-hidden relative border-2 border-transparent group-hover:border-orange-400 transition-all duration-200">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-1 right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-orange-500 transition-colors text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Flash Deals ── */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Flame className="w-5 h-5 text-red-500 fill-red-500" />
                <h2 className="text-xl font-black text-gray-900">Flash Deals</h2>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-xs font-semibold text-gray-600 mr-1">Ends in:</span>
                <CountdownTimer />
              </div>
            </div>
            <Link href="/deals" className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
              See All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FLASH_DEALS.map((item, i) => (
              <FlashDealCard key={i} item={item} />
            ))}
          </div>
        </section>

        {/* ── Two Promotional Banners ── */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden h-48 bg-gradient-to-r from-[#0F172A] to-[#1E293B] flex items-center px-8 group cursor-pointer">
            <div className="absolute inset-0 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1588117305388-c2631a279f82?q=80&w=600&auto=format&fit=crop" alt="" fill className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative z-10">
              <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded mb-3 inline-block tracking-wider">MEN'S EXCLUSIVE</span>
              <h3 className="text-3xl font-black text-white leading-tight">Premium<br/>Casualwear</h3>
              <Link href="/fashion/men" className="mt-3 inline-flex items-center gap-1 text-orange-400 font-bold text-sm hover:gap-2 transition-all">
                Shop Collection <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-48 bg-gradient-to-r from-[#3B0764] to-[#6B21A8] flex items-center px-8 group cursor-pointer">
            <div className="absolute inset-0 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop" alt="" fill className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative z-10">
              <span className="bg-pink-500 text-white text-[10px] font-black px-2 py-1 rounded mb-3 inline-block tracking-wider">WOMEN'S EDIT</span>
              <h3 className="text-3xl font-black text-white leading-tight">Style That<br/>Turns Heads</h3>
              <Link href="/fashion/women" className="mt-3 inline-flex items-center gap-1 text-pink-300 font-bold text-sm hover:gap-2 transition-all">
                Shop Collection <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Top Brands ── */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-black text-gray-900">Top Brands</h2>
              <p className="text-sm text-gray-500">Shop directly from your favourite labels</p>
            </div>
            <Link href="/brands" className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
              All Brands <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {BRANDS.map(brand => (
              <Link
                key={brand.name}
                href={`/products?brand=${brand.name.toLowerCase()}`}
                className="group flex flex-col items-center gap-2 bg-gray-50 hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-xl p-4 transition-all"
              >
                <div className="w-14 h-14 relative flex items-center justify-center">
                  <Image src={brand.logo} alt={brand.name} width={56} height={56} className="object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900">{brand.name}</span>
                <span className="text-[10px] text-orange-500 font-semibold text-center leading-tight">{brand.deal}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Tabbed Product Grid ── */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {([
                { key: "trending", label: "🔥 Trending", icon: TrendingUp },
                { key: "bestseller", label: "⭐ Bestsellers", icon: Award },
                { key: "new", label: "✨ New Arrivals", icon: Zap },
              ] as const).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === tab.key
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <Link href="/products" className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.slice(0, 8).map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} layout="grid" />
              ))}
            </div>
          )}
        </section>

        {/* ── Style Guide Banner ── */}
        <section className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop"
            alt="Style Guide"
            width={1200}
            height={300}
            className="w-full object-cover"
            style={{ height: 260 }}
          />
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16">
            <span className="text-orange-400 text-xs font-black tracking-widest mb-3">STYLE GUIDE 2025</span>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Outfits for Every<br />Occasion
            </h3>
            <Link
              href="/fashion/style-guide"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-sm px-6 py-3 rounded-lg w-fit hover:bg-orange-500 hover:text-white transition-all"
            >
              Explore Lookbooks <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Coupon Strip ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { code: "FIRST10", desc: "10% off your first order", min: "No minimum spend", color: "from-orange-500 to-red-500" },
            { code: "STYLE20", desc: "₹200 off on ₹999+", min: "Min. order ₹999", color: "from-purple-500 to-pink-500" },
            { code: "FREESHIP", desc: "Free delivery all week", min: "All orders included", color: "from-teal-500 to-green-500" },
          ].map(c => (
            <div key={c.code} className={`relative bg-gradient-to-r ${c.color} rounded-xl p-4 text-white overflow-hidden`}>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <Percent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-lg tracking-wider">{c.code}</p>
                  <p className="text-sm text-white/80">{c.desc}</p>
                  <p className="text-xs text-white/60 mt-0.5">{c.min}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(c.code);
                    toast.success(`Code ${c.code} copied!`);
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* ── More Products ── */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-gray-900">You May Also Like</h2>
            <Link href="/products" className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.slice(4, 8).map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} layout="grid" />
              ))}
            </div>
          )}
        </section>

        {/* ── Recently Viewed / Social Proof ── */}
        <section className="grid md:grid-cols-2 gap-4">
          {/* Stats */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-black text-gray-900 mb-4">Why Shop With Us?</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "2M+", label: "Happy Customers", icon: Users },
                { val: "50k+", label: "Styles Available", icon: Tag },
                { val: "4.8★", label: "Average Rating", icon: Star },
                { val: "99%", label: "On-Time Delivery", icon: Truck },
              ].map(({ val, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-gray-900 leading-none">{val}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* App Download */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col justify-between">
            <div>
              <span className="text-orange-400 text-xs font-black tracking-widest">DOWNLOAD THE APP</span>
              <h3 className="text-2xl font-black text-white mt-2 leading-tight">
                Shop Faster,<br />Smarter, Better
              </h3>
              <p className="text-gray-400 text-sm mt-2">Get exclusive app-only deals and track orders in real-time.</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-2 bg-white text-gray-900 rounded-lg px-4 py-2.5 font-bold text-sm hover:bg-gray-100 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.42.07 2.38.74 3.2.78 1.22-.24 2.38-.93 3.7-.84 1.58.12 2.77.74 3.55 1.87-3.27 1.96-2.74 6.27.55 7.59-.65 1.56-1.48 3.1-3 3.48zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                App Store
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-900 rounded-lg px-4 py-2.5 font-bold text-sm hover:bg-gray-100 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/></svg>
                Google Play
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ── Full-Width CTA ── */}
      <div className="bg-orange-500 py-10 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-white">Never Miss a Deal</h3>
            <p className="text-orange-100 text-sm">Subscribe and get exclusive offers straight to your inbox.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-4 py-3 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3 rounded-lg text-sm transition flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}