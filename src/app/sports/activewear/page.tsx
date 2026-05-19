"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  ChevronRight,
  Grid3X3,
  List,
  Star,
  Heart,
  Flame,
  ShieldCheck,
  Truck,
  RotateCcw,
  Filter,
  X,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { toast } from "sonner";

/* ───────────────── PRODUCT TYPE ───────────────── */

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  reviews: number;
  image: string;
  slug: string;
  category: string;
  inStock: boolean;
  description: string;
  badge?: string;
  features?: string[];
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
  specs?: Record<string, string>;
};

/* ───────────────── PRODUCTS ───────────────── */

// USE THIS PRODUCTS ARRAY
// These are now PROPER ecommerce-style product photos
// matching the exact product types

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Nike Dri-FIT Training T-Shirt",
    brand: "Nike",
    price: 1499,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 1243,
    reviews: 1243,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
    slug: "nike-dri-fit-training-tshirt",
    category: "Sports",
    inStock: true,
    description: "Premium Nike training t-shirt with moisture-wicking technology for intense workouts.",
    badge: "Best Seller",
    features: [
      "Dri-FIT moisture-wicking fabric",
      "Lightweight and breathable",
      "4-way stretch for freedom of movement",
      "Flatlock seams to reduce chafing"
    ],
    variants: {
      colors: ["Black", "White", "Blue", "Red", "Gray"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "2",
    name: "Adidas Performance Shorts",
    brand: "Adidas",
    price: 1299,
    originalPrice: 2499,
    rating: 4.6,
    reviewCount: 892,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1200&auto=format&fit=crop",
    slug: "adidas-performance-shorts",
    category: "Sports",
    inStock: true,
    description: "Lightweight Adidas shorts designed for maximum comfort during sports activities.",
    badge: "Trending",
    features: [
      "Climalite moisture-wicking fabric",
      "Ergonomic fit for natural movement",
      "Built-in brief for added support",
      "Zippered back pocket for secure storage"
    ],
    variants: {
      colors: ["Black", "Navy", "Gray", "Red"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "3",
    name: "Under Armour Compression Tee",
    brand: "Under Armour",
    price: 1999,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 1560,
    reviews: 1560,
    image:
      "https://images.unsplash.com/photo-1618354691551-44de113f0164?q=80&w=1200&auto=format&fit=crop",
    slug: "under-armour-compression-tee",
    category: "Sports",
    inStock: true,
    description: "Under Armour compression tee for enhanced muscle support and recovery.",
    badge: "Top Rated",
    features: [
      "Compression fabric for muscle support",
      "Moisture Transport System",
      "4-way stretch construction",
      "Anti-odor technology"
    ],
    variants: {
      colors: ["Black", "Blue", "Purple", "Gray"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "4",
    name: "Puma Running Activewear Set",
    brand: "Puma",
    price: 2499,
    originalPrice: 4999,
    rating: 4.7,
    reviewCount: 711,
    reviews: 711,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    slug: "puma-running-activewear-set",
    category: "Sports",
    inStock: true,
    description: "Complete Puma running set including top and bottoms for optimal performance.",
    badge: "New Arrival",
    features: [
      "DryCell moisture-wicking technology",
      "Lightweight and flexible fabric",
      "Reflective details for visibility",
      "Ergonomic seam placement"
    ],
    variants: {
      colors: ["Black", "Blue", "Red", "Green"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "5",
    name: "Reebok Gym Training Tank",
    brand: "Reebok",
    price: 999,
    originalPrice: 1999,
    rating: 4.5,
    reviewCount: 623,
    reviews: 623,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop",
    slug: "reebok-gym-training-tank",
    category: "Sports",
    inStock: true,
    description: "Breathable Reebok tank top designed for gym sessions and weight training.",
    badge: "Value Pick",
    features: [
      "Speedwick moisture-wicking fabric",
      "Loose fit for unrestricted movement",
      "Racerback design for shoulder mobility",
      "Mesh panels for ventilation"
    ],
    variants: {
      colors: ["Black", "Gray", "Blue", "Purple"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "6",
    name: "Asics Performance Joggers",
    brand: "Asics",
    price: 2299,
    originalPrice: 4299,
    rating: 4.8,
    reviewCount: 834,
    reviews: 834,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    slug: "asics-performance-joggers",
    category: "Sports",
    inStock: true,
    description: "Asics joggers with moisture-wicking fabric and comfortable fit for all activities.",
    badge: "Premium",
    features: [
      "MotionDry moisture management",
      "Elastic waistband with drawcord",
      "Tapered leg for modern fit",
      "Side pockets for convenience"
    ],
    variants: {
      colors: ["Black", "Gray", "Navy", "Green"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "7",
    name: "Nike Pro Compression Shorts",
    brand: "Nike",
    price: 1799,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 2011,
    reviews: 2011,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1200&auto=format&fit=crop",
    slug: "nike-pro-compression-shorts",
    category: "Sports",
    inStock: true,
    description: "Nike Pro compression shorts for maximum muscle support and reduced fatigue.",
    badge: "Editor's Choice",
    features: [
      "Dri-FIT fabric with compression",
      "Flatlock seams for comfort",
      "Elastic waistband with internal drawcord",
      "Laser-cut ventilation zones"
    ],
    variants: {
      colors: ["Black", "Blue", "Red", "Purple"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "8",
    name: "Adidas ClimaCool Hoodie",
    brand: "Adidas",
    price: 2999,
    originalPrice: 5999,
    rating: 4.7,
    reviewCount: 943,
    reviews: 943,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
    slug: "adidas-climacool-hoodie",
    category: "Sports",
    inStock: true,
    description: "Adidas ClimaCool hoodie with advanced ventilation technology for active wear.",
    badge: "Limited Edition",
    features: [
      "ClimaCool ventilation system",
      "Lightweight cotton-polyester blend",
      "Kangaroo pocket for storage",
      "Ribbed cuffs and hem for secure fit"
    ],
    variants: {
      colors: ["Black", "Gray", "Blue", "Red"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "9",
    name: "Puma DryCell Sports Tee",
    brand: "Puma",
    price: 1399,
    originalPrice: 2699,
    rating: 4.4,
    reviewCount: 420,
    reviews: 420,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    slug: "puma-drycell-sports-tee",
    category: "Sports",
    inStock: true,
    description: "Puma DryCell sports tee with quick-drying technology for intense training.",
    badge: "Hot Deal",
    features: [
      "DryCell moisture-wicking fabric",
      "Soft and comfortable feel",
      "Modern athletic fit",
      "Reflective Puma logo"
    ],
    variants: {
      colors: ["Black", "White", "Blue", "Red"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "10",
    name: "Gymshark Seamless Leggings",
    brand: "Gymshark",
    price: 2499,
    originalPrice: 4499,
    rating: 4.9,
    reviewCount: 3221,
    reviews: 3221,
    image:
      "https://images.unsplash.com/photo-1506629905607-45b4ad0f3f0d?q=80&w=1200&auto=format&fit=crop",
    slug: "gymshark-seamless-leggings",
    category: "Sports",
    inStock: true,
    description: "Gymshark seamless leggings with four-way stretch and squat-proof fabric.",
    badge: "Best Seller",
    features: [
      "Seamless construction for comfort",
      "High-waisted design for support",
      "Squat-proof fabric",
      "Four-way stretch for flexibility"
    ],
    variants: {
      colors: ["Black", "Navy", "Gray", "Purple"],
      sizes: ["XS", "S", "M", "L", "XL"]
    }
  },

  {
    id: "11",
    name: "Nike Running Windbreaker",
    brand: "Nike",
    price: 3999,
    originalPrice: 6999,
    rating: 4.8,
    reviewCount: 1544,
    reviews: 1544,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    slug: "nike-running-windbreaker",
    category: "Sports",
    inStock: true,
    description: "Lightweight Nike windbreaker for running and outdoor activities.",
    badge: "Premium",
    features: [
      "Water-repellent fabric",
      "Lightweight and packable",
      "Adjustable hood for perfect fit",
      "Zippered hand pockets"
    ],
    variants: {
      colors: ["Black", "Blue", "Red", "Gray"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },

  {
    id: "12",
    name: "Under Armour Gym Joggers",
    brand: "Under Armour",
    price: 2799,
    originalPrice: 4999,
    rating: 4.7,
    reviewCount: 1119,
    reviews: 1119,
    image:
      "https://images.unsplash.com/photo-1506629905607-45b4ad0f3f0d?q=80&w=1200&auto=format&fit=crop",
    slug: "under-armour-gym-joggers",
    category: "Sports",
    inStock: true,
    description: "Under Armour gym joggers with moisture-wicking technology and comfortable fit.",
    badge: "New Launch",
    features: [
      "HeatGear moisture-wicking fabric",
      "Elastic waistband with drawcord",
      "Tapered ankle for modern look",
      "Side pockets for convenience"
    ],
    variants: {
      colors: ["Black", "Gray", "Navy", "Blue"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },
];

/* ───────────────── PAGE ───────────────── */

export default function ActivewearPage() {
  const pathname = usePathname();

  const [mobileFilters, setMobileFilters] = useState(false);

  const [sortBy, setSortBy] = useState("featured");

  const dispatch = useDispatch();

  const sortedProducts = useMemo(() => {
    let arr = [...PRODUCTS];

    switch (sortBy) {
      case "price-low":
        return arr.sort((a, b) => a.price - b.price);

      case "price-high":
        return arr.sort((a, b) => b.price - a.price);

      default:
        return arr;
    }
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <Navbar />

      {/* top strip */}
      <div className="bg-[#0F172A] text-white text-center text-xs py-2 font-medium tracking-wide">
        ⚡ ACTIVEWEAR SALE — Up to 50% OFF on performance wear
      </div>

      {/* compact hero */}
      <section className="relative overflow-hidden border-b border-gray-200">

        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
            alt=""
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#07111F]/90 via-[#0F2747]/70 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-14">

          {/* breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-white/70 mb-6">

            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <ChevronRight className="w-4 h-4" />

            <Link href="/sports" className="hover:text-white">
              Sports
            </Link>

            <ChevronRight className="w-4 h-4" />

            <span className="text-white">
              Activewear
            </span>

          </div>

          <div className="max-w-3xl">

            <span className="bg-blue-500/20 border border-blue-300/20 text-blue-100 text-xs font-black tracking-widest px-4 py-2 rounded-full inline-block mb-5">
              SPORTS ACTIVEWEAR
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-none mb-4">
              Premium Activewear
            </h1>

            <p className="text-white/70 text-lg max-w-2xl">
              Sweat-ready performance wear designed for training,
              running, gym sessions, and everyday movement.
            </p>

            {/* chips */}
            <div className="flex flex-wrap gap-3 mt-8">

              {[
                "Running",
                "Gym",
                "Training",
                "Yoga",
                "Compression",
                "Football",
              ].map((chip) => (
                <button
                  key={chip}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                >
                  {chip}
                </button>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* trust strip */}
      <div className="bg-white border-b border-gray-100">

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">

          {[
            {
              icon: Truck,
              title: "Free Delivery",
              sub: "Above ₹999",
            },

            {
              icon: ShieldCheck,
              title: "Performance Tested",
              sub: "Athlete approved",
            },

            {
              icon: RotateCcw,
              title: "Easy Returns",
              sub: "30-day returns",
            },

            {
              icon: Flame,
              title: "Trending Styles",
              sub: "Latest collections",
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

      <div className="w-full px-3 md:px-5 xl:px-6 py-6">

        {/* toolbar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

          <div>
            <h2 className="text-2xl font-black text-gray-900">
              Activewear Collection
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Showing {PRODUCTS.length} products
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* mobile filter */}
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium bg-white outline-none"
            >

              <option value="featured">
                Featured
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

            </select>

            {/* grid buttons */}
            <div className="hidden md:flex items-center border border-gray-200 rounded-xl overflow-hidden">

              <button className="w-11 h-11 flex items-center justify-center bg-gray-100">
                <Grid3X3 className="w-5 h-5" />
              </button>

              <button className="w-11 h-11 flex items-center justify-center">
                <List className="w-5 h-5 text-gray-500" />
              </button>

            </div>

          </div>

        </div>

        <div className="flex gap-4 xl:gap-5">

          {/* sidebar */}
          <aside className="hidden lg:block w-[250px] flex-shrink-0">

            <div className="sticky top-24 bg-white rounded-3xl border border-gray-100 p-5">

              <div className="flex items-center justify-between mb-6">

                <h3 className="text-lg font-black">
                  Filters
                </h3>

                <button className="text-sm text-blue-500 font-semibold">
                  Clear All
                </button>

              </div>

              {/* category */}
              <div className="border-b border-gray-100 pb-5 mb-5">

                <h4 className="font-bold text-sm mb-4">
                  Category
                </h4>

                <div className="space-y-3">

                  {[
                    "T-Shirts",
                    "Track Pants",
                    "Shorts",
                    "Jackets",
                    "Compression",
                    "Gym Wear",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 text-sm cursor-pointer"
                    >

                      <input type="checkbox" />

                      <span>{item}</span>

                    </label>
                  ))}

                </div>

              </div>

              {/* brand */}
              <div className="border-b border-gray-100 pb-5 mb-5">

                <h4 className="font-bold text-sm mb-4">
                  Brands
                </h4>

                <div className="space-y-3">

                  {[
                    "Nike",
                    "Adidas",
                    "Puma",
                    "Under Armour",
                    "Reebok",
                  ].map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-3 text-sm cursor-pointer"
                    >

                      <input type="checkbox" />

                      <span>{brand}</span>

                    </label>
                  ))}

                </div>

              </div>

              {/* sizes */}
              <div>

                <h4 className="font-bold text-sm mb-4">
                  Sizes
                </h4>

                <div className="flex flex-wrap gap-2">

                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="w-11 h-11 rounded-xl border border-gray-200 text-sm font-semibold hover:border-blue-500 hover:text-blue-500 transition"
                    >
                      {size}
                    </button>
                  ))}

                </div>

              </div>

            </div>

          </aside>

          {/* products */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">

  {sortedProducts.map((product, idx) => (

    <Link
      key={product.id}
      href={`/product/${product.slug}`}
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
    >

      {/* image section */}
      <div className="relative bg-[#F8FAFC] overflow-hidden">

        {/* top badges */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">

          {idx % 3 === 0 && (
            <span className="bg-[#2563EB] text-white text-[10px] font-bold px-2 py-1 rounded">
              Bestseller
            </span>
          )}

          {idx % 5 === 0 && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded">
              New
            </span>
          )}

        </div>

        {/* wishlist */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleWishlist(product));
          }}
          className="absolute top-2 right-2 z-20 bg-white rounded-full p-2 shadow-sm hover:scale-110 transition"
        >

          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />

        </button>

        {/* image */}
        <div className="relative aspect-square">

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

        </div>

        {/* quick add */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">

          <button 
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart({
                ...product,
                quantity: 1,
                selectedColor: product.variants?.colors?.[0],
                selectedSize: product.variants?.sizes?.[0]
              }));
              toast.success(`${product.name} added to bag`, {
                icon: <Heart className="w-4 h-4 text-emerald-500" />, 
                className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
              });
            }}
            className="w-full bg-[#111827] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-black transition"
          >
            Add to Cart
          </button>

        </div>

      </div>

      {/* content */}
      <div className="p-3">

        {/* brand */}
        <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-1">
          {product.brand}
        </p>

        {/* title */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug min-h-[40px]">
          {product.name}
        </h3>

        {/* rating */}
        <div className="flex items-center gap-2 mt-2">

          <div className="flex items-center gap-1 bg-green-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">

            <Star className="w-3 h-3 fill-white" />

            {product.rating}

          </div>

          <span className="text-xs text-gray-500">
            ({product.reviews})
          </span>

        </div>

        {/* pricing */}
        <div className="mt-2 flex items-center gap-2 flex-wrap">

          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>

          <span className="text-sm font-semibold text-green-600">

            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            )}
            % off

          </span>

        </div>

        {/* delivery */}
        <div className="mt-2 text-xs text-gray-500">
          Free delivery
        </div>

        {/* offers */}
        <div className="mt-1 text-xs text-green-600 font-medium">
          Bank Offer Available
        </div>

      </div>

    </Link>

  ))}

</div>

        </div>

      </div>

      {/* mobile filters */}
      {mobileFilters && (

        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">

          <div className="absolute left-0 top-0 h-full w-[320px] bg-white overflow-y-auto">

            <div className="flex items-center justify-between p-5 border-b border-gray-100">

              <h3 className="text-lg font-black">
                Filters
              </h3>

              <button onClick={() => setMobileFilters(false)}>
                <X className="w-5 h-5" />
              </button>

            </div>

          </div>

        </div>

      )}

      <Footer />
    </div>
  );
}