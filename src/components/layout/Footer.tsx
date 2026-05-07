"use client";

import { ChevronUp, Globe, MessageCircle, Mail, Share2, Smartphone } from "lucide-react";
import { SITE_NAME, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#262626] transition-colors text-sm text-white/80 flex items-center justify-center gap-1.5"
      >
        <ChevronUp className="w-4 h-4" />
        Back to top
      </button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#A1A1AA] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Download + Social */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#A1A1AA]" />
              <span className="text-sm text-[#A1A1AA]">Download App</span>
            </div>
            <div className="flex gap-2">
              <a
                href="#"
                className="px-4 py-1.5 border border-white/20 rounded text-xs text-white/80 hover:bg-white/5 transition-colors"
              >
                App Store
              </a>
              <a
                href="#"
                className="px-4 py-1.5 border border-white/20 rounded text-xs text-white/80 hover:bg-white/5 transition-colors"
              >
                Google Play
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { Icon: Globe, label: "Website" },
              { Icon: MessageCircle, label: "Community" },
              { Icon: Mail, label: "Email" },
              { Icon: Share2, label: "Share" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + Copyright */}
            <div className="flex items-center gap-3">
              <span className="text-lg font-black tracking-tight">
                Shop<span className="text-[#A1A1AA]">Everse</span>
              </span>
              <span className="text-xs text-[#71717A]">
                © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
              </span>
            </div>

            {/* Policy Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#71717A]">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Use
              </a>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#71717A]">
              <span>We accept:</span>
              <div className="flex gap-2">
                {["Visa", "MC", "UPI", "PayPal"].map((method) => (
                  <span
                    key={method}
                    className="px-2 py-0.5 border border-white/20 rounded text-[10px] text-[#A1A1AA]"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
