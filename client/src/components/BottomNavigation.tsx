import { useLocation } from "wouter";
import { Home, Calendar, Compass, Percent, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/events", icon: Calendar, label: "Events" },
  { path: "/explore", icon: Compass, label: "Explore" },
  { path: "/offers", icon: Percent, label: "Offers" },
  { path: "/more", icon: MoreHorizontal, label: "More" },
];

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 safe-area-padding max-w-[375px] mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location === tab.path;
          
          return (
            <motion.button
              key={tab.path}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocation(tab.path)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "text-primary scale-105" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1 h-1 bg-primary rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
