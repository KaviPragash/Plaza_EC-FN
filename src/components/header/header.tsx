"use client";

import SearchBar from "./searchBar";
import LoginButton from "./loginButton";
import CartButton from "./cartButton";

export default function Header() {
  return (
    <header className="w-full px-4 py-4 bg-white shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-gray-800">
          Plaza
        </div>

        {/* Search */}
        <SearchBar />

        {/* Right-side buttons */}
        <div className="flex items-center gap-4">
          <LoginButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
