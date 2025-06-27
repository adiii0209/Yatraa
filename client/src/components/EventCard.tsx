import { Calendar, MapPin, Clock, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { format, parseISO } from "date-fns";
import { useCallback, useMemo } from "react";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    description: string;
    category: string;
    city: string;
    venue: string;
    imageUrl: string;
    startDate: string;
    endDate?: string;
    price: string;
    isBookable: boolean;
    organizer: string;
    attendees?: number;
    rating?: number;
    highlights?: string[];
    tags?: string[];
  };
  variant?: "default" | "compact";
  className?: string;
}

export default function EventCard({ 
  event, 
  variant = "default",
  className = "" 
}: EventCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/event/${event.id}`);
  };

  const formatDate = useCallback((dateString: string) => {
    return format(parseISO(dateString), "MMM dd");
  }, []);

  const formatTime = useCallback((dateString: string) => {
    return format(parseISO(dateString), "h:mm a");
  }, []);

  const renderRating = useCallback((rating: number = 0) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  }, []);

  if (variant === "compact") {
    return (
      <div
        className={`bg-white rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow ${className}`}
        onClick={handleClick}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        role="article"
        tabIndex={0}
        aria-label={`${event.title} event at ${event.venue}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = '/placeholder-event.jpg';
                img.onerror = null;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">{event.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-500">{formatTime(event.startDate)}</span>
            </div>
            {event.rating && <div className="mt-1">{renderRating(event.rating)}</div>}
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer card-hover ${className}`}
      role="article"
      tabIndex={0}
      aria-label={`${event.title} event at ${event.venue}`}
    >
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-40 object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = '/placeholder-event.svg';
          e.currentTarget.alt = 'Event image placeholder';
        }}
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-primary">{formatDate(event.startDate)}</p>
            <p className="text-xs text-gray-500">{format(parseISO(event.startDate), "yyyy")}</p>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.venue}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold ${
            event.price === "Free" ? "text-green-600" : "text-primary"
          }`}>
            {event.price}
          </span>
          {event.isBookable && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                // Handle booking
              }}
              aria-label={event.price === "Free" ? "View event details" : "Book event now"}
            >
              {event.price === "Free" ? "View Details" : "Book Now"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
