import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, MapPin, Star, Clock, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AttractionCard from "./AttractionCard";
import { fadeInUp, staggerChildren } from "@/lib/animations";

interface CategoryListProps {
  category: string;
  city?: string;
  onBack: () => void;
}

const categoryIcons: Record<string, string> = {
  "Historical": "🏛️",
  "Religious": "🛕",
  "Natural": "🌿",
  "Cultural": "🎭",
  "Adventure": "🏔️",
  "Museums": "🏛️",
  "Parks": "🌳",
  "Beaches": "🏖️",
  "Shopping": "🛍️",
  "Food": "🍽️"
};

export default function CategoryList({ category, city, onBack }: CategoryListProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const { data: attractions = [], isLoading } = useQuery({
    queryKey: ['/api/attractions', { category, city }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (city) params.append('city', city);
      if (category) params.append('category', category);
      
      const response = await fetch(`/api/attractions?${params}`);
      return response.json();
    }
  });

  const filteredAttractions = attractions.filter((attraction: any) => 
    attraction.category === category
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{categoryIcons[category] || "📍"}</span>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{category}</h1>
                  {city && (
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {city}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Badge variant="outline">
              {filteredAttractions.length} places
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-32 animate-pulse" />
            ))}
          </div>
        ) : filteredAttractions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {category.toLowerCase()} attractions found
            </h3>
            <p className="text-gray-600">
              {city ? `Try exploring other categories in ${city}` : "Try selecting a different city"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredAttractions.map((attraction: any, index: number) => (
              <motion.div key={attraction.id} variants={fadeInUp}>
                <AttractionCard
                  attraction={attraction}
                  variant="horizontal"
                  className="hover:shadow-lg transition-shadow duration-200"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}