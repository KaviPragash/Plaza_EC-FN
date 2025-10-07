"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogIn, UserPlus, LogOut } from "lucide-react";
import LoginForm from "@/app/auth/pages/LoginForm";
import RegisterForm from "@/app/auth/pages/RegisterForm";

interface UserData {
  id: string;
  email: string;
  name?: string;
}

export default function LoginButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "U";

    if (name.includes("@")) {
      return name.charAt(0).toUpperCase();
    }

    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = (userData: UserData) => {
    setUser(userData);
    setModal(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="p-2 rounded-full">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={`relative p-2 rounded-full transition-all duration-300 ${user
              ? "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              : "hover:bg-blue-100 text-gray-700"
            }`}
        >
          {user ? (
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-sm font-bold animate-fade-in">
                {getInitials(user.name || user.email)}
              </span>
            </div>
          ) : (
            <User size={22} />
          )}

          {user && (
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 animate-fade-in">
            {user ? (
              <div>
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <ul className="flex flex-col text-sm text-gray-700">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>

      {modal === "login" && (
        <LoginForm
          onClose={() => setModal(null)}
          switchToRegister={() => setModal("register")}
          onLoginSuccess={handleSuccessfulLogin}
        />
      )}
      {modal === "register" && (
        <RegisterForm
          onClose={() => setModal(null)}
          switchToLogin={() => setModal("login")}
          onRegisterSuccess={handleSuccessfulLogin}
        />
      )}
    </>
  );
}