"use client";
import { useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import SearchBar from "./searchBar";
import LoginButton from "./loginButton";
import MobileSidebarDrawer from "./MobileSidebarDrawer";
import CartSidebar from "../cart/CartSidebar";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, cartIconRefDesktop, cartIconRefMobile } = useCart();

  return (
    <>
      <header
        className="w-full py-4 relative shadow-md bg-[#1a1a2e] text-white sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4">
        {/* Mobile: Left hamburger + Right icons */}
        <div className="absolute top-4 left-4 md:hidden z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-200 hover:text-white transition-colors"
            aria-label="Open categories"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Mobile: Login and Cart Icons */}
        <div className="absolute top-4 right-4 flex md:hidden gap-4 z-10">
          <LoginButton />
          <button
            ref={cartIconRefMobile}
            onClick={() => setCartOpen(true)}
            className="relative text-gray-200 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo (centered on mobile, left on desktop) */}
          <div className="text-2xl font-bold tracking-wide text-white md:ml-2">
            Plaza
          </div>

          <SearchBar />

          {/* Desktop: Login and Cart Icons */}
          <div className="hidden md:flex items-center gap-4 md:mr-2">
            <LoginButton />
            <button
              ref={cartIconRefDesktop}
              onClick={() => setCartOpen(true)}
              className="relative text-gray-200 hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <MobileSidebarDrawer onClose={() => setSidebarOpen(false)} />
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}