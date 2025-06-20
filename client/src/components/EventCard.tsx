import { Calendar, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { format, parseISO } from "date-fns";

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

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM dd");
  };

  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), "h:mm a");
  };

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`bg-white rounded-xl shadow-md p-4 cursor-pointer card-hover ${className}`}
      >
        <div className="flex items-start space-x-3">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{event.category}</p>
            <div className="flex items-center text-sm text-primary">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(event.startDate)}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-primary">{event.price}</p>
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
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-40 object-cover"
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
            >
              {event.price === "Free" ? "View Details" : "Book Now"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
