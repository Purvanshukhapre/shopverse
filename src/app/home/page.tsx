"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import {
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Heart,
  Flame,
  Clock,
  Star,
  Award,
  Users,
  Sofa,
  Lamp,
  Home,
  Sparkles,
  ArrowRight,
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
    headline: "Modern Living",
    sub: "Minimal • Elegant • Timeless",
    tag: "NEW COLLECTION",
    cta: "Shop Furniture",
    href: "/home/furniture",
    bg: "from-[#1F1A17] via-[#4B3B2A] to-[#C8A97E]",
    accent: "#F5D7B2",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    headline: "Warm Interiors",
    sub: "Create Spaces You Love",
    tag: "BESTSELLERS",
    cta: "Explore Decor",
    href: "/home/decor",
    bg: "from-[#23211F] via-[#6B4F3B] to-[#D4A373]",
    accent: "#FFE8CC",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    headline: "Dream Bedroom",
    sub: "Luxury Bedding & Comfort",
    tag: "TRENDING",
    cta: "Shop Bedroom",
    href: "/home/bedding",
    bg: "from-[#2B2B2B] via-[#555555] to-[#D6CCC2]",
    accent: "#F8EDEB",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
];

/* ───────────────── CATEGORIES ───────────────── */

const CATEGORIES = [
  {
    name: "Furniture",
    href: "/home/furniture",
    count: "4.2k+",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Decor",
    href: "/home/decor",
    count: "2.8k+",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Lighting",
    href: "/home/lighting",
    count: "1.9k+",
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Kitchen",
    href: "/home/kitchen",
    count: "3.1k+",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Bedroom",
    href: "/home/bedding",
    count: "1.7k+",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Storage",
    href: "/home/storage",
    count: "980+",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=600&auto=format&fit=crop",
  },
];

/* ───────────────── FLASH DEALS ───────────────── */

const FLASH_DEALS = [
  {
    title: "Velvet Accent Chair",
    original: 14999,
    offer: 8999,
    off: 40,
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Minimal Table Lamp",
    original: 4999,
    offer: 2499,
    off: 50,
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Luxury Bedding Set",
    original: 6999,
    offer: 3499,
    off: 50,
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Wooden Dining Table",
    original: 24999,
    offer: 15999,
    off: 36,
    img: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=600&auto=format&fit=crop",
  },
];

/* ───────────────── BRANDS ───────────────── */

const BRANDS = [
  "IKEA",
  "West Elm",
  "Ashley",
  "Urban Ladder",
  "Pottery Barn",
  "Crate & Barrel",
];

/* ───────────────── TIMER ───────────────── */

function CountdownTimer() {
  const [time, setTime] = useState({ h: 6, m: 14, s: 52 });

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
    <div className="relative h-[540px] overflow-hidden">
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

            <p className="text-lg text-white/70 mb-8">
              {slide.sub}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={slide.href}
                className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition"
              >
                {slide.cta}
              </Link>

              <button className="border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition">
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
    </div>
  );
}

/* ───────────────── FLASH CARD ───────────────── */

function FlashCard({ item }: { item: (typeof FLASH_DEALS)[0] }) {
  const [wish, setWish] = useState(false);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1">
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
              wish
                ? "fill-amber-600 text-amber-600"
                : "text-gray-400"
            }`}
          />
        </button>

        <span className="absolute top-3 left-3 bg-[#8B5E34] text-white text-xs font-black px-2 py-1 rounded">
          {item.off}% OFF
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2">
          {item.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="font-black text-lg">
            ₹{item.offer.toLocaleString()}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ₹{item.original.toLocaleString()}
          </span>
        </div>

        <button className="mt-4 w-full bg-[#2B2B2B] hover:bg-black text-white py-2.5 rounded-xl font-bold transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ───────────────── PAGE ───────────────── */

export default function HomePage() {
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const homeProducts = allProducts
      .filter((p) => p.category === "Home")
      .slice(0, 12);

    setProducts(homeProducts);
    setLoading(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F6F3EF]">
      <Navbar />

      {/* announcement */}
      <div className="bg-[#2B2B2B] text-white text-center text-xs py-2 font-medium tracking-wide">
        🏡 HOME MAKEOVER SALE — Up to 60% OFF on premium furniture
      </div>

      {/* hero */}
      <HeroSlider />

      {/* trust strip */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {[
            {
              icon: Truck,
              title: "Free Delivery",
              sub: "Above ₹999",
            },
            {
              icon: Shield,
              title: "Premium Craftsmanship",
              sub: "Built to last",
            },
            {
              icon: RotateCcw,
              title: "Easy Returns",
              sub: "30-day returns",
            },
            {
              icon: Award,
              title: "Luxury Materials",
              sub: "Curated quality",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 p-5"
            >
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#8B5E34]" />
              </div>

              <div>
                <p className="font-black text-sm">
                  {item.title}
                </p>

                <p className="text-xs text-gray-500">
                  {item.sub}
                </p>
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
                Shop by Room
              </h2>

              <p className="text-gray-500 text-sm">
                Curated essentials for every space
              </p>
            </div>

            <Link
              href="/products"
              className="text-[#8B5E34] font-bold flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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

                    <p className="text-amber-100 text-xs">
                      {cat.count}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* flash deals */}
        <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />

              <div>
                <h2 className="text-2xl font-black">
                  Flash Home Deals
                </h2>

                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <CountdownTimer />
                </div>
              </div>
            </div>

            <Link
              href="/deals"
              className="text-[#8B5E34] font-bold"
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

        {/* banners */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="relative rounded-3xl overflow-hidden h-72">
            <Image
              src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <span className="text-amber-200 text-xs font-black tracking-widest mb-3">
                MODERN INTERIORS
              </span>

              <h3 className="text-4xl font-black text-white leading-tight">
                Timeless Living Spaces
              </h3>

              <Link
                href="/home/furniture"
                className="mt-4 inline-flex items-center gap-2 text-amber-200 font-bold"
              >
                Explore Furniture <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden h-72">
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B2B]/70 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <span className="text-white/80 text-xs font-black tracking-widest mb-3">
                HOME DECOR
              </span>

              <h3 className="text-4xl font-black text-white leading-tight">
                Elevate Every Corner
              </h3>

              <Link
                href="/home/decor"
                className="mt-4 inline-flex items-center gap-2 text-white font-bold"
              >
                Shop Decor <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* brands */}
        <section className="bg-white rounded-3xl p-6 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-black">
              Premium Brands
            </h2>

            <p className="text-sm text-gray-500">
              Trusted names in modern interiors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {BRANDS.map((brand) => (
              <div
                key={brand}
                className="bg-[#FAF7F2] border border-gray-100 rounded-2xl p-5 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 mb-4 flex items-center justify-center">
                  <Home className="w-6 h-6 text-[#8B5E34]" />
                </div>

                <h3 className="font-bold text-gray-900">
                  {brand}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Luxury Living
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* products */}
        <section className="bg-white rounded-3xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black">
                Trending Furniture
              </h2>

              <p className="text-sm text-gray-500">
                Modern pieces for elegant homes
              </p>
            </div>

            <Link
              href="/products"
              className="text-[#8B5E34] font-bold"
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

        {/* stats */}
        <section className="grid md:grid-cols-4 gap-4">
          {[
            {
              val: "500k+",
              label: "Happy Homes",
              icon: Users,
            },
            {
              val: "4.9★",
              label: "Average Rating",
              icon: Star,
            },
            {
              val: "10k+",
              label: "Furniture Designs",
              icon: Sofa,
            },
            {
              val: "24/7",
              label: "Interior Support",
              icon: Sparkles,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#8B5E34]" />
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

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#2B2B2B] via-[#6B4F3B] to-[#D4A373] py-14 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-white">
              Build Your Dream Space
            </h3>

            <p className="text-white/80 mt-2">
              Discover curated interiors, furniture & modern home essentials.
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