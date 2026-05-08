import { Metadata } from "next";
import { Check, Shield, Award, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { allProducts } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | ShopEverse`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  return (
    <div className="bg-[#F4F4F5] min-h-screen">
      <Navbar />

      {/* ━━━ Trust Bar (above fold) ━━━ */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { icon: Shield,  label: "Secure Payments",     sub: "100% protected" },
            { icon: Check,   label: "Verified Products",   sub: "Genuine & authentic" },
            { icon: Award,   label: "Easy Returns",        sub: "10-day hassle free" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-bold text-gray-800">{label}</p>
                <p className="text-[9px] text-gray-400 font-medium">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━ Main Product Section ━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 flex-wrap">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-gray-700 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-gray-700 transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Gallery + Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-0">

            {/* Gallery: sticky on desktop */}
            <div className="w-full lg:w-[55%] p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              <ProductGallery images={product.images || [product.image]} />
            </div>

            {/* Info */}
            <div className="w-full lg:w-[45%] p-6 md:p-8">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>

        {/* ━━━ Description + Features + Specs Tabs ━━━ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4 overflow-hidden">
          <div className="border-b border-gray-100 px-6 sm:px-8 py-4 flex items-center gap-6 overflow-x-auto no-scrollbar">
            {["Description", "Specifications", "Reviews"].map((tab, i) => (
              <button
                key={tab}
                className={
                  i === 0
                    ? "text-sm font-black text-gray-900 border-b-2 border-gray-900 pb-1 flex-shrink-0"
                    : "text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors pb-1 flex-shrink-0"
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

            {/* Description */}
            <div className="lg:col-span-4 p-6 sm:p-8">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-3">About this product</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="lg:col-span-8 p-6 sm:p-8">
              {product.features && (
                <>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-sm text-gray-700 leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Specs table */}
              {product.specs && (
                <>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Specifications</h3>
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    {Object.entries(product.specs).map(([key, value], i) => (
                      <div
                        key={key}
                        className={`flex items-start gap-4 px-5 py-3 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                      >
                        <span className="text-xs font-bold text-gray-500 w-32 flex-shrink-0 uppercase tracking-wide">{key}</span>
                        <span className="text-xs font-semibold text-gray-900 flex-1">{value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ━━━ Related Products ━━━ */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-black text-gray-900">Similar Products</h2>
                <p className="text-sm text-gray-500 mt-0.5">Based on this item's category</p>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
