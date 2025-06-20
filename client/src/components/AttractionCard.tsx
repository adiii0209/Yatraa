import { Star, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";

interface AttractionCardProps {
  attraction: {
    id: number;
    name: string;
    shortDescription: string;
    category: string;
    city: string;
    imageUrl: string;
    rating: string;
    reviewCount: number;
    entryFee: string;
    location: string;
  };
  variant?: "horizontal" | "vertical" | "compact";
  className?: string;
}

export default function AttractionCard({ 
  attraction, 
  variant = "vertical",
  className = "" 
}: AttractionCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/attraction/${attraction.id}`);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (variant === "horizontal") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer card-hover ${className}`}
      >
        <div className="flex">
          <img
            src={attraction.imageUrl}
            alt={attraction.name}
            className="w-24 h-20 object-cover"
          />
          <div className="flex-1 p-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-900 mb-1">
                  {attraction.name}
                </h4>
                <p className="text-xs text-gray-600 mb-1">
                  {attraction.category} • {attraction.city}
                </p>
                <div className="flex items-center text-xs text-primary">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  <span>{attraction.rating} ({attraction.reviewCount}k)</span>
                  <span className="mx-2">•</span>
                  <span>{attraction.entryFee}</span>
                </div>
              </div>
              <button
                onClick={toggleFavorite}
                className="ml-2 p-1"
              >
                <Heart 
                  className={`w-4 h-4 transition-colors ${
                    isFavorite ? "text-red-500 fill-current" : "text-gray-400"
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer card-hover ${className}`}
      >
        <img
          src={attraction.imageUrl}
          alt={attraction.name}
          className="w-full h-32 object-cover"
        />
        <div className="p-3">
          <h4 className="font-semibold text-sm text-gray-900 mb-1">
            {attraction.name}
          </h4>
          <p className="text-xs text-gray-600 mb-2">
            {attraction.shortDescription}
          </p>
          <div className="flex items-center text-xs text-primary">
            <Star className="w-3 h-3 mr-1 fill-current" />
            <span>{attraction.rating} ({attraction.reviewCount}k reviews)</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer card-hover ${className}`}
    >
      <div className="relative">
        <img
          src={attraction.imageUrl}
          alt={attraction.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite ? "text-red-500 fill-current" : "text-gray-600"
            }`} 
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{attraction.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{attraction.shortDescription}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-primary">
            <Star className="w-4 h-4 mr-1 fill-current" />
            <span>{attraction.rating} ({attraction.reviewCount}k)</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{attraction.city}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
