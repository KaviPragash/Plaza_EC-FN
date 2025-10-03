"use client";

import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  name?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RegisterForm({
  onClose,
  switchToLogin,
  onRegisterSuccess,
}: {
  onClose: () => void;
  switchToLogin: () => void;
  onRegisterSuccess: (userData: UserData) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email.trim(),
          full_name: form.name.trim(),
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message) {
          if (data.message.toLowerCase().includes('email')) {
            setErrors({ email: data.message });
          } else if (data.message.toLowerCase().includes('password')) {
            setErrors({ password: data.message });
          } else {
            setErrors({ email: data.message });
          }
        } else {
          setErrors({ email: "Registration failed. Please try again." });
        }
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user || data.id) {
        const userData: UserData = {
          id: data.user?.id || data.id,
          email: data.user?.email || form.email,
          name: data.user?.name || data.user?.full_name || form.name
        };

        onRegisterSuccess(userData);
      } else {
        await autoLogin();
      }

    } catch (err) {
      console.error("Registration error:", err);
      setErrors({ email: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const autoLogin = async () => {
    try {
      const loginRes = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        if (loginData.token) {
          localStorage.setItem("token", loginData.token);
        }

        const userData: UserData = {
          id: loginData.user?.id || loginData.id,
          email: loginData.user?.email || form.email,
          name: loginData.user?.name || loginData.user?.full_name || form.name
        };

        onRegisterSuccess(userData);
      } else {
        onClose();
      }
    } catch (err) {
      console.error("Auto-login error:", err);
      onClose();
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
          <div className="w-20 h-20 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-xl shadow-lg border-4 border-white">
            LOGO
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 focus:ring-2 focus:ring-green-400 outline-none transition text-sm placeholder-gray-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>

          <div>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 focus:ring-2 focus:ring-green-400 outline-none transition text-sm text-gray-700"
            >
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold shadow-md transition-all"
          >
            {loading ? "Creating Account..." : "Register"}
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
