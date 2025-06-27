import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Share2,
  Bookmark,
  Users,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function EventDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const { data: event, isLoading } = useQuery({
    queryKey: [`/api/events/${id}`],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/events/${id}`);
      if (!response.ok) throw new Error("Failed to fetch event");
      return response.json();
    }
  });

  const handleBooking = () => {
    if (event?.isBookable) {
      toast({
        title: "Booking Initiated",
        description: "Redirecting to booking platform...",
      });
    } else {
      toast({
        title: "Event Information",
        description: "This is a free event, no booking required!",
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Event link copied to clipboard",
      });
    }
  };

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

  if (!event) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Not Found</h3>
          <p className="text-gray-600">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const eventDate = parseISO(event.startDate);
  const endDate = event.endDate ? parseISO(event.endDate) : undefined;

  return (
    <div className="pb-6">
      {/* Header Image */}
      <div className="relative h-64 bg-gray-200">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Navigation Bar */}
        <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setLocation("/events")}
            className="bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current text-primary" : ""}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleShare}
              className="bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 space-y-6 pt-6">
        {/* Title & Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{event.title}</h1>
          <div className="flex items-center space-x-3 text-gray-700 text-sm">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{format(eventDate, "dd MMM yyyy")}
              {endDate && ` - ${format(endDate, "dd MMM yyyy")}`}
            </span>
            <Clock className="w-5 h-5 text-primary ml-4" />
            <span>{event.startDate && event.endDate && event.startDate !== event.endDate && endDate
              ? `${format(eventDate, "hh:mm a")} - ${format(endDate, "hh:mm a")}`
              : event.startDate ? format(eventDate, "hh:mm a") : ""}
            </span>
            <MapPin className="w-5 h-5 text-primary ml-4" />
            <span>{event.venue}</span>
          </div>
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="flex items-center space-x-2"
        >
          <Tag className="w-5 h-5 text-primary" />
          <span className="text-gray-700">Price</span>
          <span className={`font-bold text-lg ${event.price === "Free" ? "text-green-600" : "text-primary"}`}>
            {event.price}
          </span>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-gray-900">About This Event</h2>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </motion.div>

        {/* Organizer Info */}
        {event.organizer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-gray-900">Organizer</h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{event.organizer}</p>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex space-x-3 pt-4"
        >
          <Button 
            onClick={handleBooking}
            className="flex-1"
            size="lg"
          >
            {event.isBookable ? (
              event.price === "Free" ? "Get Free Ticket" : "Book Now"
            ) : (
              "View Details"
            )}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-6"
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}`, '_blank')}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Directions
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 rounded-xl p-4"
        >
          <h3 className="font-semibold text-blue-900 mb-2">Event Guidelines</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Please arrive 30 minutes before the event</li>
            <li>• Follow all COVID-19 safety protocols</li>
            <li>• Photography may be restricted during performance</li>
            <li>• Contact organizer for any special requirements</li>
          </ul>
        </motion.div>
      </div>

      {/* Fixed Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
        <Button
          className="w-full"
          size="lg"
          onClick={handleBooking}
        >
          {event.isBookable ? `Book Now - ${event.price}` : "Free Entry"}
        </Button>
      </div>
    </div>
  );
}
