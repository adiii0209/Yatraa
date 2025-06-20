import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AttractionCard from "./AttractionCard";
import EventCard from "./EventCard";
import { fadeInUp, staggerChildren } from "@/lib/animations";

interface SearchResultsProps {
  query: string;
  city?: string;
  onBack: () => void;
}

export default function SearchResults({ query, city, onBack }: SearchResultsProps) {
  const { data: attractions = [], isLoading: attractionsLoading } = useQuery({
    queryKey: ['/api/attractions/search', { query, city }],
    queryFn: async () => {
      const params = new URLSearchParams({ query });
      if (city) params.append('city', city);
      
      const response = await fetch(`/api/attractions/search?${params}`);
      return response.json();
    }
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['/api/events/search', { query, city }],
    queryFn: async () => {
      const params = new URLSearchParams({ query });
      if (city) params.append('city', city);
      
      const response = await fetch(`/api/events/search?${params}`);
      return response.json();
    }
  });

  const totalResults = attractions.length + events.length;
  const isLoading = attractionsLoading || eventsLoading;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Search Results</h1>
                  <p className="text-sm text-gray-600 flex items-center">
                    "{query}" {city && (
                      <>
                        <span className="mx-1">in</span>
                        <MapPin className="w-3 h-3 mr-1" />
                        {city}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <Badge variant="outline">
              {totalResults} results
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-32 animate-pulse" />
            ))}
          </div>
        ) : totalResults === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try different keywords or explore popular destinations
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Attractions */}
            {attractions.length > 0 && (
              <motion.div variants={fadeInUp}>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  Attractions ({attractions.length})
                </h2>
                <div className="space-y-4">
                  {attractions.map((attraction: any) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                      variant="horizontal"
                      className="hover:shadow-lg transition-shadow duration-200"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Events */}
            {events.length > 0 && (
              <motion.div variants={fadeInUp}>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🎪</span>
                  Events ({events.length})
                </h2>
                <div className="space-y-4">
                  {events.map((event: any) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      variant="compact"
                      className="hover:shadow-lg transition-shadow duration-200"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}