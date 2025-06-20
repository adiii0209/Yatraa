import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface TopNavigationProps {
  selectedCity: string;
  onCityClick: () => void;
}

export default function TopNavigation({ selectedCity, onCityClick }: TopNavigationProps) {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3 max-w-[375px] mx-auto"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold text-primary"
          >
            Yatra
          </motion.h1>
          <div className="bg-primary/10 px-2 py-1 rounded-full">
            <span className="text-xs text-primary font-medium">West Bengal</span>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCityClick}
          className="bg-primary text-white px-3 py-1.5 rounded-full shadow-md transition-all duration-200 hover:bg-primary/90 flex items-center space-x-1"
        >
          <MapPin className="w-3 h-3" />
          <span className="text-xs font-medium">{selectedCity}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
