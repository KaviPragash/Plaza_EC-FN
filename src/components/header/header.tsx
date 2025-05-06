"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import SearchBar from "./searchBar";
import LoginButton from "./loginButton";
import CartButton from "./cartButton";
import MobileSidebarDrawer from "./MobileSidebarDrawer";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="w-full px-4 py-4 bg-white shadow-md relative">
        {/* Mobile: Left hamburger + Right icons */}
        <div className="absolute top-4 left-4 md:hidden z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
            aria-label="Open categories"
          >
            <Menu size={22} />
          </button>
        </div>

        <div className="absolute top-4 right-4 flex md:hidden gap-4 z-10">
          <LoginButton />
          <CartButton />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo (centered on mobile, left on desktop) */}
          <div className="text-2xl font-bold tracking-wide text-gray-800">
            Plaza
          </div>

          <SearchBar />

          <div className="hidden md:flex items-center gap-4">
            <LoginButton />
            <CartButton />
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <MobileSidebarDrawer onClose={() => setSidebarOpen(false)} />
      )}
    </>
  );
}
