import { Home, Map, Compass, Users, Award, Gift, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  badge?: string;
  onClick?: () => void;
}

function SidebarItem({ icon, title, description, badge, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-2 flex items-center gap-2 hover:bg-primary/5 rounded-lg transition-colors group min-h-0"
      style={{ minHeight: 0 }}
    >
      <div className="p-1.5 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-medium text-sm leading-tight">{title}</h3>
        {description && <p className="text-xs text-gray-500 leading-tight">{description}</p>}
      </div>
      {badge && (
        <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
          {badge}
        </span>
      )}
      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
    </button>
  );
}

export default function Sidebar() {
  const [points, setPoints] = useState(150);
  const [level, setLevel] = useState("Explorer");

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      {/* User Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Aditya Rana</h2>
            <p className="text-sm text-gray-500">{level}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Travel Points</span>
            <span className="font-semibold">{points}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(points % 100) / 100 * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <SidebarItem
          icon={<Home className="w-4 h-4" />}
          title="Home"
          description="Dashboard overview"
        />
        <SidebarItem
          icon={<Map className="w-4 h-4" />}
          title="Explore Places"
          description="Discover new destinations"
        />
        <SidebarItem
          icon={<Users className="w-4 h-4" />}
          title="Local Guides"
          description="Find official tour guides"
          badge="New"
        />
        <SidebarItem
          icon={<Compass className="w-4 h-4" />}
          title="Become a Guide"
          description="Apply as a local guide"
        />

        {/* Travel Rewards Section */}
        <div className="pt-4 mt-4 border-t">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Travel Rewards</h3>
          <SidebarItem
            icon={<Award className="w-4 h-4" />}
            title="My Achievements"
            description="Badges and milestones"
            badge="3 New"
          />
          <SidebarItem
            icon={<Gift className="w-4 h-4" />}
            title="Redeem Rewards"
            description="Use your travel points"
            badge={`${points} pts`}
          />
        </div>

        {/* Daily Challenges */}
        <div className="pt-4 mt-4 border-t">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Daily Challenges</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-800">Visit a Heritage Site</span>
                <span className="text-xs text-green-600">+50 pts</span>
              </div>
              <div className="h-1.5 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-2/3" />
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-800">Try Local Cuisine</span>
                <span className="text-xs text-blue-600">+30 pts</span>
              </div>
              <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}