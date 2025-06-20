import { ReactNode, useState } from "react";
import TopNavigation from "./TopNavigation";
import BottomNavigation from "./BottomNavigation";
import FloatingActionButton from "./FloatingActionButton";
import CitySelector from "./CitySelector";
import { useCityStore } from "@/hooks/useCity";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showCitySelector, setShowCitySelector] = useState(false);
  const { selectedCity } = useCityStore();

  return (
    <div className="mobile-container bg-gray-50 min-h-screen relative">
      <TopNavigation 
        selectedCity={selectedCity}
        onCityClick={() => setShowCitySelector(true)}
      />
      
      <main className="pb-20 pt-16 min-h-screen">
        {children}
      </main>

      <BottomNavigation />
      <FloatingActionButton />

      <CitySelector
        isOpen={showCitySelector}
        onClose={() => setShowCitySelector(false)}
      />
    </div>
  );
}
