import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&q=80",
    itemCount: 24500,
    description: "Trending styles for every occasion",
    subcategories: [
      { name: "Men's Clothing", slug: "mens-clothing" },
      { name: "Women's Clothing", slug: "womens-clothing" },
      { name: "Sneakers", slug: "sneakers" },
      { name: "Accessories", slug: "fashion-accessories" },
      { name: "Luxury Wear", slug: "luxury-wear" }
    ]
  },
  {
    id: "cat-2",
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=500&fit=crop&q=80",
    itemCount: 18200,
    description: "Latest gadgets & accessories",
    subcategories: [
      { name: "Smartphones", slug: "smartphones" },
      { name: "Laptops & PCs", slug: "laptops" },
      { name: "Audio & Headphones", slug: "audio" },
      { name: "Cameras", slug: "cameras" },
      { name: "Smart Home", slug: "smart-home" }
    ]
  },
  {
    id: "cat-3",
    name: "Home & Furniture",
    slug: "furniture",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=500&fit=crop&q=80",
    itemCount: 9800,
    description: "Modern living spaces",
    subcategories: [
      { name: "Living Room", slug: "living-room" },
      { name: "Bedroom", slug: "bedroom" },
      { name: "Workspace", slug: "workspace" },
      { name: "Decor", slug: "decor" },
      { name: "Lighting", slug: "lighting" }
    ]
  },
  {
    id: "cat-4",
    name: "Beauty & Personal Care",
    slug: "beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop&q=80",
    itemCount: 15600,
    description: "Skincare, makeup & more",
    subcategories: [
      { name: "Skincare", slug: "skincare" },
      { name: "Makeup", slug: "makeup" },
      { name: "Haircare", slug: "haircare" },
      { name: "Fragrances", slug: "fragrances" }
    ]
  },
  {
    id: "cat-5",
    name: "Sports & Outdoors",
    slug: "sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=500&fit=crop&q=80",
    itemCount: 11200,
    description: "Gear up for performance",
    subcategories: [
      { name: "Activewear", slug: "activewear" },
      { name: "Fitness Equipment", slug: "fitness-equipment" },
      { name: "Outdoor Gear", slug: "outdoor-gear" },
      { name: "Footwear", slug: "sports-footwear" }
    ]
  }
];
