"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function LoginForm({
  onClose,
  switchToRegister,
}: {
  onClose: () => void;
  switchToRegister: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert(`Logging in with email: ${email}`);
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

        {/* Logo */}
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
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2.5 rounded-lg font-semibold shadow-md transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
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
