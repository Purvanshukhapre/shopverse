import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { allProducts } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopClient from "@/components/sections/ShopClient";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = allProducts.filter((p) => 
    p.category.toLowerCase() === category.name.toLowerCase() || 
    p.category.toLowerCase().includes(category.name.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <ShopClient 
          products={categoryProducts.length > 0 ? categoryProducts : allProducts} 
          title={`${category.name} Collection`}
          categoryName={category.name}
        />
      </main>

      <Footer />
    </div>
  );
}
