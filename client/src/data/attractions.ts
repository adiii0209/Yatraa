export interface Attraction {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  city: string;
  imageUrl: string;
  rating: string;
  reviewCount: number;
  entryFee: string;
  openingHours: string;
  location: string;
  latitude: number;
  longitude: number;
  isTrending: boolean;
  isFeatured: boolean;
  tags: string[];
  contactNumber: string;
  website?: string;
  bookingUrl?: string;
  amenities: string[];
  bestTimeToVisit: string;
  nearestMetro?: string;
  parkingAvailable: boolean;
  wheelchairAccessible: boolean;
  guidedToursAvailable: boolean;
  languages: string[];
}

// This data would typically come from the API, but defining the structure here
export const attractionCategories = [
  "Historical Monuments",
  "Religious Sites",
  "Museums & Galleries",
  "Nature & Parks",
  "Beaches",
  "Wildlife Sanctuaries",
  "Architecture",
  "Gardens & Parks",
  "Bridges & Landmarks",
  "Markets & Shopping",
  "Food & Dining",
  "Entertainment & Lifestyle",
  "Hill Stations",
  "Tea Gardens",
  "Handicraft Villages",
  "Heritage Sites",
  "Palaces & Forts",
  "River Cruises"
];

export const popularAttractions = [
  "Victoria Memorial",
  "Howrah Bridge",
  "Darjeeling Tea Gardens",
  "Sundarbans National Park",
  "Kalighat Temple",
  "Indian Museum",
  "Bishnupur Terracotta Temples",
  "Tiger Hill",
  "New Market",
  "Eden Gardens"
];

export const getAttractionsByCity = (city: string) => {
  // This would make an API call in the real app
  return [];
};

export const getTrendingAttractions = () => {
  // This would make an API call in the real app
  return [];
};

export const searchAttractions = (query: string, city?: string) => {
  // This would make an API call in the real app
  return [];
};
