import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CityState {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  getUserLocation: () => Promise<string>;
  recentCities: string[];
  addRecentCity: (city: string) => void;
}

export const useCityStore = create<CityState>()(
  persist(
    (set, get) => ({
      selectedCity: 'Kolkata',
      recentCities: [],
      
      setSelectedCity: (city: string) => {
        set({ selectedCity: city });
        get().addRecentCity(city);
      },
      
      addRecentCity: (city: string) => {
        set((state) => ({
          recentCities: [
            city,
            ...state.recentCities.filter(c => c !== city)
          ].slice(0, 5) // Keep only last 5 cities
        }));
      },
      
      getUserLocation: async () => {
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
            return;
          }
          
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              try {
                // In a real app, you would reverse geocode these coordinates
                // For now, we'll use a mock service or default to Kolkata
                const city = await reverseGeocode(latitude, longitude);
                resolve(city);
              } catch (error) {
                // Fallback to Kolkata if reverse geocoding fails
                resolve('Kolkata');
              }
            },
            (error) => {
              console.error('Geolocation error:', error);
              // Fallback to Kolkata if location access is denied
              resolve('Kolkata');
            },
            {
              timeout: 10000,
              maximumAge: 300000, // 5 minutes
              enableHighAccuracy: true
            }
          );
        });
      }
    }),
    {
      name: 'city-storage',
      partialize: (state) => ({
        selectedCity: state.selectedCity,
        recentCities: state.recentCities
      })
    }
  )
);

// Mock reverse geocoding function
// In a real app, this would use a service like Google Maps API
async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
  // Simple distance-based city detection for West Bengal
  const cities = [
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Darjeeling', lat: 27.0360, lng: 88.2627 },
    { name: 'Siliguri', lat: 26.7271, lng: 88.3953 },
    { name: 'Durgapur', lat: 23.5204, lng: 87.3119 },
    { name: 'Asansol', lat: 23.6839, lng: 86.9523 }
  ];
  
  let closestCity = 'Kolkata';
  let minDistance = Infinity;
  
  cities.forEach(city => {
    const distance = Math.sqrt(
      Math.pow(city.lat - latitude, 2) + Math.pow(city.lng - longitude, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city.name;
    }
  });
  
  return closestCity;
}

// Hook for accessing city functionality in components
export const useCity = () => {
  const store = useCityStore();
  
  return {
    selectedCity: store.selectedCity,
    recentCities: store.recentCities,
    setSelectedCity: store.setSelectedCity,
    getUserLocation: store.getUserLocation,
    isCurrentLocation: (city: string) => {
      // In a real app, this would check against actual user location
      return false;
    }
  };
};
