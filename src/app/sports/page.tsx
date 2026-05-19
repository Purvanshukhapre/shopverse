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
  Dumbbell,
  Trophy,
  Zap,
  TimerReset,
  ArrowRight,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";

import type { Product } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";

/* ───────────────── HERO ───────────────── */

const HERO_SLIDES = [
  {
    id: 1,
    headline: "Train Hard",
    sub: "Elite Gear For Every Athlete",
    tag: "PERFORMANCE EDIT",
    cta: "Shop Activewear",
    href: "/sports/activewear",
    bg: "from-[#07111F] via-[#0F2747] to-[#00B4FF]",
    accent: "#7DD3FC",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    headline: "Push Beyond",
    sub: "Strength • Speed • Endurance",
    tag: "NEW ARRIVALS",
    cta: "Explore Equipment",
    href: "/sports/fitness-equipment",
    bg: "from-[#111827] via-[#1E3A8A] to-[#2563EB]",
    accent: "#BFDBFE",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    headline: "Outdoor Ready",
    sub: "Adventure Starts Here",
    tag: "TRENDING NOW",
    cta: "Shop Outdoor Gear",
    href: "/sports/outdoor-gear",
    bg: "from-[#0A0F0D] via-[#14532D] to-[#22C55E]",
    accent: "#BBF7D0",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
];

/* ───────────────── CATEGORIES ───────────────── */

const CATEGORIES = [
  {
    name: "Activewear",
    href: "/sports/activewear",
    count: "4.5k+",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Fitness",
    href: "/sports/fitness-equipment",
    count: "2.3k+",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Running",
    href: "/sports/running",
    count: "1.9k+",
    img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Outdoor",
    href: "/sports/outdoor-gear",
    count: "1.2k+",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Footwear",
    href: "/sports/sports-footwear",
    count: "3.8k+",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    href: "/sports/accessories",
    count: "950+",
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
  },
];

/* ───────────────── FLASH DEALS ───────────────── */

const FLASH_DEALS = [
  {
    title: "Nike Running Shoes",
    original: 9999,
    offer: 5499,
    off: 45,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Gym Dumbbell Set",
    original: 6999,
    offer: 3999,
    off: 43,
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Compression Activewear",
    original: 3999,
    offer: 1999,
    off: 50,
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Outdoor Backpack",
    original: 5999,
    offer: 2999,
    off: 50,
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
  },
];

/* ───────────────── BRANDS ───────────────── */

const BRANDS = [
  "Nike",
  "Adidas",
  "Puma",
  "Under Armour",
  "Reebok",
  "Asics",
];

/* ───────────────── TIMER ───────────────── */

function CountdownTimer() {
  const [time, setTime] = useState({ h: 3, m: 18, s: 42 });

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
                ? "fill-blue-500 text-blue-500"
                : "text-gray-400"
            }`}
          />
        </button>

        <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-black px-2 py-1 rounded">
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

        <button className="mt-4 w-full bg-[#0F172A] hover:bg-black text-white py-2.5 rounded-xl font-bold transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ───────────────── PAGE ───────────────── */

export default function SportsPage() {
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sportsProducts = allProducts
      .filter((p) => p.category === "Sports")
      .slice(0, 12);

    setProducts(sportsProducts);
    setLoading(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F3F7FB]">
      <Navbar />

      {/* announcement */}
      <div className="bg-[#0F172A] text-white text-center text-xs py-2 font-medium tracking-wide">
        ⚡ SPORTS WEEK SALE — Up to 50% OFF on elite performance gear
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
              title: "Professional Quality",
              sub: "Performance tested",
            },
            {
              icon: RotateCcw,
              title: "Easy Returns",
              sub: "30-day returns",
            },
            {
              icon: Trophy,
              title: "Athlete Approved",
              sub: "Trusted by pros",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 p-5"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-blue-500" />
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
                Shop by Category
              </h2>

              <p className="text-gray-500 text-sm">
                Gear up for every sport & workout
              </p>
            </div>

            <Link
              href="/products"
              className="text-blue-500 font-bold flex items-center gap-1"
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

                    <p className="text-blue-100 text-xs">
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
                  Flash Sports Deals
                </h2>

                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <CountdownTimer />
                </div>
              </div>
            </div>

            <Link
              href="/deals"
              className="text-blue-500 font-bold"
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

        {/* promo banners */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="relative rounded-3xl overflow-hidden h-72">
            <Image
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <span className="text-blue-200 text-xs font-black tracking-widest mb-3">
                PERFORMANCE WEAR
              </span>

              <h3 className="text-4xl font-black text-white leading-tight">
                Built For Champions
              </h3>

              <Link
                href="/sports/activewear"
                className="mt-4 inline-flex items-center gap-2 text-blue-200 font-bold"
              >
                Shop Activewear <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden h-72">
            <Image
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/70 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <span className="text-green-200 text-xs font-black tracking-widest mb-3">
                FITNESS ESSENTIALS
              </span>

              <h3 className="text-4xl font-black text-white leading-tight">
                Train Smarter Everyday
              </h3>

              <Link
                href="/sports/fitness-equipment"
                className="mt-4 inline-flex items-center gap-2 text-green-200 font-bold"
              >
                Explore Fitness <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* brands */}
        <section className="bg-white rounded-3xl p-6 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-black">
              Top Sports Brands
            </h2>

            <p className="text-sm text-gray-500">
              Trusted by athletes worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {BRANDS.map((brand) => (
              <div
                key={brand}
                className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 mb-4 flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-blue-500" />
                </div>

                <h3 className="font-bold text-gray-900">
                  {brand}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Elite Performance
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
                Trending Sports Gear
              </h2>

              <p className="text-sm text-gray-500">
                High-performance essentials for every athlete
              </p>
            </div>

            <Link
              href="/products"
              className="text-blue-500 font-bold"
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
              val: "2M+",
              label: "Active Athletes",
              icon: Users,
            },
            {
              val: "4.9★",
              label: "Average Rating",
              icon: Star,
            },
            {
              val: "15k+",
              label: "Sports Products",
              icon: Trophy,
            },
            {
              val: "24/7",
              label: "Fitness Support",
              icon: Zap,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-blue-500" />
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
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#00B4FF] py-14 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-white">
              Unlock Your Peak Performance
            </h3>

            <p className="text-white/80 mt-2">
              Get exclusive sports drops, training gear & athlete offers.
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