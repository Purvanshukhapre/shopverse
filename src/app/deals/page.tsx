import { allProducts } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopClient from "@/components/sections/ShopClient";
import Image from "next/image";
import { Zap, TrendingDown, Star, ChevronRight, BadgePercent } from "lucide-react";
import LiveCountdown from "@/components/shared/LiveCountdown";
import Link from "next/link";
import { calculateDiscount } from "@/lib/utils";

export const metadata = {
  title: "Today's Deals & Flash Sales | ShopEverse",
  description: "Discover incredible savings on premium products. Limited time flash sales and exclusive offers.",
};

export default function DealsPage() {
  const dealProducts = allProducts.filter(p => p.originalPrice > p.price);

  // Calculate best deals for the hero grid
  const topDeals = dealProducts
    .sort((a, b) => calculateDiscount(b.originalPrice, b.price) - calculateDiscount(a.originalPrice, a.price))
    .slice(0, 4);

  const INITIAL_SECONDS = 12 * 3600 + 45 * 60 + 30;

  return (
    <div className="bg-[#F4F4F5] min-h-screen flex flex-col">
      <Navbar />

      {/* ━━━ DEALS HERO ━━━ */}
      <section className="bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 pb-10">

          {/* Flash Sale Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full">
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  Flash Sale
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-red-400">LIVE NOW</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Unmissable
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"> Deals.</span>
              </h1>
              <p className="text-sm text-gray-400 mt-2 max-w-md">
                Up to 60% off on premium electronics, fashion, and lifestyle essentials. Don't miss out!
              </p>
            </div>

            {/* Live Countdown */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex-shrink-0">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Sale Ends In</p>
              <LiveCountdown initialSeconds={INITIAL_SECONDS} />
            </div>
          </div>

          {/* Deal Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-8">
            {[
              { label: "All Deals",    active: true  },
              { label: "Electronics",  active: false },
              { label: "Fashion",      active: false },
              { label: "Home & Living",active: false },
              { label: "Beauty",       active: false },
              { label: "Sports",       active: false },
            ].map(tab => (
              <button
                key={tab.label}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  tab.active
                    ? "bg-white text-gray-900"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Top 4 Deals Hero Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topDeals.map((product, i) => {
              const disc = calculateDiscount(product.originalPrice, product.price);
              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="relative aspect-square bg-white/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1">
                      <BadgePercent className="w-3 h-3" />
                      {disc}% OFF
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-300 line-clamp-2 leading-snug mb-1.5">{product.name}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-white">₹{product.price.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-2.5 h-2.5 ${j < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-600"}`} />
                        ))}
                      </div>
                      <span className="text-[9px] text-gray-500">({product.reviewCount})</span>
                    </div>
                    {/* Sold bar */}
                    <div className="mt-2.5">
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                          style={{ width: `${40 + i * 12}%` }}
                        />
                      </div>
                      <p className="text-[9px] text-gray-500 mt-1 font-medium">{40 + i * 12}% sold</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ ALL DEAL PRODUCTS ━━━ */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <div>
                <h2 className="text-base font-black text-gray-900">All Deals</h2>
                <p className="text-xs text-gray-500">{dealProducts.length} products on sale</p>
              </div>
            </div>
            <Link href="/shop" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {dealProducts.map((product, i) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="relative aspect-square bg-gray-50">
                  <Image src={product.image} alt={product.name} fill className="object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                    {calculateDiscount(product.originalPrice, product.price)}% OFF
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug mb-1.5 min-h-[32px]">{product.name}</p>
                  <p className="text-base font-black text-gray-900">₹{product.price.toLocaleString("en-IN")}</p>
                  <p className="text-[10px] text-gray-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</p>
                  <p className="text-[10px] font-bold text-emerald-600 mt-1">Free delivery</p>
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
