import { allProducts } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Zap, TrendingDown, Star, ChevronRight, BadgePercent, Sparkles, Flame, MoveRight } from "lucide-react";
import LiveCountdown from "@/components/shared/LiveCountdown";
import Link from "next/link";
import { motion } from "framer-motion";
import { calculateDiscount, formatPrice, cn } from "@/lib/utils";

export const metadata = {
  title: "Flash Deals | Exclusive Limited Offers | ShopEverse",
  description: "High-density flash sales on premium electronics, fashion, and lifestyle. Authentic products, guaranteed savings.",
};

export default function DealsPage() {
  const dealProducts = allProducts.filter(p => p.originalPrice > p.price);

  // Top 4 "Hottest" Deals
  const topDeals = dealProducts
    .sort((a, b) => calculateDiscount(b.originalPrice, b.price) - calculateDiscount(a.originalPrice, a.price))
    .slice(0, 4);

  const INITIAL_SECONDS = 12 * 3600 + 45 * 60 + 30;

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col">
      <Navbar />

      {/* ━━━ 1. DRAMATIC HERO ━━━ */}
      <section className="bg-white border-b border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#111111] skew-x-[-12deg] translate-x-24 hidden lg:block" />
        
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Energy Text */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-[#DC2626] text-white text-[11px] font-black px-4 py-2 rounded-xl shadow-xl shadow-red-500/20 uppercase tracking-widest">
                  <Zap className="w-4 h-4 fill-white" />
                  Flash Sale Live
                </div>
                <div className="flex items-center gap-2 bg-[#F8F8F8] text-[#111111] text-[11px] font-black px-4 py-2 rounded-xl border border-gray-100 uppercase tracking-widest">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Limited Slots
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-[#111111] leading-[1.05] tracking-tighter mb-8">
                Extreme <span className="text-[#DC2626]">Savings.</span><br />
                Premium <span className="text-[#777777]">Goods.</span>
              </h1>
              <p className="text-lg text-[#555555] font-medium max-w-lg mb-12 leading-relaxed">
                Experience world-class retail engineering. Authentic brands, express shipping, and unmatchable limited-time pricing.
              </p>
              
              <div className="flex items-center gap-10">
                <div className="space-y-1">
                   <p className="text-[11px] font-black text-[#AAAAAA] uppercase tracking-widest">Average Saving</p>
                   <p className="text-3xl font-black text-[#111111]">42% OFF</p>
                </div>
                <div className="w-px h-12 bg-gray-100" />
                <div className="space-y-1">
                   <p className="text-[11px] font-black text-[#AAAAAA] uppercase tracking-widest">Global Shipping</p>
                   <p className="text-3xl font-black text-[#111111]">Express</p>
                </div>
              </div>
            </div>

            {/* Countdown Authority */}
            <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-premium border border-gray-100 text-center relative group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl">
                 Closing In
              </div>
              <LiveCountdown initialSeconds={INITIAL_SECONDS} />
              <button className="mt-12 w-full btn-premium btn-primary shadow-2xl shadow-black/20">
                 Claim Your Deal Now <MoveRight className="w-5 h-5 ml-2" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ 2. TRENDING DEALS (High Density) ━━━ */}
      <div className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-[#DC2626] flex items-center justify-center shadow-lg shadow-red-500/20">
                <Flame className="w-6 h-6 text-white" />
             </div>
             <div>
                <h2 className="text-3xl font-black text-[#111111] tracking-tight">Hottest Opportunities</h2>
                <p className="text-[13px] text-[#555555] font-medium">Selling fast. Verified inventory only.</p>
             </div>
          </div>
          <Link href="/shop" className="text-xs font-black text-[#1D4ED8] uppercase tracking-widest hover:underline underline-offset-8">View Inventory</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topDeals.map((product, i) => {
            const disc = calculateDiscount(product.originalPrice, product.price);
            const soldPercent = 45 + (i * 12);
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white p-6 rounded-[32px] border border-gray-100 shadow-soft hover:shadow-premium hover:border-gray-200 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#F8F8F8] mb-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-[#DC2626] text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-xl shadow-red-500/20">
                    SAVE {disc}%
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#111111] line-clamp-2 leading-tight min-h-[56px] group-hover:text-[#DC2626] transition-colors">{product.name}</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-[#111111]">{formatPrice(product.price)}</span>
                    <span className="text-sm text-[#777777] line-through font-bold">{formatPrice(product.originalPrice)}</span>
                  </div>
                  
                  {/* Scarcity Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-[#DC2626]">{soldPercent}% SOLD OUT</span>
                       <span className="text-[#777777]">{100 - soldPercent} LEFT</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${soldPercent}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] rounded-full shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ━━━ 3. ALL SALE PRODUCTS ━━━ */}
      <div className="bg-white border-t border-gray-100 py-20">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <TrendingDown className="w-8 h-8 text-[#111111]" />
            <h2 className="text-3xl font-black text-[#111111] tracking-tight">Global Clearance Inventory</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {dealProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group flex flex-col space-y-4"
              >
                <div className="relative aspect-square bg-[#F8F8F8] rounded-[24px] border border-gray-100 overflow-hidden group-hover:shadow-xl transition-all">
                  <Image src={product.image} alt={product.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-3 left-3 bg-[#111111] text-white text-[9px] font-black px-2 py-1 rounded shadow-lg">
                    {calculateDiscount(product.originalPrice, product.price)}% OFF
                  </div>
                </div>
                <div className="px-2">
                  <h4 className="text-[13px] font-bold text-[#111111] line-clamp-1 group-hover:text-[#DC2626] transition-colors">{product.name}</h4>
                  <p className="text-base font-black text-[#111111] mt-1">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
