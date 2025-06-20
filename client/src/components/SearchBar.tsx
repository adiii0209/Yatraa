import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  placeholder?: string;
  onSelect?: (result: any) => void;
  city?: string;
}

export default function SearchBar({ 
  placeholder = "Search attractions, food, events...", 
  onSelect,
  city 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { data: searchResults = [] } = useQuery({
    queryKey: ["/api/attractions/search", query, city],
    enabled: query.length > 2,
    queryFn: async () => {
      const params = new URLSearchParams({ q: query });
      if (city) params.append("city", city);
      const response = await fetch(`/api/attractions/search?${params}`);
      if (!response.ok) throw new Error("Search failed");
      return response.json();
    }
  });

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowResults(value.length > 2);
  };

  const handleSelect = (result: any) => {
    setQuery(result.name);
    setShowResults(false);
    onSelect?.(result);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          onFocus={() => query.length > 2 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
      </div>

      <AnimatePresence>
        {showResults && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto"
          >
            {searchResults.slice(0, 5).map((result: any) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result)}
                className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={result.imageUrl}
                    alt={result.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{result.name}</h4>
                    <p className="text-xs text-gray-600">{result.category} • {result.city}</p>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
