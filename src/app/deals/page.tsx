import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DealsClient from "@/components/sections/DealsClient";

export const metadata = {
  title: "Flash Deals | Exclusive Limited Offers | ShopEverse",
  description: "High-density flash sales on premium electronics, fashion, and lifestyle. Authentic products, guaranteed savings.",
};

export default function DealsPage() {
  return (
    <>
      <Navbar />
      <DealsClient />
      <Footer />
    </>
  );
}
