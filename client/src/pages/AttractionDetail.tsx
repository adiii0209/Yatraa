import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation,
  Heart,
  Share2,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function AttractionDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: item, isLoading } = useQuery({
    queryKey: [`/api/categories/item/${id}`],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/categories/item/${id}`);
      if (!response.ok) throw new Error("Failed to fetch item");
      return response.json();
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-64 bg-gray-200 animate-pulse" />
        <div className="px-4 space-y-3">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Item Not Found</h3>
          <p className="text-gray-600">The item you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      {/* Header Image */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/placeholder-attraction.jpg';
            img.onerror = null;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Navigation Bar */}
        <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setLocation("/")}
            className="bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current text-red-500" : ""}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-6">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-4"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h1>
          <p className="text-gray-600 mb-3">{item.shortDescription}</p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
              <span className="font-semibold">{item.rating}</span>
              <span className="text-gray-600 ml-1">({item.reviewCount}k reviews)</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{item.city}</span>
            </div>
          </div>
          {item.entryFee && item.openHours && (
            <div className="bg-primary/10 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold">Entry Fee: {item.entryFee}</span>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{item.openHours}</span>
                </div>
              </div>
            </div>
          )}
          {/* Action Buttons - moved here */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex space-x-3"
          >
            <Button className="flex-1">
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
            <Button 
              className="flex-1 bg-primary text-white hover:bg-primary/90 transition-colors" 
              onClick={() => setLocation(`/book/${item.id}`)}
            >
              Book Tour
            </Button>
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-gray-900">About</h2>
          <p className="text-gray-700 leading-relaxed">{item.description}</p>
        </motion.div>

        {/* Location & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-gray-900">Location & Contact</h2>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Address</p>
                <p className="text-gray-600 text-sm">{item.location}</p>
              </div>
            </div>
            {item.latitude && item.longitude && (
              <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Interactive map coming soon</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-gray-600">Reviews feature coming soon!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
