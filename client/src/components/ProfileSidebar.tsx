import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  User, 
  Heart, 
  Calendar, 
  MapPin, 
  Settings, 
  HelpCircle, 
  LogOut,
  Edit3,
  Star,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    icon: User,
    label: "Edit Profile",
    description: "Update your personal information",
    action: "profile"
  },
  {
    icon: Heart,
    label: "Saved Places",
    description: "12 places saved",
    action: "favorites",
    count: 12
  },
  {
    icon: Calendar,
    label: "My Bookings",
    description: "3 upcoming bookings",
    action: "bookings",
    count: 3
  },
  {
    icon: MapPin,
    label: "My Itinerary",
    description: "5 places planned",
    action: "itinerary",
    count: 5
  },
  {
    icon: Settings,
    label: "Preferences",
    description: "Language, notifications",
    action: "settings"
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    description: "Get help and FAQs",
    action: "help"
  }
];

const recentActivity = [
  {
    type: "booking",
    title: "Booked Darjeeling Tea Tour",
    time: "2 hours ago",
    icon: Calendar
  },
  {
    type: "favorite",
    title: "Saved Victoria Memorial",
    time: "1 day ago",
    icon: Heart
  },
  {
    type: "review",
    title: "Reviewed Howrah Bridge",
    time: "3 days ago",
    icon: Star
  }
];

export default function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const handleMenuClick = (action: string) => {
    console.log(`Profile menu action: ${action}`);
    // Handle navigation based on action
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Profile</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/avatar.jpg" />
                  <AvatarFallback className="bg-primary text-white">JT</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">John Traveler</h3>
                  <p className="text-sm text-gray-600">john@example.com</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Explorer Level
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit3 className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleMenuClick(item.action)}
                    className="w-full p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{item.label}</span>
                            {item.count && (
                              <Badge variant="outline" className="text-xs">
                                {item.count}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="p-4 border-t">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Recent Activity
              </h4>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <Icon className="w-3 h-3 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Logout */}
            <div className="p-4 border-t">
              <Button
                variant="outline"
                className="w-full justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => handleMenuClick("logout")}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>

            {/* App Version */}
            <div className="p-4 text-center text-xs text-gray-400">
              Yatra v1.0.0
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}