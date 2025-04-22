
import { Suspense } from "react";
import AuthPageClient from "./AuthPageClient";

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <AuthPageClient />
    </Suspense>
  );
}
