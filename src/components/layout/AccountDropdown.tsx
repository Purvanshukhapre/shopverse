import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogIn, LogOut, Settings, UserCircle, ChevronDown, ShoppingCart, Heart, Package, Award } from "lucide-react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

interface AccountDropdownProps {
  onLoginClick?: () => void;
}

export default function AccountDropdown({ onLoginClick }: AccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
        aria-label="Account"
      >
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
          {isAuthenticated ? (
            <UserCircle className="w-5 h-5 text-[#555555] group-hover:text-[#111111]" />
          ) : (
            <User className="w-5 h-5 text-[#555555] group-hover:text-[#111111]" />
          )}
        </div>
        <span className="hidden lg:block text-left">
          <span className="block text-[10px] text-[#777777] font-bold uppercase tracking-tight leading-none mb-1">
            {isAuthenticated ? 'Account' : 'Account'}
          </span>
          <span className="text-xs font-black text-[#111111] flex items-center gap-0.5">
            {isAuthenticated ? (
              <>
                {user?.name || 'My Account'} <ChevronDown className="w-3 h-3" />
              </>
            ) : (
              <>
                Sign In <ChevronDown className="w-3 h-3" />
              </>
            )}
          </span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            {isAuthenticated ? (
              <div className="py-2">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-[#555555]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-[#111111] truncate">{user?.name || 'My Account'}</p>
                      <p className="text-xs text-[#555555] truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Account Menu Items */}
                <Link 
                  href="/account" 
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[#111111] hover:bg-gray-50 hover:text-[#DC2626] transition-colors"
                >
                  <User className="w-4 h-4" />
                  My Account
                </Link>
                <Link 
                  href="/orders" 
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[#111111] hover:bg-gray-50 hover:text-[#DC2626] transition-colors"
                >
                  <Package className="w-4 h-4" />
                  Orders
                </Link>
                <Link 
                  href="/wishlist" 
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[#111111] hover:bg-gray-50 hover:text-[#DC2626] transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                </Link>
                <Link 
                  href="/account/settings" 
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[#111111] hover:bg-gray-50 hover:text-[#DC2626] transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Account Settings
                </Link>
                
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="py-2">
                {/* Login Option */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onLoginClick) {
                      onLoginClick();
                    } else {
                      window.location.href = '/auth/login';
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#111111] hover:bg-gray-50 hover:text-[#DC2626] transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
                
                {/* Signup Option */}
                <Link 
                  href="/auth/signup" 
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#111111] hover:bg-gray-50 hover:text-[#DC2626] transition-colors"
                >
                  <User className="w-4 h-4" />
                  Create Account
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}