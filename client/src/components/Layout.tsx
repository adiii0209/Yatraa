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
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      {/* Top Navigation always visible at the top */}
      <div className="fixed top-0 left-0 w-full z-30">
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
      </div>

      {/* Mobile sidebar overlay */}
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
        style={{ width: '80vw', maxWidth: 320 }}
      >
        <Sidebar />
      </div>

      {/* Desktop sidebar (hidden on mobile) */}
      <div className="hidden lg:block fixed top-0 left-0 h-full z-20">
        <Sidebar />
      </div>

      {/* Main content area, always below TopNavigation, above BottomNavigation */}
      <main className="flex-1 w-full max-w-full mx-0 px-0 pt-16 pb-20 relative z-10 overflow-x-hidden">
        {children}
      </main>
      <div className="fixed bottom-0 left-0 w-full z-30">
        <BottomNavigation />
      </div>
      <FloatingActionButton />
      <CitySelector
        isOpen={showCitySelector}
        onClose={() => setShowCitySelector(false)}
      />
    </div>
  );
}
