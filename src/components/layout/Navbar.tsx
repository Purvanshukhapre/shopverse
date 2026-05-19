"use client";

import Link from "next/link";
import {
  IconMapPin,
  IconUser,
  IconHeart,
  IconShoppingCart,
  IconLayoutGrid,
  IconChevronDown,
} from "@tabler/icons-react";

const Navbar = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Topbar */}
      <div className="flex h-9 items-center justify-between border-b border-gray-200 bg-gray-50 px-6">
        <div className="flex items-center gap-5">
          <Link
            href="#"
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.5px] text-gray-500 transition hover:text-black"
          >
            <IconMapPin size={13} />
            Deliver to Mumbai 400001
          </Link>

          <Link
            href="#"
            className="text-[11px] font-bold uppercase tracking-[0.5px] text-gray-500 transition hover:text-black"
          >
            Sell on ShopEverse
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="#"
            className="text-[11px] font-bold uppercase tracking-[0.5px] text-gray-500 transition hover:text-black"
          >
            Customer Service
          </Link>

          <Link
            href="#"
            className="text-[11px] font-bold uppercase tracking-[0.5px] text-gray-500 transition hover:text-black"
          >
            Track Order
          </Link>
        </div>
      </div>

      {/* Mainbar */}
      <div className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white/95 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-[22px] font-black tracking-[-1px] text-black"
        >
          Shop<span className="text-red-600">Everse</span>
        </Link>

        {/* Search */}
        <div className="mx-auto flex h-11 w-full max-w-[520px] cursor-pointer items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 transition-all hover:border-gray-400 hover:bg-white">
          <IconLayoutGrid size={16} className="text-black" />

          <span className="flex-1 text-[13px] font-medium text-gray-400">
            Search the ShopEverse ecosystem...
          </span>

          <span className="rounded border border-gray-200 bg-white px-1.5 py-[1px] text-[10px] font-extrabold text-gray-400">
            ⌘
          </span>

          <span className="rounded border border-gray-200 bg-white px-1.5 py-[1px] text-[10px] font-extrabold text-gray-400">
            K
          </span>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1.5">
          {/* Account */}
          <Link href="/account" className="flex h-[42px] w-[42px] items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100 hover:text-black">
            <IconUser size={20} />
          </Link>
          
          <div className="mx-1 h-7 w-px bg-gray-200"></div>
          
          {/* Wishlist */}
          <Link href="/wishlist" className="relative flex h-[42px] w-[42px] items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100 hover:text-black">
            <IconHeart size={20} />
          
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
              3
            </span>
          </Link>
          
          {/* Cart */}
          <Link href="/cart" className="relative flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-black text-white transition hover:bg-neutral-900">
            <IconShoppingCart size={20} />
          
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white">
              5
            </span>
          </Link>
        </div>
      </div>

      {/* Category Bar */}
      <div className="flex h-11 items-center gap-1 border-t border-gray-100 bg-white px-6">
        <Link href="/categories" className="flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-[11px] font-extrabold uppercase tracking-[0.6px] text-black transition hover:bg-gray-100">
          <IconLayoutGrid size={14} />
          All Categories
          <IconChevronDown size={13} />
        </Link>

        <div className="mx-1 h-7 w-px bg-gray-200"></div>

        {[
          "Fashion",
          "Electronics",
          "Home",
          "Beauty",
          "Sports",
          "Grocery",
          "Toys",
        ].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="flex h-9 items-center rounded-lg px-3.5 text-[11px] font-extrabold uppercase tracking-[0.6px] text-gray-600 transition hover:bg-gray-100 hover:text-black"
          >
            {item}
          </Link>
        ))}

        {/* Flash Deals */}
        <Link href="/deals" className="ml-auto flex h-8 items-center gap-2 rounded-full px-3.5 text-[11px] font-black uppercase tracking-[0.8px] text-red-600 transition hover:bg-red-50">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-600"></span>
          Flash Deals
        </Link>
      </div>
    </div>
  );
};

export default Navbar;