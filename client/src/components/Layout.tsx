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
    <div className="bg-gray-50 min-h-screen flex flex-col ">
      {/* Top Navigation - fixed for mobile */}
      <header className="fixed top-0 left-0 right-0 z-30 w-full bg-white shadow-sm">
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
      </header>

      {/* Sidebar for desktop */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {/* Mobile sidebar drawer */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity",
          showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowSidebar(false)}
      />
      <nav
        className={cn(
          "fixed top-0 left-0 h-full w-64 z-50 lg:hidden transition-transform duration-300 transform overflow-y-auto bg-white",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <Sidebar onNavigate={() => setShowSidebar(false)} />
      </nav>

      {/* Main content area, scrollable, with padding for nav bars */}
      <main
        className="flex-1 flex flex-col w-full max-w-md mx-auto pt-16 pb-20 px-0 sm:px-0 overflow-x-hidden overflow-y-auto min-h-screen"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </main>

      {/* Bottom Navigation - fixed for mobile */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 w-full bg-white shadow-t">
        <BottomNavigation />
      </footer>

      {/* Floating Action Button (above bottom nav) */}
      <div className="fixed bottom-20 right-4 z-40">
        <FloatingActionButton />
      </div>

      {/* City Selector Modal */}
      <CitySelector
        isOpen={showCitySelector}
        onClose={() => setShowCitySelector(false)}
      />
    </div>
  );
}
