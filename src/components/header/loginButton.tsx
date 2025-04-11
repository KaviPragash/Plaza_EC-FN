import { User } from "lucide-react";

export default function LoginButton() {
  const handleLogin = () => {
    console.log("Login clicked"); 
  };

  return (
    <button
      onClick={handleLogin}
      className="p-2 rounded-full hover:bg-gray-100"
    >
      <User size={20} className="text-gray-700" />
    </button>
  );
}

