import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            PZ
          </div>
          <p className="text-sm text-gray-700 max-w-xs">
            Plaza is your one-stop destination for trending tech, fashion, and lifestyle products — all handpicked to elevate your everyday.
          </p>
        </div>

        {/* Links Column */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Shop</a>
          <a href="#" className="hover:text-blue-600">About Us</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold mb-2">Newsletter</h3>
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-800"
            disabled
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled
          >
            Subscribe
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-gray-700">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
