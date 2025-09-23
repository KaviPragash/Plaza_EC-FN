
"use client";

import { useState } from "react";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${mode === "login" ? "Logging in" : "Registering"} with`, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-center mb-4">
        {mode === "login" ? "Welcome Back" : "Create an Account"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        {mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
