"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Zap, CheckCircle, Truck, Shield, RotateCcw, Share2, Heart, ChevronDown, Filter, Users, Package, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/product/SkeletonCard";
import { toast } from "sonner";
import type { Product, CartItem } from "@/types";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { notFound } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariant, setSelectedVariant] = useState<string>("v1");
  const [reviewSort, setReviewSort] = useState("most-recent");
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const handleAddToCart = useCallback(() => {
    if (!product) return;
    
    // Create cart item with current product data
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      selectedColor: selectedVariant || undefined,
      selectedSize: undefined, // No size selection logic implemented yet
    };
    
    // Dispatch addToCart action
    dispatch(addToCart(cartItem));
    
    // Show success toast
    toast.success(`${product.name} added to bag`, {
      icon: <ShoppingCart className="w-4 h-4 text-emerald-500" />, 
      className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
    });
  }, [dispatch, product, selectedVariant]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const paramsObj = await params;
        const { slug } = paramsObj;
        const foundProduct = allProducts.find((p) => p.slug === slug);
        
        if (!foundProduct) {
          notFound();
        }
        
        // Add missing fields with sensible defaults for type safety
        const productWithDefaults = {
          ...foundProduct,
          deliveryEstimate: 'Delivers in 2-3 days',
          discount: foundProduct.originalPrice > foundProduct.price ? Math.round(((foundProduct.originalPrice - foundProduct.price) / foundProduct.originalPrice) * 100) : 0,
          offers: [
            { title: 'No Cost EMI', description: 'Starting at ₹' + Math.round(foundProduct.price / 100 / 12).toLocaleString() + '/month' },
            { title: 'Free Delivery', description: 'On orders above ₹499' }
          ],
          seller: {
            name: 'Official Store',
            rating: 4.7,
            reviewCount: 1247,
            badges: ['Top Seller']
          },
          // Populate Frequently Bought Together with related products
          frequentlyBoughtWith: (() => {
            // Define relationships based on product type
            const relationships: Record<string, string[]> = {
              'Electronics': ['Accessories', 'Chargers', 'Cases', 'Cables'],
              'Fashion': ['Accessories', 'Socks', 'Care Products'],
              'Home': ['Accessories', 'Care Products', 'Related Items'],
              'Beauty': ['Accessories', 'Care Products', 'Related Items']
            };
            
            // Get related products based on category and relationships
            return allProducts
              .filter(p => 
                p.category === foundProduct.category && 
                p.id !== foundProduct.id &&
                // Prefer products with similar price range (within 50%)
                Math.abs(p.price - foundProduct.price) / foundProduct.price < 0.5
              )
              .slice(0, 3);
          })(),
          // Populate Customers Also Viewed with trending products
          customersAlsoViewed: allProducts
            .filter(p => p.id.startsWith('tp-'))
            .slice(0, 4),
        };
        
        setProduct(productWithDefaults);
        setSelectedVariant(productWithDefaults.variants?.colors?.length ? productWithDefaults.variants.colors[0] : "v1");
      } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [params]);
  
  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[#F8F8F8]">
        <Navbar />
        <div className="container-premium py-16 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626] mx-auto mb-4"></div>
            <p className="text-lg text-[#555555]">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Add missing fields with sensible defaults for type safety
  const productWithDefaults = product as Product & {
    deliveryEstimate: string;
    discount: number;
    seller: {
      name: string;
      rating: number;
      reviewCount: number;
      badges: string[];
    };
    offers: { title: string; description: string; }[];
    frequentlyBoughtWith: Product[];
    customersAlsoViewed: Product[];
    variants?: {
      colors?: string[];
      sizes?: string[];
    };
  };

  const handleBuyNow = () => {
    // Add product to cart first
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      selectedColor: selectedVariant || undefined,
      selectedSize: undefined,
    };
    
    dispatch(addToCart(cartItem));
    
    // Navigate to checkout page
    window.location.href = '/checkout';
    
    // Show success toast
    toast.success(`Proceeding to checkout for ${product.name}`, {
      icon: <Zap className="w-4 h-4 text-amber-500" />, 
      className: "rounded-[20px] border-amber-100 bg-amber-50 text-amber-900 font-bold"
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist`, {
      icon: <Heart className={`w-4 h-4 ${isWishlisted ? 'text-gray-500' : 'text-red-500'}`} />, 
      className: `rounded-[20px] border-${isWishlisted ? 'gray' : 'red'}-100 bg-${isWishlisted ? 'gray' : 'red'}-50 text-${isWishlisted ? 'gray' : 'red'}-900 font-bold`
    });
  };

  const selectedVariantData = productWithDefaults.variants?.colors?.[0] || 'Default';

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container-premium py-6">
        <nav className="flex items-center text-sm text-[#666]">
          <Link href="/" className="hover:text-[#DC2626] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${product.category.toLowerCase() === 'home' ? 'home' : product.category.toLowerCase() === 'beauty' ? 'beauty' : product.category.toLowerCase() === 'fashion' ? 'fashion' : product.category.toLowerCase() === 'electronics' ? 'electronics' : 'fashion'}`} className="hover:text-[#DC2626] transition-colors">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#111111] font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="container-premium flex flex-col lg:flex-row gap-8 pb-16">
        {/* Product Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="relative group">
            <Image
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto aspect-square object-contain bg-[#F8F8F8] rounded-xl transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
          </div>

          <div className="grid grid-cols-4 gap-3 mt-4">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === idx ? 'border-[#DC2626]' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info & Purchase */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-24">
            <h1 className="text-2xl md:text-3xl font-bold text-[#111111] leading-tight mb-2">
              {product.name}
            </h1>

            {/* Seller Info */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-white border border-gray-100 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#DC2626]" />
              </div>
              <div>
                <div className="font-medium">{productWithDefaults.seller.name}</div>
                <div className="flex items-center gap-2 text-xs text-[#AAAAAA]">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-current" />
                    <span>{productWithDefaults.seller.rating}</span>
                    <span>({productWithDefaults.seller.reviewCount})</span>
                  </div>
                  {productWithDefaults.seller.badges.map((badge, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#111111]/5 text-[#111111] text-xs rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#AAAAAA]">({product.reviewCount})</span>
              </div>
              <span className="text-[#AAAAAA] mx-2">•</span>
              <span className="text-[#111111]">{product.category}</span>
            </div>

            {/* Availability & Variants */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                {productWithDefaults.inStock ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#15803D]/10 text-[#15803D] text-xs font-bold rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 text-xs font-bold rounded-full">
                    Out of Stock
                  </span>
                )}
                <span className="text-[#AAAAAA] ml-2">{productWithDefaults.deliveryEstimate}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#111111] mr-2">Color:</span>
                <div className="flex gap-2">
                  {productWithDefaults.variants?.colors?.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors ${selectedVariant === color ? 'border-[#DC2626]' : 'border-gray-200'}`}
                    >
                      <div className={`w-full h-full rounded-full ${color === 'Black' ? 'bg-gray-900' : color === 'White' ? 'bg-white border border-gray-200' : 'bg-blue-900'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-[#111111]">
                  ₹{Math.round(product.price / 100).toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-[#AAAAAA] line-through">
                    ₹{Math.round(product.originalPrice / 100).toLocaleString()}
                  </span>
                )}
              </div>
              {productWithDefaults.discount > 0 && (
                <span className="inline-block px-3 py-1 bg-[#DC2626] text-white text-xs font-black rounded-full mb-4">
                  {productWithDefaults.discount}% OFF
                </span>
              )}
            </div>

            {/* Offers */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Special Offers</h3>
              <div className="space-y-3">
                {productWithDefaults.offers?.map((offer, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg">
                    <Zap className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{offer.title}</div>
                      <div className="text-sm text-[#777777]">{offer.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warranty & EMI */}
            <div className="mb-6 p-4 bg-[#F8F8F8] border border-gray-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-[#111111]" />
                <span className="font-bold">2-Year Warranty</span>
              </div>
              <p className="text-sm text-[#555555]">
                Comprehensive coverage including manufacturing defects and accidental damage.
              </p>
            </div>

            <div className="mb-6 p-4 bg-[#F8F8F8] border border-gray-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-[#111111]" />
                <span className="font-bold">No Cost EMI</span>
              </div>
              <p className="text-sm text-[#555555]">
                Starting at ₹{Math.round(product.price / 100 / 12).toLocaleString()}/month. Select during checkout.
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#111111] mb-2">Quantity</label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden max-w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="btn-premium btn-primary w-full sm:w-auto !h-14 !px-8 shadow-premium hover:shadow-premium-hover"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-premium !h-14 !px-8 bg-[#111111] text-white hover:bg-black border border-transparent shadow-premium hover:shadow-premium-hover"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#111111]" />
                <span className="text-sm">{productWithDefaults.deliveryEstimate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#111111]" />
                <span className="text-sm">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-[#111111]" />
                <span className="text-sm">30-day easy returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#111111]" />
                <span className="text-sm">2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      <div className="container-premium pb-16">
        <h2 className="h2 mb-6">Frequently Bought Together</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">You May Also Need</h3>
            <div className="space-y-4">
              {productWithDefaults.frequentlyBoughtWith?.length > 0 ? productWithDefaults.frequentlyBoughtWith.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name || 'Product'}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name || 'Product Name'}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold">₹{Math.round((item.price || 0) / 100).toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (!item) return;
                      
                      // Create cart item with this product data
                      const cartItem: CartItem = {
                        ...item,
                        quantity: 1,
                        selectedColor: undefined,
                        selectedSize: undefined,
                      };
                      
                      dispatch(addToCart(cartItem));
                      
                      toast.success(`${item.name} added to bag`, {
                        icon: <ShoppingCart className="w-4 h-4 text-emerald-500" />, 
                        className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
                      });
                    }}
                    className="btn-premium !h-10 !px-4 text-xs"
                  >
                    Add
                  </button>
                </div>
              )) : <div className="text-center py-8 text-gray-500">No frequently bought items available</div>}
            </div>
            <button className="mt-4 w-full py-2 text-sm font-medium text-[#DC2626] border border-[#DC2626] rounded-lg hover:bg-[#DC2626]/5 transition-colors">
              Add All to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Customers Also Viewed */}
      <div className="container-premium pb-16">
        <h2 className="h2 mb-6">Customers Also Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {productWithDefaults.customersAlsoViewed?.length ? productWithDefaults.customersAlsoViewed.map((item, idx) => (
            <ProductCard
              key={item.id || `customer-${idx}`}
              product={item as Product}
              index={idx}
              layout="grid"
            />
          )) : <div className="col-span-full text-center py-8 text-gray-500">No customers also viewed items available</div>}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container-premium pb-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: "description", label: "Description" },
              { id: "specifications", label: "Specifications" },
              { id: "reviews", label: "Reviews" },
              { id: "delivery", label: "Delivery & Returns" },
              { id: "seller", label: "Seller Information" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 font-medium text-sm transition-colors ${activeTab === tab.id ? "text-[#DC2626] border-b-2 border-[#DC2626]" : "text-[#555555] hover:text-[#111111]"}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            {activeTab === "description" && (
              <div>
                <p className="text-[15px] text-[#555555] leading-relaxed mb-6">
                  {product.description}
                </p>
                <h3 className="font-bold text-lg mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#15803D] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {product.specs ? Object.entries(product.specs).map(([key, value], idx) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-b-0">
                        <td className="py-3 px-4 font-medium text-[#111111] w-40">{key}</td>
                        <td className="py-3 px-4 text-[#555555]">{value}</td>
                      </tr>
                    )) : (
                      <tr className="border-b border-gray-100 last:border-b-0">
                        <td className="py-3 px-4 font-medium text-[#111111] w-40">N/A</td>
                        <td className="py-3 px-4 text-[#555555]">No specifications available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-3xl font-bold">{product.rating}</div>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-[#AAAAAA] ml-2">({product.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#555555]" />
                    <select
                      value={reviewSort}
                      onChange={(e) => setReviewSort(e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent appearance-none"
                    >
                      <option value="most-recent">Most Recent</option>
                      <option value="highest-rated">Highest Rated</option>
                      <option value="lowest-rated">Lowest Rated</option>
                      <option value="with-images">With Images</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#555555] absolute right-2 pointer-events-none" />
                  </div>
                </div>

                {/* Star Distribution */}
                <div className="bg-white border border-gray-100 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Ratings Breakdown</h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-10">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < star ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#DC2626] h-2 rounded-full"
                            style={{ width: `${star === 5 ? 65 : star === 4 ? 25 : star === 3 ? 7 : star === 2 ? 2 : 1}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-sm">{star}★</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Submission */}
                <div className="bg-white border border-gray-100 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Write a Review</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-2">Your Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <button
                            key={i}
                            type="button"
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Star className={`w-4 h-4 ${i <= 4 ? 'text-amber-500 fill-current' : 'text-gray-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-2">Title</label>
                      <input
                        type="text"
                        placeholder="What's most important to you?"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-2">Review</label>
                      <textarea
                        rows={4}
                        placeholder="Share your experience with this product"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="btn-premium btn-primary !h-12 !px-6"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Customer Reviews</h3>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-white border border-gray-100 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">Customer {i}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${j < 4 ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[14px] text-[#555555] mb-3">
                        This product exceeded my expectations. The sound quality is incredible and battery life is amazing.
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#AAAAAA]">
                        <span>Verified Purchase</span>
                        <span>•</span>
                        <span>2 days ago</span>
                        <span>•</span>
                        <span>Helpful (12)</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src="/images/review-1.jpg"
                            alt="Review image"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src="/images/review-2.jpg"
                            alt="Review image"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Delivery Information</h3>
                  <p className="text-[15px] text-[#555555]">
                    {productWithDefaults.deliveryEstimate}. Free shipping on orders above ₹499.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Returns & Exchanges</h3>
                  <p className="text-[15px] text-[#555555]">
                    30-day easy returns. Easy returns — no questions asked.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Shipping Policy</h3>
                  <p className="text-[15px] text-[#555555]">
                    Orders placed before 2 PM are shipped same day. Delivery within 1–3 business days across India.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "seller" && (
              <div className="space-y-4">
                <div className="p-4 bg-white border border-gray-100 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">About {productWithDefaults.seller.name}</h3>
                  <p className="text-[15px] text-[#555555]">
                    Authorized seller of premium products. We guarantee 100% genuine items with official warranty support.
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#111111]" />
                      <span className="font-medium">{productWithDefaults.seller.reviewCount}+ satisfied customers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#111111]" />
                      <span className="font-medium">{productWithDefaults.seller.badges[0]} since 2022</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-100 rounded-lg">
                    <h4 className="font-bold text-base mb-2">Return Policy</h4>
                    <p className="text-[15px] text-[#555555]">
                      30-day hassle-free returns. Item must be unused and in original packaging.
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-100 rounded-lg">
                    <h4 className="font-bold text-base mb-2">Warranty</h4>
                    <p className="text-[15px] text-[#555555]">
                      2-year comprehensive warranty covering parts, labor, and accidental damage.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

