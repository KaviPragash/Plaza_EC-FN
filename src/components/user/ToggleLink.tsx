
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ToggleLink() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "register" ? "register" : "login";

  const toggle = () => {
    router.push(`/auth?mode=${mode === "login" ? "register" : "login"}`);
  };

  return (
    <p className="text-center text-sm mt-4 text-gray-600">
      {mode === "login" ? "Don't have an account?" : "Already have an account?"}
      <button onClick={toggle} className="ml-1 text-blue-600 hover:underline">
        {mode === "login" ? "Register" : "Login"}
      </button>
    </p>
  );
}
