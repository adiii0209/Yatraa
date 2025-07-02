import { motion } from "framer-motion";
import { 
  User, 
  Heart, 
  Calendar, 
  Languages, 
  Download, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useEffect } from "react";

const menuItems = [
  {
    icon: User,
    label: "My Profile",
    description: "Personal information and preferences",
    action: "profile"
  },
  {
    icon: Heart,
    label: "Saved Places",
    description: "Your favorite attractions and places",
    action: "saved"
  },
  {
    icon: Calendar,
    label: "My Bookings",
    description: "View and manage your bookings",
    action: "bookings"
  },
  {
    icon: Languages,
    label: "Language",
    description: "English, Bengali, Hindi",
    action: "language"
  },
  {
    icon: Download,
    label: "Offline Maps",
    description: "Download maps for offline use",
    action: "offline"
  },
  {
    icon: Settings,
    label: "Settings",
    description: "App preferences and notifications",
    action: "settings"
  },
  {
    icon: HelpCircle,
    label: "Help & FAQ",
    description: "Get help and find answers",
    action: "help"
  }
];

export default function More() {
  const handleMenuClick = (action: string) => {
    console.log(`Menu action: ${action}`);
    // Handle navigation based on action
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="space-y-6">
      {/* User Profile Section */}
      <div className="px-4 py-6 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Aditya Rana</h3>
            <p className="text-sm text-gray-600">adityarana200502@gmail.com</p>
          </div>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleMenuClick(item.action)}
              className="w-full bg-white rounded-xl p-4 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-gray-900 font-medium">{item.label}</span>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* App Information */}
      <div className="px-4 py-6">
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>Yatra - Explore West Bengal</p>
          <p>Version 1.0.0</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 pb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-50 text-red-600 rounded-xl p-4 flex items-center justify-center space-x-2 hover:bg-red-100 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </div>
  );
}
