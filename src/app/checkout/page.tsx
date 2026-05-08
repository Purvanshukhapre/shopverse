import CheckoutClient from "@/components/checkout/CheckoutClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Secure Checkout | ShopEverse Premium",
  description: "Complete your purchase with our secure and easy checkout process.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-[#F4F4F5] min-h-screen">
      <Navbar />
      <CheckoutClient />
      <Footer />
    </div>
  );
}
