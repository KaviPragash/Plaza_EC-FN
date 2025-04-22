"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogIn, UserPlus } from "lucide-react";
import LoginForm from "@/app/auth/pages/LoginForm";
import RegisterForm from "@/app/auth/pages/RegisterForm";

export default function LoginButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors"
        >
          <User size={22} className="text-gray-700" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 animate-fade-in">
            <ul className="flex flex-col text-sm text-gray-700">
              <li>
                <button
                  onClick={() => {
                    setModal("login");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <LogIn size={16} /> Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setModal("register");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <UserPlus size={16} /> Register
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {modal === "login" && (
        <LoginForm
          onClose={() => setModal(null)}
          switchToRegister={() => setModal("register")}
        />
      )}
      {modal === "register" && (
        <RegisterForm
          onClose={() => setModal(null)}
          switchToLogin={() => setModal("login")}
        />
      )}
    </>
  );
}
