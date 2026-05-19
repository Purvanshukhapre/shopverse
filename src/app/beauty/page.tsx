"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Zap,
  Truck,
  Shield,
  RotateCcw,
  Heart,
  ChevronRight,
  ChevronLeft,
  Flame,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  Clock,
  Percent,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";

import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { toast } from "sonner";

/* ───────────────── HERO ───────────────── */

const HERO_SLIDES = [
  {
    id: 1,
    headline: "Luxury Beauty",
    sub: "Glow Beyond Limits",
    tag: "NEW COLLECTION",
    cta: "Shop Skincare",
    href: "/beauty/skincare",
    bg: "from-[#1A1022] via-[#3B1C4A] to-[#E879F9]",
    accent: "#F9A8D4",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    headline: "Makeup Essentials",
    sub: "Soft Glam • Everyday Luxe",
    tag: "TRENDING",
    cta: "Explore Makeup",
    href: "/beauty/makeup",
    bg: "from-[#2A1020] via-[#6B2147] to-[#F472B6]",
    accent: "#FBCFE8",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    headline: "Skin First",
    sub: "Korean & Clean Beauty",
    tag: "BESTSELLERS",
    cta: "Discover More",
    href: "/beauty/skincare",
    bg: "from-[#1B1B1B] via-[#4C1D95] to-[#C084FC]",
    accent: "#DDD6FE",
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  {
    name: "Skincare",
    href: "/beauty/skincare",
    count: "3.4k+",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Makeup",
    href: "/beauty/makeup",
    count: "2.8k+",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Haircare",
    href: "/beauty/haircare",
    count: "1.9k+",
    img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Fragrance",
    href: "/beauty/fragrances",
    count: "1.1k+",
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Wellness",
    href: "/beauty/wellness",
    count: "950+",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=500&auto=format&fit=crop",
  },
];

const BRANDS = [
  "Rare Beauty",
  "Huda Beauty",
  "MAC",
  "Cetaphil",
  "Minimalist",
  "The Ordinary",
];

const FLASH_DEALS = [
  {
    title: "Vitamin C Serum",
    original: 1999,
    offer: 899,
    off: 55,
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Hydrating Foundation",
    original: 2499,
    offer: 1299,
    off: 48,
    img: "https://images.unsplash.com/photo-1631730486789-7d8b95f28e83?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Luxury Perfume",
    original: 6999,
    offer: 3999,
    off: 43,
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Hair Repair Kit",
    original: 2999,
    offer: 1499,
    off: 50,
    img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=500&auto=format&fit=crop",
  },
];

/* ───────────────── TIMER ───────────────── */

function CountdownTimer() {
  const [time, setTime] = useState({ h: 4, m: 21, s: 33 });

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t;

        s--;

        if (s < 0) {
          s = 59;
          m--;
        }

        if (m < 0) {
          m = 59;
          h--;
        }

        if (h < 0) {
          h = 23;
          m = 59;
          s = 59;
        }

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
          <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">
            {val}
          </span>
          {i < 2 && <span>:</span>}
        </div>
      ))}
    </div>
  );
}

/* ───────────────── HERO SLIDER ───────────────── */

function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(id);
  }, []);

  const slide = HERO_SLIDES[active];

  return (
    <div className="relative overflow-hidden h-[520px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bg} flex`}
        >
          <div className="flex-1 flex flex-col justify-center px-8 md:px-20 z-10">
            <span
              className="text-xs font-black tracking-widest mb-5 px-4 py-2 rounded-full w-fit"
              style={{
                background: slide.accent,
                color: "#111",
              }}
            >
              {slide.tag}
            </span>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-4">
              {slide.headline}
            </h1>

            <p className="text-lg text-white/70 mb-8">{slide.sub}</p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={slide.href}
                className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition"
              >
                {slide.cta}
              </Link>

              <button className="border border-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/10 transition">
                Explore Collection
              </button>
            </div>
          </div>

          <div className="hidden md:block relative w-1/2">
            <Image
              src={slide.img}
              alt={slide.headline}
              fill
              className="object-cover opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ───────────────── FLASH CARD ───────────────── */

function FlashCard({ item }: { item: (typeof FLASH_DEALS)[0] }) {
  const [wish, setWish] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <button
          onClick={() => setWish(!wish)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
        >
          <Heart
            className={`w-4 h-4 ${
              wish ? "fill-pink-500 text-pink-500" : "text-gray-400"
            }`}
          />
        </button>

        <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-black px-2 py-1 rounded">
          {item.off}% OFF
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>

        <div className="flex items-center gap-2">
          <span className="font-black text-lg">
            ₹{item.offer.toLocaleString()}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ₹{item.original.toLocaleString()}
          </span>
        </div>

        <button className="mt-4 w-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white py-2.5 rounded-xl font-bold hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ───────────────── PAGE ───────────────── */

export default function BeautyPage() {
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const beautyProducts = allProducts
      .filter((p) => p.category === "Beauty")
      .slice(0, 12);

    setProducts(beautyProducts);
    setLoading(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F7F4F8]">
      <Navbar />

      {/* Announcement */}
      <div className="bg-[#1A1022] text-white text-center text-xs py-2 font-medium tracking-wide">
        ✨ BEAUTY WEEK LIVE — Extra 15% OFF with code{" "}
        <span className="text-pink-300 font-black">GLOW15</span>
      </div>

      {/* Hero */}
      <HeroSlider />

      {/* Trust strip */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {[
            {
              icon: Truck,
              title: "Free Delivery",
              sub: "Above ₹499",
            },
            {
              icon: Shield,
              title: "100% Authentic",
              sub: "Guaranteed products",
            },
            {
              icon: RotateCcw,
              title: "Easy Returns",
              sub: "30-day returns",
            },
            {
              icon: Award,
              title: "Premium Quality",
              sub: "Trusted brands",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 p-5"
            >
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-pink-500" />
              </div>

              <div>
                <p className="font-black text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        {/* categories */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                Shop by Category
              </h2>

              <p className="text-gray-500 text-sm">
                Explore beauty essentials curated for you
              </p>
            </div>

            <Link
              href="/products"
              className="text-pink-500 font-bold flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[0.9]">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-black text-lg">
                      {cat.name}
                    </h3>

                    <p className="text-pink-200 text-xs">
                      {cat.count} products
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Deals */}
        <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-pink-500 fill-pink-500" />

              <div>
                <h2 className="text-2xl font-black">
                  Flash Beauty Deals
                </h2>

                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <CountdownTimer />
                </div>
              </div>
            </div>

            <Link
              href="/deals"
              className="text-pink-500 font-bold"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FLASH_DEALS.map((item, i) => (
              <FlashCard key={i} item={item} />
            ))}
          </div>
        </section>

        {/* Promo banners */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="relative rounded-3xl overflow-hidden h-64">
            <Image
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <span className="text-pink-300 text-xs font-black tracking-widest mb-3">
                CLEAN BEAUTY
              </span>

              <h3 className="text-4xl font-black text-white leading-tight">
                Glow Naturally
              </h3>

              <Link
                href="/beauty/skincare"
                className="mt-4 inline-flex items-center gap-2 text-pink-300 font-bold"
              >
                Explore Skincare <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden h-64">
            <Image
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#3B0764]/80 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <span className="text-purple-200 text-xs font-black tracking-widest mb-3">
                MAKEUP EDIT
              </span>

              <h3 className="text-4xl font-black text-white leading-tight">
                Everyday Glam
              </h3>

              <Link
                href="/beauty/makeup"
                className="mt-4 inline-flex items-center gap-2 text-purple-200 font-bold"
              >
                Shop Makeup <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* brands */}
        <section className="bg-white rounded-3xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black">Top Beauty Brands</h2>
              <p className="text-sm text-gray-500">
                Trusted luxury & skincare labels
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {BRANDS.map((brand) => (
              <div
                key={brand}
                className="bg-[#FAF7FB] border border-gray-100 rounded-2xl p-5 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-pink-100 to-purple-100 mb-4 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                </div>

                <h3 className="font-bold text-gray-900">
                  {brand}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Premium Beauty
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="bg-white rounded-3xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black">
                Trending in Beauty
              </h2>

              <p className="text-sm text-gray-500">
                Loved by skincare & makeup enthusiasts
              </p>
            </div>

            <Link
              href="/products"
              className="text-pink-500 font-bold"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

        {/* Social proof */}
        <section className="grid md:grid-cols-4 gap-4">
          {[
            {
              val: "1M+",
              label: "Beauty Lovers",
              icon: Users,
            },
            {
              val: "4.9★",
              label: "Average Rating",
              icon: Star,
            },
            {
              val: "500+",
              label: "Luxury Brands",
              icon: Award,
            },
            {
              val: "24/7",
              label: "Beauty Support",
              icon: Zap,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-pink-500" />
              </div>

              <div>
                <h3 className="text-2xl font-black">
                  {item.val}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </section>

      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-[#1A1022] via-[#3B1C4A] to-[#E879F9] py-14 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-white">
              Join The Beauty Club
            </h3>

            <p className="text-pink-100 mt-2">
              Get exclusive launches, skincare tips & premium offers.
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-80 px-4 py-3 rounded-xl text-black"
            />

            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}