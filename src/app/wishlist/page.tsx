import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WishlistClient from "@/components/sections/WishlistClient";

export const metadata = {
  title: "Your Wishlist | ShopEverse Premium",
  description: "View and manage your favorite premium items.",
};

export default function WishlistPage() {
  return (
    <div className="bg-[#F4F4F5] min-h-screen">
      <Navbar />
      <WishlistClient />
      <Footer />
    </div>
  );
}
