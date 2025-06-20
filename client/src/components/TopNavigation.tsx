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
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[375px] z-50 bg-white border-b border-gray-100 px-4 py-3"
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
          className="bg-primary text-white p-2 rounded-full shadow-md transition-all duration-200 hover:bg-primary/90"
        >
          <MapPin className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
