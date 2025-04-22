"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "login";

  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "register" && form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert(`${type === "login" ? "Logging in" : "Registering"} with email: ${form.email}`);
  };

  const toggleForm = () => {
    router.push(`/auth?type=${type === "login" ? "register" : "login"}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {type === "login" ? "Login to Your Account" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md"
          />
          {type === "register" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleForm} className="text-blue-600 hover:underline">
            {type === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
