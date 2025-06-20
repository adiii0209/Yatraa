import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Locate, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapLocation {
  id: number;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  selectedLocation?: MapLocation | null;
  onLocationSelect?: (location: MapLocation) => void;
  className?: string;
}

export default function InteractiveMap({ 
  locations, 
  selectedLocation, 
  onLocationSelect,
  className = "" 
}: InteractiveMapProps) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // West Bengal boundaries (approximate)
  const mapBounds = {
    north: 27.5,
    south: 21.5,
    east: 89.5,
    west: 85.5
  };

  const normalizeCoordinates = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 300;
    const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 400;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - center.x, y: e.clientY - center.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Limit panning within bounds
    const maxPan = 50 * zoom;
    setCenter({
      x: Math.max(-maxPan, Math.min(maxPan, newX)),
      y: Math.max(-maxPan, Math.min(maxPan, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(3, prev + 0.5));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(0.5, prev - 0.5));
  };

  const resetView = () => {
    setZoom(1);
    setCenter({ x: 0, y: 0 });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Monument: "#3b82f6",
      Temple: "#f59e0b",
      Nature: "#10b981",
      Beach: "#06b6d4",
      Museum: "#8b5cf6",
      Sports: "#ef4444",
      Market: "#f97316",
      Wildlife: "#84cc16"
    };
    return colors[category as keyof typeof colors] || "#6b7280";
  };

  return (
    <div className={`relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden ${className}`}>
      {/* Map Container */}
      <div
        className="relative h-64 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Map Background */}
        <motion.div
          animate={{ 
            scale: zoom,
            x: center.x,
            y: center.y
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {/* West Bengal Outline */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 300 400"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M50 50 L250 50 L280 150 L250 250 L200 350 L100 350 L50 250 Z"
              fill="rgba(59, 130, 246, 0.1)"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
            />
          </svg>

          {/* Location Markers */}
          {locations.map((location) => {
            const pos = normalizeCoordinates(location.latitude, location.longitude);
            const isSelected = selectedLocation?.id === location.id;
            
            return (
              <motion.div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: pos.x, top: pos.y }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onLocationSelect?.(location)}
              >
                <div
                  className={`w-3 h-3 rounded-full shadow-lg border-2 border-white transition-all duration-200 ${
                    isSelected ? "scale-150 ring-2 ring-white" : ""
                  }`}
                  style={{ backgroundColor: getCategoryColor(location.category) }}
                />
                
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-32 z-10"
                  >
                    <img
                      src={location.imageUrl}
                      alt={location.name}
                      className="w-full h-16 object-cover rounded mb-2"
                    />
                    <h4 className="font-semibold text-xs text-gray-900 mb-1">
                      {location.name}
                    </h4>
                    <p className="text-xs text-gray-600">{location.category}</p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-2 right-2 flex flex-col space-y-1">
        <Button
          size="sm"
          variant="outline"
          onClick={zoomIn}
          className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm"
        >
          <ZoomIn className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={zoomOut}
          className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm"
        >
          <ZoomOut className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={resetView}
          className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm"
        >
          <Locate className="w-3 h-3" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2">
        <h4 className="text-xs font-semibold text-gray-900 mb-1">Categories</h4>
        <div className="grid grid-cols-2 gap-1">
          {Object.entries({
            Monument: "#3b82f6",
            Temple: "#f59e0b",
            Nature: "#10b981",
            Beach: "#06b6d4"
          }).map(([category, color]) => (
            <div key={category} className="flex items-center space-x-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2">
        <div className="flex items-center space-x-1">
          <Navigation className="w-3 h-3 text-gray-600" />
          <span className="text-xs text-gray-600">Drag to explore</span>
        </div>
      </div>
    </div>
  );
}