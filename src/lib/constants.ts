import type { NavItem } from "@/types";

export const SITE_NAME = "ShopEverse";
export const SITE_TAGLINE = "Premium Shopping, Redefined";

export const NAV_LINKS: NavItem[] = [
  {
    label: "Fashion",
    href: "/fashion",
    children: [
      { label: "Men's Clothing", href: "/fashion/men" },
      { label: "Women's Clothing", href: "/fashion/women" },
      { label: "Kids' Wear", href: "/fashion/kids" },
      { label: "Footwear", href: "/fashion/footwear" },
      { label: "Watches", href: "/fashion/watches" },
      { label: "Bags & Wallets", href: "/fashion/bags" },
    ],
  },
  {
    label: "Electronics",
    href: "/electronics",
    children: [
      { label: "Laptops", href: "/electronics/laptops" },
      { label: "Headphones", href: "/electronics/headphones" },
      { label: "Cameras", href: "/electronics/cameras" },
      { label: "Speakers", href: "/electronics/speakers" },
      { label: "Wearables", href: "/electronics/wearables" },
      { label: "Accessories", href: "/electronics/accessories" },
    ],
  },
  {
    label: "Mobiles",
    href: "/mobiles",
    children: [
      { label: "Smartphones", href: "/mobiles/smartphones" },
      { label: "Tablets", href: "/mobiles/tablets" },
      { label: "Cases & Covers", href: "/mobiles/cases" },
      { label: "Chargers", href: "/mobiles/chargers" },
      { label: "Screen Guards", href: "/mobiles/screen-guards" },
    ],
  },
  {
    label: "Home & Living",
    href: "/home",
    children: [
      { label: "Furniture", href: "/home/furniture" },
      { label: "Decor", href: "/home/decor" },
      { label: "Kitchen", href: "/home/kitchen" },
      { label: "Bedding", href: "/home/bedding" },
      { label: "Lighting", href: "/home/lighting" },
    ],
  },
  {
    label: "Beauty",
    href: "/beauty",
    children: [
      { label: "Skincare", href: "/beauty/skincare" },
      { label: "Haircare", href: "/beauty/haircare" },
      { label: "Makeup", href: "/beauty/makeup" },
      { label: "Fragrances", href: "/beauty/fragrances" },
      { label: "Grooming", href: "/beauty/grooming" },
    ],
  },
  {
    label: "Appliances",
    href: "/appliances",
    children: [
      { label: "Air Conditioners", href: "/appliances/ac" },
      { label: "Refrigerators", href: "/appliances/refrigerators" },
      { label: "Washing Machines", href: "/appliances/washing-machines" },
      { label: "Microwaves", href: "/appliances/microwaves" },
      { label: "Air Purifiers", href: "/appliances/air-purifiers" },
    ],
  },
];

export const FOOTER_LINKS = {
  "Get to Know Us": [
    { label: "About ShopEverse", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press Releases", href: "/press" },
    { label: "ShopEverse Science", href: "/science" },
  ],
  "Connect with Us": [
    { label: "Facebook", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  "Make Money with Us": [
    { label: "Sell on ShopEverse", href: "/sell" },
    { label: "Sell under Private Brands", href: "/private-brands" },
    { label: "Become an Affiliate", href: "/affiliate" },
    { label: "Advertise Your Products", href: "/advertise" },
  ],
  "Let Us Help You": [
    { label: "Your Account", href: "/account" },
    { label: "Returns Centre", href: "/returns" },
    { label: "Recalls & Safety", href: "/recalls" },
    { label: "Delivery & Orders", href: "/orders" },
    { label: "Help", href: "/help" },
  ],
};

export const MEGA_MENU_CATEGORIES = [
  {
    title: "Fashion",
    items: [
      "Men's Clothing",
      "Women's Clothing",
      "Kids' Wear",
      "Footwear",
      "Watches & Accessories",
      "Bags & Wallets",
      "Sunglasses",
      "Jewellery",
    ],
  },
  {
    title: "Electronics",
    items: [
      "Laptops & Computers",
      "Headphones & Earbuds",
      "Cameras & Photography",
      "Smart Home",
      "Wearable Tech",
      "TV & Audio",
      "Gaming",
      "Networking",
    ],
  },
  {
    title: "Mobiles",
    items: [
      "All Smartphones",
      "Premium Phones",
      "Budget Phones",
      "Tablets",
      "Cases & Covers",
      "Power Banks",
      "Chargers & Cables",
    ],
  },
  {
    title: "Home & Living",
    items: [
      "Furniture",
      "Home Décor",
      "Kitchen & Dining",
      "Bedding & Linen",
      "Lighting",
      "Storage & Organisation",
      "Garden & Outdoors",
    ],
  },
];
