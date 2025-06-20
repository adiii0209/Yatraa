import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ZoomIn, ZoomOut, MapPin, Navigation, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface MapLocation {
  id: number;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
}

interface RealInteractiveMapProps {
  locations: MapLocation[];
  selectedLocation?: MapLocation | null;
  onLocationSelect?: (location: MapLocation) => void;
  className?: string;
}

// West Bengal bounds
const WEST_BENGAL_BOUNDS = {
  north: 27.5,
  south: 21.5,
  east: 89.8,
  west: 85.8
};

const categoryColors: Record<string, string> = {
  "Historical": "#8B5CF6",
  "Religious": "#F59E0B", 
  "Natural": "#10B981",
  "Cultural": "#EF4444",
  "Adventure": "#3B82F6",
  "Museums": "#6366F1",
  "Parks": "#059669",
  "Beaches": "#06B6D4",
  "Shopping": "#EC4899",
  "Food": "#F97316"
};

export default function RealInteractiveMap({ 
  locations, 
  selectedLocation, 
  onLocationSelect,
  className = ""
}: RealInteractiveMapProps) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  // Convert lat/lng to map coordinates
  const latLngToPoint = (lat: number, lng: number) => {
    const x = ((lng - WEST_BENGAL_BOUNDS.west) / (WEST_BENGAL_BOUNDS.east - WEST_BENGAL_BOUNDS.west)) * 400;
    const y = ((WEST_BENGAL_BOUNDS.north - lat) / (WEST_BENGAL_BOUNDS.north - WEST_BENGAL_BOUNDS.south)) * 300;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - center.x, y: e.clientY - center.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCenter({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleLocationClick = (location: MapLocation) => {
    onLocationSelect?.(location);
    
    // Center map on selected location
    const point = latLngToPoint(location.latitude, location.longitude);
    setCenter({
      x: -point.x * zoom + 200,
      y: -point.y * zoom + 150
    });
  };

  return (
    <div className={`relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative w-full h-80 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* West Bengal Outline */}
        <motion.div
          style={{
            transform: `translate(${center.x}px, ${center.y}px) scale(${zoom})`
          }}
          className="absolute inset-0"
        >
          {/* Simplified West Bengal Shape */}
          <svg 
            width="400" 
            height="300" 
            viewBox="0 0 400 300"
            className="absolute inset-0"
          >
            {/* West Bengal boundary (simplified) */}
            <path
              d="M 50 50 L 350 50 L 380 100 L 360 200 L 320 280 L 250 290 L 180 270 L 120 220 L 80 150 Z"
              fill="rgba(34, 197, 94, 0.1)"
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth="2"
            />
            
            {/* Major rivers */}
            <path
              d="M 100 80 Q 200 120 300 100 Q 320 150 280 200"
              fill="none"
              stroke="rgba(59, 130, 246, 0.4)"
              strokeWidth="3"
            />
          </svg>

          {/* Location Markers */}
          {locations.map((location, index) => {
            const point = latLngToPoint(location.latitude, location.longitude);
            const isSelected = selectedLocation?.id === location.id;
            
            return (
              <motion.div
                key={location.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute cursor-pointer"
                style={{
                  left: point.x - 12,
                  top: point.y - 12,
                  zIndex: isSelected ? 20 : 10
                }}
                onClick={() => handleLocationClick(location)}
              >
                {/* Marker */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ 
                    backgroundColor: categoryColors[location.category] || '#6366F1'
                  }}
                >
                  <MapPin className="w-3 h-3 text-white" />
                </motion.div>

                {/* Label */}
                {showLabels && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="bg-white px-2 py-1 rounded-md shadow-sm border text-xs font-medium text-gray-700">
                      {location.name}
                    </div>
                  </motion.div>
                )}

                {/* Selection Ring */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 w-6 h-6 rounded-full border-2 border-primary"
                    style={{
                      animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          className="h-8 w-8 p-0 bg-white/90"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          className="h-8 w-8 p-0 bg-white/90"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowLabels(!showLabels)}
          className="h-8 w-8 p-0 bg-white/90"
        >
          <Layers className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 max-w-xs">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Categories</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(categoryColors).slice(0, 6).map(([category, color]) => (
            <div key={category} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-700">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Location Info */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 max-w-sm"
        >
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <img
                  src={selectedLocation.imageUrl}
                  alt={selectedLocation.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {selectedLocation.name}
                  </h4>
                  <Badge 
                    variant="outline" 
                    className="mt-1"
                    style={{ 
                      borderColor: categoryColors[selectedLocation.category],
                      color: categoryColors[selectedLocation.category]
                    }}
                  >
                    {selectedLocation.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Map Info */}
      <div className="absolute top-4 left-4 bg-white/90 rounded-lg px-3 py-2">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <Navigation className="w-4 h-4" />
          <span className="font-medium">West Bengal</span>
          <Badge variant="outline" className="text-xs">
            {locations.length} locations
          </Badge>
        </div>
      </div>
    </div>
  );
}