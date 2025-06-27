import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttractionCard from "@/components/AttractionCard";
import { useCityStore } from "@/hooks/useCity";
import { useEffect } from "react";

export default function CategoryItems() {
  const [match] = useRoute("/category/:category");
  const category = typeof match === "object" && match !== null && "category" in match ? (match as any).category : "";
  const { selectedCity } = useCityStore();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["/api/categories", category, selectedCity],
    queryFn: async () => {
      const params = selectedCity ? `?city=${selectedCity}` : "";
      const response = await fetch(`/api/categories/${category}${params}`);
      if (!response.ok) throw new Error(`Failed to fetch ${category} items`);
      return response.json();
    },
  });

  const getCategoryTitle = (category: string) => {
    const titles: { [key: string]: string } = {
      "food-drinks": "Food & Drinks",
      "entertainment-and-activities": "Entertainment and Activities",
      "shopping": "Shopping Places",
      "historical": "Historical Places",
      "nature": "Nature Spots"
    };
    return titles[category] || category;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {getCategoryTitle(category)}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No {getCategoryTitle(category).toLowerCase()} found
              {selectedCity ? ` in ${selectedCity}` : ""}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AttractionCard
                  attraction={item}
                  variant="vertical"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}