import { allProducts } from "@/data/products";
import ShopClient from "@/components/sections/ShopClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Shop All Products | ShopEverse Premium",
  description: "Browse our entire collection of premium electronics, fashion, and lifestyle products.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <ShopClient products={allProducts} />
      <Footer />
    </>
  );
}
