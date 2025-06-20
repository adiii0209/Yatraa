import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { List, Map, Navigation } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import AttractionCard from "@/components/AttractionCard";
import InteractiveMap from "@/components/InteractiveMap";
import { Button } from "@/components/ui/button";
import { useCityStore } from "@/hooks/useCity";

export default function Explore() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedMapLocation, setSelectedMapLocation] = useState<any>(null);
  const { selectedCity } = useCityStore();

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
