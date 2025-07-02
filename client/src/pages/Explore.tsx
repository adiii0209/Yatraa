import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { List, Map, Navigation, Utensils, Coffee, Beer, Camera, Ticket, Hotel, Plane, Bus, Star, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import SearchBar from "@/components/SearchBar";
import AttractionCard from "@/components/AttractionCard";
import InteractiveMap from "@/components/InteractiveMap";
import { Button } from "@/components/ui/button";
import { useCityStore } from "@/hooks/useCity";

const exploreCategories = [
  { id: "food-and-drinks", name: "Food & Drinks", icon: Utensils },
  { id: "cafes", name: "Cafes", icon: Coffee },
  { id: "pubs-and-bars", name: "Pubs & Bars", icon: Beer },
  { id: "tourist-spots", name: "Tourist Spots", icon: Camera },
  { id: "entertainment", name: "Entertainment", icon: Ticket },
  { id: "hotels", name: "Hotels", icon: Hotel },
  { id: "flights", name: "Flights", icon: Plane },
  { id: "transport", name: "Transport", icon: Bus },
];

export default function Explore() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedMapLocation, setSelectedMapLocation] = useState<any>(null);
  const { selectedCity } = useCityStore();
  const [, setLocation] = useLocation();

  const { data: attractions = [], isLoading } = useQuery({
    queryKey: ["/api/attractions", selectedCity],
    queryFn: async () => {
      const params = selectedCity ? `?city=${selectedCity}` : "";
      const response = await fetch(`/api/attractions${params}`);
      if (!response.ok) throw new Error("Failed to fetch attractions");
      return response.json();
    }
  });

  // Utility: Shuffle array and pick N items
  function getRandomItems<T>(arr: T[], n: number): T[] {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
  }

  // Show random places from all categories (not just attractions)
  const nearbyPlaces = getRandomItems(attractions,15);

  // Mock nearby attractions - in real app would use geolocation
  const nearbyAttractions = attractions.slice(0, 6);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-600 mb-4">
            Explore {selectedCity} :)
          </h2>
          <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <SearchBar placeholder="Discover amazing places..." city={selectedCity} />
            </div>
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200 min-w-[160px]">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`flex-1 h-9 ${viewMode === "list" ? 'shadow-sm' : ''}`}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className={`flex-1 h-9 ${viewMode === "map" ? 'shadow-sm' : ''}`}
              >
                <Map className="w-4 h-4 mr-2" />
                Map
              </Button>
            </div>
          </div>
        </motion.div>
      {/* Explore Categories Grid */}
      <div className="mt-6 mb-10">
        <div className="mx-auto max-w-2xl">
          <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
            {exploreCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLocation(`/category/${category.id}`)}
                  className="flex flex-col items-center justify-center bg-white rounded-xl group hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10 p-2 sm:p-3 cursor-pointer hover:shadow-md transition-all border border-gray-100 hover:border-primary/40 min-h-[72px] sm:min-h-[90px] w-full backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 mb-1 group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary-700 transition-colors" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-700 text-center leading-tight mt-0.5 group-hover:text-primary-700 transition-colors">
                    {category.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
        
      {/* Content based on view mode */}
      {viewMode === "map" ? (
        <div className="px-4 space-y-4">
          <InteractiveMap
            locations={attractions.map((attraction: any) => ({
              id: attraction.id,
              name: attraction.name,
              category: attraction.category,
              latitude: parseFloat(attraction.latitude || "22.5726"),
              longitude: parseFloat(attraction.longitude || "88.3639"),
              imageUrl: attraction.imageUrl
            }))}
            selectedLocation={selectedMapLocation}
            onLocationSelect={setSelectedMapLocation}
            className="h-64"
          />
          
          {selectedMapLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={selectedMapLocation.imageUrl}
                  alt={selectedMapLocation.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{selectedMapLocation.name}</h4>
                  <p className="text-sm text-gray-600">{selectedMapLocation.category}</p>
                  <Button size="sm" className="mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="px-4">
          <div className="mb-8">
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center whitespace-nowrap truncate">
              <Navigation className="w-5 h-5 mr-2 text-primary" />
              Places to Explore Nearby
            </h3>
            
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : nearbyAttractions.length === 0 ? (
              <div className="text-center py-8">
                <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Attractions Found</h3>
                <p className="text-gray-600">No attractions found in {selectedCity}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyPlaces.map((attraction: any, index: number) => (
                  <motion.div
                    key={attraction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setLocation(`/category/attractions/${attraction.id}`)}
                  >
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/40">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={attraction.imageUrl}
                          alt={attraction.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                            {attraction.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{attraction.name}</h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{attraction.shortDescription || attraction.location}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center text-sm">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="font-medium">{attraction.rating}</span>
                                <span className="text-gray-500 ml-1">({attraction.reviewCount}k)</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors">
                                <MapPin className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
