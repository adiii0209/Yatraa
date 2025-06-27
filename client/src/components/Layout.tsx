import { ReactNode, useState } from "react";
import TopNavigation from "./TopNavigation";
import BottomNavigation from "./BottomNavigation";
import FloatingActionButton from "./FloatingActionButton";
import CitySelector from "./CitySelector";
import Sidebar from "./Sidebar";
import { useCityStore } from "@/hooks/useCity";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { selectedCity } = useCityStore();

  return (
    <div className="flex bg-gray-50 min-h-screen relative">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity",
          showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowSidebar(false)}
      />
      <div
        className={cn(
          "fixed top-0 left-0 h-full z-50 lg:hidden transition-transform duration-300 transform",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-h-screen relative">
        <TopNavigation 
          selectedCity={selectedCity}
          onCityClick={() => setShowCitySelector(true)}
          leftElement={
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          }
        />
        
        <main className="pb-20 pt-16 min-h-screen max-w-5xl mx-auto w-full px-4">
          {children}
        </main>

        <BottomNavigation />
        <FloatingActionButton />

        <CitySelector
          isOpen={showCitySelector}
          onClose={() => setShowCitySelector(false)}
        />
      </div>
    </div>
  );
}
