import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Star, MapPin, Clock } from "lucide-react";
import { useCityStore } from "@/hooks/useCity";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

interface CategoryItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating?: string;
  reviewCount?: number;
  location?: string;
  openHours?: string;
  category?: string;
  price?: string;
  priceRange?: string;
  cuisine?: string;
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { selectedCity } = useCityStore();
  const [_, setLocation] = useLocation();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["/api/categories", category, selectedCity],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCity) params.append("city", selectedCity);
      const response = await fetch(`/api/categories/${category}?${params}`);
      if (!response.ok) throw new Error("Failed to fetch category items");
      return response.json();
    },
  });

  const getCategoryTitle = (category: string) => {
    return category.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse p-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-4"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              className="mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {getCategoryTitle(category)}
            </h1>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item: CategoryItem) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setLocation(`/category/${category}/${item.id}`)}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {item.rating && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">
                          {item.rating} ({item.reviewCount} reviews)
                        </span>
                      </div>
                    )}

                    {item.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {item.location}
                        </span>
                      </div>
                    )}

                    {item.openHours && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {item.openHours}
                        </span>
                      </div>
                    )}

                    {/* Additional info based on category type */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.category && (
                        <Badge variant="secondary">{item.category}</Badge>
                      )}
                      {item.cuisine && (
                        <Badge variant="secondary">{item.cuisine}</Badge>
                      )}
                      {item.priceRange && (
                        <Badge variant="secondary">{item.priceRange}</Badge>
                      )}
                      {item.price && (
                        <Badge variant="secondary">{item.price}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}