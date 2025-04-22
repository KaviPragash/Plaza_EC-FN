"use client";

import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterForm({
  onClose,
  switchToLogin,
}: {
  onClose: () => void;
  switchToLogin: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Minimum 6 characters";
    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert(`Registering: ${form.name}, ${form.email}`);
    // Call backend API here
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
          <div className="w-20 h-20 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-xl shadow-lg border-4 border-white">
            LOGO
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 focus:ring-2 focus:ring-green-400 outline-none transition text-sm placeholder-gray-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 focus:ring-2 focus:ring-green-400 outline-none transition text-sm placeholder-gray-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 focus:ring-2 focus:ring-green-400 outline-none transition text-sm placeholder-gray-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 focus:ring-2 focus:ring-green-400 outline-none transition text-sm placeholder-gray-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2.5 rounded-lg font-semibold shadow-md transition-all"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose();
              switchToLogin();
            }}
            className="text-green-600 hover:underline"
          >
            Login now
          </button>
        </p>
      </div>
    </div>
  );
}
