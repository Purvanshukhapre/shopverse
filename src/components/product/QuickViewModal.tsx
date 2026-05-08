"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setQuickViewId } from "@/store/slices/uiSlice";
import { allProducts } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

export default function QuickViewModal() {
  const dispatch = useAppDispatch();
  const { quickViewId } = useAppSelector((state) => state.ui);
  
  const product = allProducts.find(p => p.id === quickViewId);

  const close = () => dispatch(setQuickViewId(null));

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-6xl md:max-h-[90vh] bg-white z-[101] shadow-2xl rounded-[3rem] overflow-hidden"
          >
            <button 
              onClick={close}
              className="absolute top-8 right-8 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-black hover:text-white transition-all active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="h-full overflow-y-auto no-scrollbar p-8 md:p-12 lg:p-16">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-1/2">
                  <ProductGallery images={product.images || [product.image]} />
                </div>
                <div className="w-full lg:w-1/2">
                  <ProductInfo product={product} />
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <a 
                      href={`/product/${product.slug}`}
                      className="text-sm font-black text-black uppercase tracking-widest hover:underline flex items-center gap-2"
                    >
                      View Full Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
