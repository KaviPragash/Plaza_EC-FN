"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  name?: string;
}

export default function LoginForm({
  onClose,
  switchToRegister,
  onLoginSuccess,
}: {
  onClose: () => void;
  switchToRegister: () => void;
  onLoginSuccess: (userData: UserData) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({}); 

    try {
      const res = await fetch("https://plaza.verveautomation.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message) {
          setErrors({ password: data.message });
        } else {
          setErrors({ password: "Login failed. Please try again." });
        }
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      onLoginSuccess(data.user || { id: data.id, email: data.email, name: data.name });

    } catch (err) {
      console.error("Login error:", err);
      setErrors({ password: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-md p-8 bg-white/80 backdrop-blur-lg text-gray-800 rounded-2xl shadow-2xl border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-600 hover:text-red-600 font-bold transition"
        >
          ×
        </button>

        <div className="flex justify-center -mt-16 mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xl shadow-lg border-4 border-white">
            LOGO
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 focus:ring-2 focus:ring-blue-400 outline-none transition text-sm placeholder-gray-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 focus:ring-2 focus:ring-blue-400 outline-none transition text-sm placeholder-gray-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold shadow-md transition-all"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => {
              onClose();
              switchToRegister();
            }}
            className="text-blue-600 hover:underline"
          >
            Register now
          </button>
        </p>
      </div>
    </div>
  );
}