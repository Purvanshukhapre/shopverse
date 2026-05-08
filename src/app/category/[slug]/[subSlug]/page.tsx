import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { allProducts } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopClient from "@/components/sections/ShopClient";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function SubCategoryPage({ params }: { params: { slug: string, subSlug: string } }) {
  const { slug, subSlug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const subCategory = category.subcategories?.find(s => s.slug === subSlug);

  if (!subCategory) {
    notFound();
  }

  const subCategoryProducts = allProducts.filter((p) => 
    p.category.toLowerCase() === category.name.toLowerCase() || 
    p.category.toLowerCase().includes(category.name.toLowerCase())
  ); // Mock: we are just showing the category products for now

  return (
    <div className="bg-[#F4F4F5] min-h-screen flex flex-col">
      <Navbar />

      {/* Subcategory Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/category/${category.slug}`} className="hover:text-black transition-colors">{category.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-black">{subCategory.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tighter leading-tight mb-4">
            {subCategory.name}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl font-medium">
            Explore our curated selection of {subCategory.name.toLowerCase()}.
          </p>
        </div>
      </section>

      {/* Products */}
      <div className="py-8 z-10 relative flex-grow">
        <ShopClient products={subCategoryProducts} hideHeader={true} />
      </div>

      <Footer />
    </div>
  );
}
