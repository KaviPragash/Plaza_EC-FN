import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="w-full md:w-[400px] relative">
      <input
        type="text"
        placeholder="Hinted search text"
        className="w-full px-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
      />
      <Search
        size={18}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}
