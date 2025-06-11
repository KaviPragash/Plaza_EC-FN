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
          <a href="#" className="hover:text-blue-600 transition-colors duration-200">Home</a>
          <a href="#" className="hover:text-blue-600 transition-colors duration-200">Shop</a>
          <a href="#" className="hover:text-blue-600 transition-colors duration-200">About Us</a>
          <a href="#" className="hover:text-blue-600 transition-colors duration-200">Contact</a>
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
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Powered By Section */}
      <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-gray-200 text-center">
        <div className="inline-block group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
          <p className="text-sm text-gray-600 relative z-10 tracking-wide">
            <span className="text-gray-400 font-light">Powered by</span>{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-500 cursor-pointer hover:scale-110 inline-block transform hover:-translate-y-0.5 hover:drop-shadow-sm">
              verve automation
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}