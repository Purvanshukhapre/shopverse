import type { Product } from "@/types";

export const allProducts: Product[] = [
  {
    id: "fs-1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh1000xm5",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=500&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=1000&fit=crop&q=80"
    ],
    price: 22990,
    originalPrice: 34990,
    rating: 4.7,
    reviewCount: 12840,
    category: "Electronics",
    badge: "Lightning Deal",
    inStock: true,
    description: "The WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.",
    features: [
      "Industry-leading noise cancellation",
      "Magnificent Sound, engineered to perfection",
      "Crystal clear hands-free calling",
      "Up to 30-hour battery life",
      "Ultra-comfortable, lightweight design"
    ],
    specs: {
      "Battery Life": "30 Hours",
      "Charging Time": "3.5 Hours",
      "Bluetooth": "v5.2",
      "Weight": "250g"
    }
  },
  {
    id: "fs-2",
    name: "Apple Watch Series 9 GPS 41mm",
    slug: "apple-watch-series9",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=500&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=1000&fit=crop&q=80"
    ],
    price: 34900,
    originalPrice: 44900,
    rating: 4.6,
    reviewCount: 8920,
    category: "Electronics",
    badge: "Deal of the Day",
    inStock: true,
    description: "Apple Watch Series 9 is more capable, intuitive, and faster. The new S9 SiP powers a superbright display and a magical new way to quickly and easily interact with your Apple Watch.",
    features: [
      "S9 SiP for more power",
      "Double tap gesture support",
      "Advanced health sensors",
      "Crash Detection and Fall Detection",
      "Carbon neutral options available"
    ],
    specs: {
      "Display": "Always-On Retina",
      "Water Resistance": "50m",
      "Battery": "Up to 18 hours",
      "Chip": "S9 SiP"
    }
  },
  {
    id: "fs-3",
    name: "Nike Air Max 270 React Running Shoes",
    slug: "nike-airmax-270",
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=500&fit=crop&q=80",
    price: 8995,
    originalPrice: 14995,
    rating: 4.4,
    reviewCount: 6340,
    category: "Fashion",
    badge: "40% Off",
    inStock: true,
    description: "Nike's first lifestyle Air Max meets the softest, smoothest and most resilient foam yet. The design draws inspiration from the Air Max pantheon, showcasing Nike's greatest innovation.",
    features: [
      "Max Air 270 unit delivers comfort",
      "Nike React technology provides a smooth ride",
      "Woven and synthetic fabric on the upper",
      "Heel-to-toe rubber for traction and durability"
    ],
    variants: {
      colors: ["Black", "White", "Blue", "Red"],
      sizes: ["7", "8", "9", "10", "11"]
    }
  },
  {
    id: "fs-4",
    name: "Samsung Galaxy S24 Ultra 256GB",
    slug: "samsung-s24-ultra",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=500&fit=crop&q=80",
    price: 109999,
    originalPrice: 134999,
    rating: 4.5,
    reviewCount: 15670,
    category: "Electronics",
    badge: "Best Seller",
    inStock: true,
    description: "The Galaxy S24 Ultra is the ultimate form of Galaxy Ultra. With its new titanium exterior and 6.8-inch flat display, it's an absolute marvel of design.",
    features: [
      "Titanium frame durability",
      "Built-in S Pen",
      "200MP Main Camera",
      "Snapdragon 8 Gen 3 for Galaxy"
    ],
    specs: {
      "Display": "6.8\" QHD+ Dynamic AMOLED",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB"
    }
  },
  {
    id: "fs-5",
    name: "Premium Coffee Machine Espresso",
    slug: "coffee-machine-espresso",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=500&fit=crop&q=80",
    price: 52900,
    originalPrice: 62900,
    rating: 4.8,
    reviewCount: 4520,
    category: "Home",
    badge: "Premium Pick",
    inStock: true,
    description: "Barista-quality performance with a new intuitive interface that provides all the information you need to create third wave specialty coffee at home.",
    features: [
      "Integrated conical burr grinder",
      "ThermoJet heating system",
      "Powerful steam wand",
      "Digital temperature control"
    ]
  },
  {
    id: "fs-6",
    name: "Ray-Ban Aviator Classic Polarized",
    slug: "rayban-aviator",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop&q=80",
    price: 7490,
    originalPrice: 12990,
    rating: 4.5,
    reviewCount: 9870,
    category: "Fashion",
    badge: "42% Off",
    inStock: true,
    description: "One of the most iconic sunglass models in the world. Ray-Ban Aviator Classic sunglasses were originally designed for U.S. aviators in 1937.",
    features: [
      "High quality polarized lenses",
      "Classic metal frame",
      "Maximum clarity and protection"
    ]
  },
  {
    id: "fs-7",
    name: "JBL Charge 5 Portable Bluetooth Speaker",
    slug: "jbl-charge-5",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=500&fit=crop&q=80",
    price: 13999,
    originalPrice: 18999,
    rating: 4.6,
    reviewCount: 7640,
    category: "Electronics",
    badge: "Top Rated",
    inStock: true,
    description: "Take the party with you no matter what the weather. The JBL Charge 5 speaker delivers bold JBL Original Pro Sound, with its optimized long excursion driver."
  },
  {
    id: "fs-8",
    name: "Levi's 511 Slim Fit Stretch Jeans",
    slug: "levis-511-slim",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&q=80",
    price: 2499,
    originalPrice: 4999,
    rating: 4.3,
    reviewCount: 11250,
    category: "Fashion",
    badge: "50% Off",
    inStock: true,
    description: "The definitive slim jeans. A lean look designed to fit like it's been tailored just for you. Levi's 511 Slim jeans are a modern slim with room to move."
  },
  {
    id: "tp-1",
    name: "MacBook Air M3 15-inch 256GB",
    slug: "macbook-air-m3",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=500&fit=crop&q=80",
    price: 134900,
    originalPrice: 149900,
    rating: 4.8,
    reviewCount: 6780,
    category: "Electronics",
    badge: "New Launch",
    inStock: true,
    description: "Supercharged by the M3 chip, MacBook Air is the world's most popular laptop. With up to 18 hours of battery life and a striking Liquid Retina display."
  },
  {
    id: "tp-2",
    name: "Adidas Ultraboost Light Running",
    slug: "adidas-ultraboost-light",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=500&fit=crop&q=80",
    price: 11999,
    originalPrice: 16999,
    rating: 4.5,
    reviewCount: 4230,
    category: "Fashion",
    inStock: true,
    description: "Experience epic energy with the new Ultraboost Light, the lightest Ultraboost ever. The magic lies in the Light BOOST midsole."
  },
  {
    id: "tp-3",
    name: "iPad Pro M4 11-inch 256GB Wi-Fi",
    slug: "ipad-pro-m4",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=500&fit=crop&q=80",
    price: 99900,
    originalPrice: 109900,
    rating: 4.7,
    reviewCount: 3450,
    category: "Electronics",
    badge: "Trending",
    inStock: true,
    description: "The thinnest Apple product ever. iPad Pro features an incredibly thin and light design, bringing portability to a whole new level."
  },
  {
    id: "tp-4",
    name: "Minimalist Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop&q=80",
    price: 3499,
    originalPrice: 5999,
    rating: 4.4,
    reviewCount: 2870,
    category: "Fashion",
    inStock: true,
    description: "A clean, minimalist crossbody bag crafted from premium Italian leather. Perfect for your daily essentials."
  },
  {
    id: "tp-5",
    name: "Premium Skincare Face Serum",
    slug: "skincare-face-serum",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop&q=80",
    price: 3299,
    originalPrice: 4999,
    rating: 4.3,
    reviewCount: 8920,
    category: "Beauty",
    inStock: true,
    description: "Transform your skin with our powerful anti-aging serum. Formulated with hyaluronic acid and Vitamin C."
  },
  {
    id: "tp-6",
    name: "Canon EOS R50 Mirrorless Camera",
    slug: "canon-eos-r50",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop&q=80",
    price: 65990,
    originalPrice: 75990,
    rating: 4.6,
    reviewCount: 1890,
    category: "Electronics",
    badge: "Editor's Choice",
    inStock: true,
    description: "Create your best content with the Canon EOS R50. From sharp stills to 4K video, this mirrorless camera does it all."
  },
  {
    id: "tp-7",
    name: "Casio G-Shock GA-2100 CasiOak",
    slug: "casio-gshock-ga2100",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80",
    price: 9995,
    originalPrice: 12995,
    rating: 4.7,
    reviewCount: 5670,
    category: "Fashion",
    inStock: true,
    description: "The slim, octagonal GA-2100 series. A design that inherits the DNA of the original G-SHOCK."
  },
  {
    id: "tp-8",
    name: "Herman Miller Aeron Ergonomic Chair",
    slug: "herman-miller-aeron",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=500&fit=crop&q=80",
    price: 89990,
    originalPrice: 109990,
    rating: 4.9,
    reviewCount: 2340,
    category: "Home",
    badge: "Premium",
    inStock: true,
    description: "The gold standard in office seating. Aeron's iconic design and ergonomic support have made it a favorite."
  },
  {
    id: "rc-1",
    name: "AirPods Pro 2nd Gen USB-C",
    slug: "airpods-pro-2",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=500&fit=crop&q=80",
    price: 20900,
    originalPrice: 24900,
    rating: 4.7,
    reviewCount: 18920,
    category: "Electronics",
    badge: "Most Wished",
    inStock: true,
    description: "AirPods Pro feature up to 2x more Active Noise Cancellation, plus Adaptive Transparency and Personalized Spatial Audio."
  }
];

export const flashSaleProducts = allProducts.filter(p => p.id.startsWith("fs-"));
export const trendingProducts = allProducts.filter(p => p.id.startsWith("tp-"));
export const recommendedProducts = allProducts.filter(p => p.id.startsWith("rc-"));
