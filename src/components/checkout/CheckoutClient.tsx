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
  Package, Star, Globe, Wallet
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Professional Form Input
function FormInput({
  label, error, ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-black text-[#777777] uppercase tracking-[0.15em]">{label}</label>
      <input
        className={cn(
          "w-full h-13 px-5 rounded-xl border-2 outline-none text-sm font-bold text-[#111111] transition-all bg-white placeholder:text-[#AAAAAA]",
          error ? "border-red-400 bg-red-50" : "border-gray-100 focus:border-[#111111] shadow-sm"
        )}
        {...props}
      />
      {error && <p className="text-[10px] font-bold text-[#DC2626] flex items-center gap-1">⚠ {error}</p>}
    </div>
  );
}

// Authority Stepper (Connected Glow Line)
function StepIndicator({ current }: { current: number }) {
  const steps = [
    { id: 1, label: "Shipping", icon: MapPin },
    { id: 2, label: "Delivery", icon: Truck },
    { id: 3, label: "Review",   icon: CreditCard },
  ];
  return (
    <div className="flex items-center justify-between w-full max-w-lg mx-auto">
      {steps.map((step, i) => {
        const isDone = current > step.id;
        const isActive = current === step.id;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-3 relative">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500",
                isDone ? "bg-[#15803D] border-[#15803D] text-white shadow-xl shadow-emerald-500/20" :
                isActive ? "bg-[#111111] border-[#111111] text-white shadow-xl shadow-black/20 scale-110" :
                "bg-white border-gray-100 text-gray-300"
              )}>
                {isDone ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest whitespace-nowrap absolute -bottom-6",
                isActive || isDone ? "text-[#111111]" : "text-gray-300"
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-4 h-1 bg-gray-100 rounded-full relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isDone ? "100%" : "0%" }}
                  className="absolute inset-0 bg-[#111111]"
                  transition={{ duration: 0.6 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Payment Method Card
function PaymentMethodCard({ id, name, desc, icon: Icon, selected, onChange }: any) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "w-full flex items-center gap-5 p-6 rounded-[20px] border-2 transition-all text-left group",
        selected ? "border-[#111111] bg-[#F8F8F8] shadow-xl shadow-black/5" : "border-gray-100 bg-white hover:border-gray-300"
      )}
    >
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
        selected ? "border-[#111111]" : "border-gray-200 group-hover:border-gray-400"
      )}>
        {selected && <div className="w-3 h-3 bg-[#111111] rounded-full" />}
      </div>
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
         <Icon className={cn("w-6 h-6", selected ? "text-[#111111]" : "text-gray-400")} />
      </div>
      <div className="flex-1">
        <p className="text-[15px] font-black text-[#111111]">{name}</p>
        <p className="text-[11px] text-[#777777] font-medium">{desc}</p>
      </div>
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
  const [paymentMethod, setPaymentMethod] = useState("card");

  const tax         = subtotal * 0.18;
  const total       = subtotal + tax;

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    dispatch(clearCart());
    toast.success("Order processed safely");
  };

  if (items.length === 0 && !isSuccess) {
    router.push("/cart");
    return null;
  }

  /* ── 1. SUCCESS STATE (Authority Tracking) ── */
  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-12 shadow-premium border border-gray-100"
        >
          <div className="w-24 h-24 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-500/10">
            <CheckCircle2 className="w-12 h-12 text-[#15803D]" />
          </div>
          <h1 className="text-4xl font-black text-[#111111] mb-4">Secured & Confirmed</h1>
          <p className="text-[#555555] font-medium mb-12 max-w-md mx-auto">
            Your premium order <span className="text-[#111111] font-black">#SV-{Math.floor(Math.random()*9000)+1000}</span> has been processed. A confirmation receipt was sent to your email.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
             {[
               { icon: Package, label: "Processing", sub: "Warehouse" },
               { icon: Truck, label: "Transit", sub: "ETA 2-3 Days" },
               { icon: Globe, label: "Delivery", sub: "To Mumbai" }
             ].map((stat, i) => (
               <div key={i} className="bg-[#F8F8F8] p-6 rounded-2xl border border-gray-100 text-center">
                  <stat.icon className="w-6 h-6 text-[#111111] mx-auto mb-3" />
                  <p className="text-[11px] font-black text-[#111111] uppercase tracking-widest">{stat.label}</p>
                  <p className="text-[10px] text-[#777777] font-medium">{stat.sub}</p>
               </div>
             ))}
          </div>

          <Link href="/" className="btn-premium btn-primary px-16 shadow-2xl shadow-black/10">
             Return To Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-24">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-16 items-start">
        
        {/* ── LEFT: Checkout Flow ── */}
        <div className="flex-1 min-w-0 space-y-12">
          
          {/* Progress Header */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-soft">
             <StepIndicator current={step} />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[24px] border border-gray-100 p-8 md:p-12 space-y-10"
              >
                <div className="border-b border-gray-50 pb-6">
                  <h2 className="text-3xl font-black text-[#111111] tracking-tight">Shipping Destination</h2>
                  <p className="text-[#555555] font-medium mt-2">Enter your precise delivery details for safe transit.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput label="Full Recipient Name" placeholder="Rahul Sharma" error={errors.firstName?.message} {...register("firstName")} />
                  <FormInput label="Primary Phone" type="tel" placeholder="+91 98765 43210" error={errors.phone?.message} {...register("phone")} />
                  <div className="md:col-span-2">
                    <FormInput label="Email Confirmation" type="email" placeholder="rahul.sharma@example.com" error={errors.email?.message} {...register("email")} />
                  </div>
                  <div className="md:col-span-2">
                    <FormInput label="Street Address / Landmark" placeholder="123, Park Avenue, Suite 405" error={errors.address?.message} {...register("address")} />
                  </div>
                  <FormInput label="City" placeholder="Mumbai" error={errors.city?.message} {...register("city")} />
                  <FormInput label="State" placeholder="Maharashtra" error={errors.state?.message} {...register("state")} />
                  <FormInput label="Zip Code" placeholder="400001" error={errors.zipCode?.message} {...register("zipCode")} />
                </div>

                <div className="flex justify-end pt-8 border-t border-gray-50">
                   <button
                     type="button"
                     onClick={() => setStep(2)}
                     className="btn-premium btn-primary px-12"
                   >
                     Next: Delivery Selection <ChevronRight className="w-5 h-5 ml-2" />
                   </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[24px] border border-gray-100 p-8 md:p-12 space-y-10"
              >
                <div>
                   <h2 className="text-3xl font-black text-[#111111] tracking-tight">Transit Speed</h2>
                   <p className="text-[#555555] font-medium mt-2">How fast do you need your premium items?</p>
                </div>
                
                <div className="space-y-4">
                   <PaymentMethodCard 
                     name="Express Courier" desc="Guaranteed delivery by tomorrow afternoon" icon={Zap} selected={true} 
                   />
                   <PaymentMethodCard 
                     name="Standard Logistics" desc="Cost-effective transit within 3-5 days" icon={Truck} selected={false} 
                   />
                </div>

                <div className="flex justify-between pt-8 border-t border-gray-50">
                  <button type="button" onClick={() => setStep(1)} className="btn-premium btn-secondary border-none px-0"><ArrowLeft className="w-4 h-4 mr-2" /> Back</button>
                  <button type="button" onClick={() => setStep(3)} className="btn-premium btn-primary px-12">Continue to Payment <ChevronRight className="w-5 h-5 ml-2" /></button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[24px] border border-gray-100 p-8 md:p-12 space-y-10"
              >
                <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                   <div>
                     <h2 className="text-3xl font-black text-[#111111] tracking-tight">Payment Verification</h2>
                     <p className="text-[#555555] font-medium mt-2">All transactions are processed via secure 256-bit SSL encryption.</p>
                   </div>
                   <div className="flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] px-4 py-2 rounded-xl border border-emerald-100">
                      <Lock className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">SSL Secured</span>
                   </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <PaymentMethodCard 
                    id="card" name="Secure Credit / Debit Card" desc="Pay instantly with VISA, Mastercard, or AMEX" icon={CreditCard} 
                    selected={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} 
                  />
                  <PaymentMethodCard 
                    id="upi" name="UPI / Digital Wallets" desc="Fast & secure payment via GPay, PhonePe, or BHIM" icon={Wallet} 
                    selected={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} 
                  />
                  <PaymentMethodCard 
                    id="cod" name="Direct Cash on Delivery" desc="Pay with cash at your doorstep upon arrival" icon={Package} 
                    selected={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} 
                  />
                </div>

                {paymentMethod === "card" && (
                   <div className="bg-[#F8F8F8] p-8 rounded-[20px] border border-gray-100 grid grid-cols-2 gap-6">
                      <div className="col-span-2">
                         <FormInput label="Card Number" placeholder="0000 0000 0000 0000" />
                      </div>
                      <FormInput label="Valid Thru" placeholder="MM / YY" />
                      <FormInput label="Security Code" placeholder="CVV" />
                   </div>
                )}

                <div className="flex justify-between pt-8 border-t border-gray-50">
                  <button type="button" onClick={() => setStep(2)} className="btn-premium btn-secondary border-none px-0"><ArrowLeft className="w-4 h-4 mr-2" /> Back</button>
                  <button 
                    disabled={isSubmitting}
                    className="btn-premium btn-primary px-16 shadow-2xl shadow-black/20"
                  >
                    {isSubmitting ? <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Verifying...</> : <>Authorize Payment · {formatPrice(total)}</>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Summary Authority ── */}
        <aside className="w-full lg:w-[420px] flex-shrink-0 lg:sticky lg:top-48 space-y-6">
           <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-premium">
              <h3 className="text-sm font-black text-[#111111] uppercase tracking-[0.2em] mb-8">Items in Transit</h3>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto thin-scrollbar pr-2 mb-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4">
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-[#F8F8F8] border border-gray-100 flex-shrink-0">
                       <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-[13px] font-black text-[#111111] line-clamp-1 leading-tight">{item.name}</p>
                       <p className="text-[10px] text-[#777777] font-bold mt-1 uppercase tracking-widest">{item.quantity} Unit · {item.selectedSize || 'Default'}</p>
                       <p className="text-[13px] font-black text-[#111111] mt-2">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-50 pt-8 space-y-4">
                 <div className="flex justify-between items-center text-[13px] font-bold text-[#555555]">
                    <span>Subtotal Value</span>
                    <span className="text-[#111111]">{formatPrice(subtotal)}</span>
                 </div>
                 {savings > 0 && (
                   <div className="flex justify-between items-center text-[13px] font-bold text-[#15803D]">
                      <span>Discount Benefit</span>
                      <span>−{formatPrice(savings)}</span>
                   </div>
                 )}
                 <div className="flex justify-between items-center text-[13px] font-bold text-[#555555]">
                    <span>Shipping Charges</span>
                    <span className="text-[#15803D]">FREE</span>
                 </div>
                 <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                    <span className="text-base font-black text-[#111111] uppercase tracking-widest">Grand Total</span>
                    <span className="text-3xl font-black text-[#111111] tracking-tighter">{formatPrice(total)}</span>
                 </div>
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#15803D]" />
                    <p className="text-[11px] font-black text-[#111111] uppercase tracking-widest">Buyer Protection Active</p>
                 </div>
                 <div className="flex items-center gap-4 border-t border-gray-200 pt-4 opacity-30 grayscale">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={32} height={10} />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={24} height={24} />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={40} height={12} />
                 </div>
              </div>
           </div>
        </aside>

      </form>
    </div>
  );
}
