import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { List, Map, Navigation, Utensils, Coffee, Beer, Camera, Ticket, Hotel, Plane, Bus } from "lucide-react";
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

  // Mock nearby attractions - in real app would use geolocation
  const nearbyAttractions = attractions.slice(0, 6);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="space-y-4">
      <div className="px-4 py-3">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-gray-900 mb-4"
        >
          Explore {selectedCity}
        </motion.h2>


        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar placeholder="Search places, attractions..." city={selectedCity} />
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex-1 h-9"
          >
            <List className="w-4 h-4 mr-2" />
            List
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("map")}
            className="flex-1 h-9"
          >
            <Map className="w-4 h-4 mr-2" />
            Map
          </Button>
        </div>
      </div>
      {/* Explore Categories Grid */}
      <div className="mb-4 mt-0">
        <div className="grid grid-cols-4 gap-2 w-full">
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
                className="flex flex-col items-center justify-center bg-white rounded-xl group shadow p-2 sm:p-3 md:p-4 cursor-pointer hover:shadow-lg transition-all border border-gray-100 hover:border-primary/40 min-h-[60px] w-full"
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 mb-2 group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary group-hover:text-primary-700 transition-colors" />
                </div>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 text-center leading-tight mt-1 group-hover:text-primary-700 transition-colors">
                  {category.name}
                </span>
              </motion.div>
            );
          })}
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
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Nearby Attractions</h3>
            
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
              <div className="space-y-3">
                {nearbyAttractions.map((attraction: any, index: number) => (
                  <motion.div
                    key={attraction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-white rounded-xl shadow-md p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={attraction.imageUrl}
                          alt={attraction.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{attraction.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {attraction.category} • {attraction.location}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-primary">
                              <span className="mr-1">⭐</span>
                              <span>{attraction.rating} ({attraction.reviewCount}k)</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Get Directions
                            </Button>
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
  );
}
