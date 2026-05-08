"use client";

import { ChevronUp, Globe, MessageCircle, Mail, Share2, Smartphone, ShieldCheck, MapPin, Zap } from "lucide-react";
import { SITE_NAME, FOOTER_LINKS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] text-white">
      {/* Back to Top (Minimalist Authority) */}
      <button
        onClick={scrollToTop}
        className="w-full py-4 bg-white/5 hover:bg-white/10 transition-all text-[11px] font-black uppercase tracking-[0.3em] text-white/50 flex items-center justify-center gap-2 border-b border-white/5"
      >
        <ChevronUp className="w-4 h-4" />
        Back to top
      </button>

      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-8 pr-12">
             <Link href="/">
                <h2 className="text-3xl font-black tracking-tighter">
                  Shop<span className="text-[#DC2626]">Everse</span>
                </h2>
             </Link>
             <p className="text-sm text-[#777777] font-medium leading-relaxed max-w-sm">
                The world's premier retail experience. Engineered for authenticity, speed, and luxury essentials. Experience the next generation of commerce.
             </p>
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                   </div>
                   <span className="text-[11px] font-black uppercase tracking-widest text-[#AAAAAA]">Certified Secure Retailer</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Zap className="w-5 h-5 text-amber-400" />
                   </div>
                   <span className="text-[11px] font-black uppercase tracking-widest text-[#AAAAAA]">Global Express Network</span>
                </div>
             </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h3 className="text-[11px] font-black text-white mb-8 uppercase tracking-[0.2em]">
                {title}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-[#777777] hover:text-white transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / App Download Strip */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Join the ecosystem</h4>
              <div className="flex gap-2">
                 <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="h-12 w-64 px-5 bg-white/5 border border-white/10 rounded-xl text-xs outline-none focus:border-white/30 transition-all"
                 />
                 <button className="h-12 px-8 bg-white text-[#111111] text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all">
                    Subscribe
                 </button>
              </div>
           </div>

           <div className="flex flex-col md:items-end gap-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Experience on Mobile</h4>
              <div className="flex gap-3">
                 <button className="h-12 px-6 border border-white/10 rounded-xl flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-all group">
                    <Smartphone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                       <p className="text-[9px] font-black text-white/50 uppercase leading-none">Get it on</p>
                       <p className="text-xs font-black">App Store</p>
                    </div>
                 </button>
                 <button className="h-12 px-6 border border-white/10 rounded-xl flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-all group">
                    <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                       <p className="text-[9px] font-black text-white/50 uppercase leading-none">Download for</p>
                       <p className="text-xs font-black">Android</p>
                    </div>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Bar (Minimalist) */}
      <div className="bg-black py-8 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 text-[11px] font-bold text-[#555555]">
               <span>© {new Date().getFullYear()} {SITE_NAME} HOLDINGS. ALL RIGHTS RESERVED.</span>
               <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-4">
                  <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
                  <a href="#" className="hover:text-white transition-colors">TERMS</a>
                  <a href="#" className="hover:text-white transition-colors">ACCESSIBILITY</a>
               </div>
            </div>

            <div className="flex items-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
               <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={12} />
               <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={24} height={24} />
               <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={48} height={12} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
