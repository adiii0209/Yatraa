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
    openingHours?: string;
    contactNumber?: string;
    website?: string;
    bookingUrl?: string;
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
    setLocation(`/category/attractions/${attraction.id}`);
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
        className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer card-hover group ${className}`}
        role="article"
        tabIndex={0}
        aria-label={`${attraction.name} in ${attraction.city}`}
      >
        <div className="flex h-28">
          <div className="relative w-32 h-full overflow-hidden">
            <img
              src={attraction.imageUrl}
              alt={attraction.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = '/placeholder-attraction.jpg';
                img.onerror = null;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-gray-900 line-clamp-1">
                  {attraction.name}
                </h4>
                <button
                  onClick={toggleFavorite}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1">{attraction.city}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs">
                <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                <span className="font-medium">{attraction.rating}</span>
                <span className="text-gray-500 ml-1">({attraction.reviewCount}k reviews)</span>
              </div>
              <span className="text-xs font-medium text-primary">{attraction.entryFee}</span>
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
        className={`flex-shrink-0 w-72 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer card-hover group ${className}`}
        role="article"
        tabIndex={0}
        aria-label={`${attraction.name} in ${attraction.city}`}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={attraction.imageUrl}
            alt={attraction.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/placeholder-attraction.jpg';
              img.onerror = null;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90 transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
            />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-gray-900 line-clamp-1">
              {attraction.name}
            </h4>
            <div className="flex items-center text-xs whitespace-nowrap">
              <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
              <span className="font-medium">{attraction.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{attraction.city}</span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2 min-h-[2.5rem]">
            {attraction.shortDescription}
          </p>
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
