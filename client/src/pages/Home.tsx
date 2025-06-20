import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import HorizontalScroll from "@/components/HorizontalScroll";
import AttractionCard from "@/components/AttractionCard";
import { Church, Utensils, Calendar, ShoppingBag } from "lucide-react";
import { useCityStore } from "@/hooks/useCity";

const categories = [
  {
    name: "Attractions",
    description: "Historic sites & monuments",
    icon: Church,
    gradient: "gradient-blue"
  },
  {
    name: "Food & Drinks",
    description: "Bengali cuisine",
    icon: Utensils,
    gradient: "gradient-green"
  },
  {
    name: "Cultural Events",
    description: "Festivals & programs",
    icon: Calendar,
    gradient: "gradient-purple"
  },
  {
    name: "Shopping",
    description: "Markets & crafts",
    icon: ShoppingBag,
    gradient: "gradient-orange"
  }
];

export default function Home() {
  const { selectedCity } = useCityStore();

  const { data: trendingAttractions = [], isLoading: loadingTrending } = useQuery({
    queryKey: ["/api/attractions/trending", selectedCity],
    queryFn: async () => {
      const params = selectedCity ? `?city=${selectedCity}` : "";
      const response = await fetch(`/api/attractions/trending${params}`);
      if (!response.ok) throw new Error("Failed to fetch trending attractions");
      return response.json();
    }
  });

  const { data: featuredAttractions = [], isLoading: loadingFeatured } = useQuery({
    queryKey: ["/api/attractions/featured", selectedCity],
    queryFn: async () => {
      const params = selectedCity ? `?city=${selectedCity}` : "";
      const response = await fetch(`/api/attractions/featured${params}`);
      if (!response.ok) throw new Error("Failed to fetch featured attractions");
      return response.json();
    }
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="px-4 py-3 bg-white">
        <SearchBar city={selectedCity} />
      </div>

      {/* Hero Section */}
      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-48 rounded-2xl overflow-hidden shadow-lg"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold mb-1">Discover West Bengal</h2>
            <p className="text-sm opacity-90">Rich culture, heritage & natural beauty</p>
          </div>
        </motion.div>
      </div>

      {/* Trending Now Section */}
      <div className="space-y-3">
        <div className="px-4">
          <h3 className="text-lg font-semibold text-gray-900">Trending Now</h3>
        </div>
        
        {loadingTrending ? (
          <div className="px-4">
            <div className="flex space-x-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-64 h-40 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <HorizontalScroll className="px-4">
            {trendingAttractions.map((attraction: any, index: number) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AttractionCard 
                  attraction={attraction} 
                  variant="compact"
                />
              </motion.div>
            ))}
          </HorizontalScroll>
        )}
      </div>

      {/* Categories Grid */}
      <div className="px-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Explore Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${category.gradient} rounded-xl p-4 text-white cursor-pointer`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <h4 className="font-semibold text-sm mb-1">{category.name}</h4>
                <p className="text-xs opacity-90">{category.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured Attractions */}
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Featured Attractions</h3>
          <button className="text-primary text-sm font-medium">View All</button>
        </div>
        
        {loadingFeatured ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {featuredAttractions.map((attraction: any, index: number) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AttractionCard 
                  attraction={attraction} 
                  variant="horizontal"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
