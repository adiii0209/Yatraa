import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Navigation } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCityStore } from "@/hooks/useCity";
import { cities } from "@/data/cities";

interface CitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CitySelector({ isOpen, onClose }: CitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedCity, setSelectedCity } = useCityStore();

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    onClose();
  };

  const handleLocationAccess = () => {
    // In a real app, this would use the geolocation API
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        // Mock logic - in reality you'd reverse geocode the coordinates
        setSelectedCity("Kolkata");
        onClose();
      },
      (error) => {
        console.error("Location access denied:", error);
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Select City</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <Button
            onClick={handleLocationAccess}
            variant="outline"
            className="w-full flex items-center space-x-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Use Current Location</span>
          </Button>

          <div className="max-h-64 overflow-y-auto space-y-2">
            <AnimatePresence>
              {filteredCities.map((city, index) => (
                <motion.button
                  key={city.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCitySelect(city.name)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 hover:border-primary hover:bg-primary/5 ${
                    selectedCity === city.name 
                      ? "border-primary bg-primary/10" 
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{city.name}</h3>
                      <p className="text-sm text-gray-600">{city.description}</p>
                    </div>
                    {selectedCity === city.name && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
