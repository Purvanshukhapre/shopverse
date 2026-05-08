import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartClient from "@/components/cart/CartClient";

export const metadata = {
  title: "Your Shopping Bag | ShopEverse",
  description: "Review your items and proceed to checkout for a premium shopping experience.",
};

export default function CartPage() {
  return (
    <div className="bg-[#F4F4F5] min-h-screen">
      <Navbar />
      <CartClient />
      <Footer />
    </div>
  );
}
