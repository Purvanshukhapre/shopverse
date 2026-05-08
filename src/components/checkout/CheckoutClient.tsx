"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutFormData } from "@/lib/schemas";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { formatPrice, cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Truck, CheckCircle2, ChevronRight, MapPin,
  Smartphone, ArrowLeft, Loader2, ShieldCheck, Lock,
  Package, Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Input field component
function FormInput({
  label, error, ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        className={cn(
          "w-full h-12 px-4 rounded-xl border-2 outline-none text-sm font-medium text-gray-900 transition-all bg-white placeholder:text-gray-300",
          error ? "border-red-400 bg-red-50" : "border-gray-100 focus:border-gray-900 shadow-sm"
        )}
        {...props}
      />
      {error && <p className="text-[10px] font-bold text-red-500 flex items-center gap-1">⚠ {error}</p>}
    </div>
  );
}

// Step indicator
function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = [
    { id: 1, label: "Address",  icon: MapPin },
    { id: 2, label: "Delivery", icon: Truck },
    { id: 3, label: "Payment",  icon: CreditCard },
  ];
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all font-black text-xs",
              current > step.id
                ? "bg-emerald-500 border-emerald-500 text-white"
                : current === step.id
                  ? "bg-gray-900 border-gray-900 text-white"
                  : "bg-white border-gray-200 text-gray-300"
            )}>
              {current > step.id
                ? <CheckCircle2 className="w-4 h-4" />
                : <step.icon className="w-4 h-4" />
              }
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
              current >= step.id ? "text-gray-900" : "text-gray-400"
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "h-0.5 w-12 sm:w-20 mx-1 mb-5 transition-all",
              current > step.id ? "bg-emerald-400" : "bg-gray-200"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── DELIVERY METHOD OPTION ──
function DeliveryOption({ id, name, time, price, selected, onChange }: {
  id: string; name: string; time: string; price: number;
  selected: boolean; onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
        selected ? "border-gray-900 bg-gray-50" : "border-gray-100 bg-white hover:border-gray-300"
      )}
    >
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
        selected ? "border-gray-900" : "border-gray-300"
      )}>
        {selected && <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <span className="text-sm font-black text-gray-900 flex-shrink-0">
        {price === 0 ? <span className="text-emerald-600">FREE</span> : formatPrice(price)}
      </span>
    </button>
  );
}

// ── PAYMENT METHOD OPTION ──
function PaymentOption({ id, name, Icon, selected, onChange }: {
  id: string; name: string; Icon: React.ElementType;
  selected: boolean; onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
        selected ? "border-gray-900 bg-gray-50" : "border-gray-100 bg-white hover:border-gray-300"
      )}
    >
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
        selected ? "border-gray-900" : "border-gray-300"
      )}>
        {selected && <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />}
      </div>
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <span className="text-sm font-bold text-gray-900">{name}</span>
    </button>
  );
}

export default function CheckoutClient() {
  const router    = useRouter();
  const dispatch  = useAppDispatch();
  const { items } = useAppSelector((s) => s.cart);

  const subtotal  = items.reduce((t, i) => t + i.price * i.quantity, 0);
  const originalTotal = items.reduce((t, i) => t + (i.originalPrice || i.price) * i.quantity, 0);
  const savings   = originalTotal - subtotal;

  const [step, setStep]             = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]   = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("std");
  const [paymentMethod, setPaymentMethod]   = useState("card");

  const deliveryFee = deliveryMethod === "exp" ? 999 : subtotal > 5000 ? 0 : 499;
  const tax         = subtotal * 0.18;
  const total       = subtotal + deliveryFee + tax;

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "card" },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    dispatch(clearCart());
    toast.success("Order placed successfully! 🎉");
  };

  if (items.length === 0 && !isSuccess) {
    router.push("/cart");
    return null;
  }

  /* ── ORDER SUCCESS ──────────────────────────────────────── */
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </motion.div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">Order Confirmed! 🎉</h1>
          <p className="text-gray-500 mb-2">
            Thank you for shopping with ShopEverse!
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Order <span className="font-bold text-gray-700">#EV-{Math.floor(Math.random() * 900000) + 100000}</span> has been placed and will be delivered within 3–5 business days.
          </p>

          {/* Order timeline */}
          <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left">
            <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-4">Order Tracking</p>
            {[
              { label: "Order Placed",    done: true,  time: "Just now" },
              { label: "Processing",      done: false, time: "Today" },
              { label: "Shipped",         done: false, time: "Tomorrow" },
              { label: "Out for Delivery",done: false, time: "Day 3" },
              { label: "Delivered",       done: false, time: "Day 3–5" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3 mb-2 last:mb-0">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black",
                  step.done ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"
                )}>
                  {step.done ? "✓" : i + 1}
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span className={cn("text-xs font-semibold", step.done ? "text-gray-900" : "text-gray-400")}>{step.label}</span>
                  <span className="text-[10px] text-gray-400">{step.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 bg-[#FB641B] text-white font-black uppercase tracking-wider text-xs rounded-xl hover:bg-[#e55a16] transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── CHECKOUT FORM ─────────────────────────────────────── */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 md:py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-8 items-start">

        {/* ── LEFT: Multi-step form ── */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Step indicator */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex justify-center">
            <StepIndicator current={step} total={3} />
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Shipping */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-1">Shipping Address</h2>
                  <p className="text-sm text-gray-500">Where should we deliver your order?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="First Name"
                    placeholder="Rahul"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />
                  <FormInput
                    label="Last Name"
                    placeholder="Sharma"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                  />
                  <FormInput
                    label="Email Address"
                    type="email"
                    placeholder="rahul@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                    className="sm:col-span-2 w-full h-12 px-4 rounded-xl border-2 outline-none text-sm font-medium text-gray-900 transition-all bg-white placeholder:text-gray-300 border-gray-100 focus:border-gray-900 shadow-sm"
                  />
                  <FormInput
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 9876543210"
                    {...register("phone" as keyof CheckoutFormData)}
                    className="sm:col-span-2 w-full h-12 px-4 rounded-xl border-2 outline-none text-sm font-medium text-gray-900 transition-all bg-white placeholder:text-gray-300 border-gray-100 focus:border-gray-900 shadow-sm"
                  />
                  <FormInput
                    label="Street Address"
                    placeholder="123, Park Street"
                    error={errors.address?.message}
                    {...register("address")}
                    className="sm:col-span-2 w-full h-12 px-4 rounded-xl border-2 outline-none text-sm font-medium text-gray-900 transition-all bg-white placeholder:text-gray-300 border-gray-100 focus:border-gray-900 shadow-sm"
                  />
                  <FormInput
                    label="City"
                    placeholder="Mumbai"
                    error={errors.city?.message}
                    {...register("city")}
                  />
                  <FormInput
                    label="Pincode"
                    placeholder="400001"
                    error={errors.zipCode?.message}
                    {...register("zipCode")}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="h-12 px-8 bg-[#FB641B] text-white rounded-xl font-black uppercase tracking-wider text-xs hover:bg-[#e55a16] transition-all shadow-md shadow-orange-100 flex items-center gap-2"
                  >
                    Continue to Delivery <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Delivery */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-1">Delivery Method</h2>
                  <p className="text-sm text-gray-500">Choose your preferred delivery speed.</p>
                </div>
                <div className="space-y-3">
                  <DeliveryOption
                    id="std"
                    name="Standard Delivery"
                    time="Delivered in 3–5 Business Days"
                    price={subtotal > 5000 ? 0 : 499}
                    selected={deliveryMethod === "std"}
                    onChange={() => setDeliveryMethod("std")}
                  />
                  <DeliveryOption
                    id="exp"
                    name="Express Delivery"
                    time="Delivered by Tomorrow"
                    price={999}
                    selected={deliveryMethod === "exp"}
                    onChange={() => setDeliveryMethod("exp")}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="h-12 px-6 flex items-center gap-2 font-bold text-xs text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="h-12 px-8 bg-[#FB641B] text-white rounded-xl font-black uppercase tracking-wider text-xs hover:bg-[#e55a16] transition-all shadow-md shadow-orange-100 flex items-center gap-2"
                  >
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-1">Payment Method</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    All transactions are 256-bit SSL encrypted.
                  </p>
                </div>
                <div className="space-y-3">
                  <PaymentOption id="card" name="Credit / Debit Card"  Icon={CreditCard}  selected={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                  <PaymentOption id="upi"  name="UPI / Net Banking"     Icon={Smartphone}  selected={paymentMethod === "upi"}  onChange={() => setPaymentMethod("upi")} />
                  <PaymentOption id="cod"  name="Cash on Delivery"      Icon={Package}     selected={paymentMethod === "cod"}  onChange={() => setPaymentMethod("cod")} />
                </div>

                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3 pt-2 border-t border-gray-100"
                  >
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234  5678  9012  3456"
                        className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-gray-900 outline-none text-sm font-medium text-gray-900 bg-white transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-gray-900 outline-none text-sm font-medium text-gray-900 bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">CVV</label>
                        <input
                          type="text"
                          placeholder="•••"
                          maxLength={3}
                          className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 focus:border-gray-900 outline-none text-sm font-medium text-gray-900 bg-white transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="h-12 px-6 flex items-center gap-2 font-bold text-xs text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-10 bg-[#FB641B] text-white rounded-xl font-black uppercase tracking-wider text-xs hover:bg-[#e55a16] transition-all shadow-md shadow-orange-100 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : (
                      <>Place Order · {formatPrice(total)} <CheckCircle2 className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <aside className="w-full lg:w-[360px] flex-shrink-0 lg:sticky lg:top-40 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">
              Order Summary ({items.length})
            </h3>

            {/* Items */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto thin-scrollbar mb-5">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-700 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{item.name}</p>
                    {item.selectedSize && (
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">Size: {item.selectedSize}</p>
                    )}
                    <p className="text-sm font-black text-gray-900 mt-1">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-gray-900 font-bold">{formatPrice(subtotal)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Discount</span>
                  <span className="text-emerald-600 font-bold">−{formatPrice(savings)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Delivery</span>
                <span className={deliveryFee === 0 ? "text-emerald-600 font-bold" : "text-gray-900 font-bold"}>
                  {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">GST (18%)</span>
                <span className="text-gray-900 font-bold">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="text-sm font-black text-gray-900">Total</span>
                <span className="text-xl font-black text-gray-900 tracking-tight">{formatPrice(total)}</span>
              </div>
              {savings > 0 && (
                <p className="text-[10px] font-bold text-emerald-600">
                  You save {formatPrice(savings)} on this order
                </p>
              )}
            </div>
          </div>

          {/* Security badges */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <p className="text-xs font-black text-gray-700">Safe & Secure Shopping</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["SSL Secured", "Verified Seller", "Genuine Products", "Easy Returns"].map(badge => (
                <span key={badge} className="text-[9px] font-bold text-gray-500 border border-gray-200 px-2 py-1 rounded-md">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
