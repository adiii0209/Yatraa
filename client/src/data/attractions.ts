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
  openHours: string;
  location: string;
  latitude?: string;
  longitude?: string;
  isTrending: boolean;
  isFeatured: boolean;
  tags: string[];
}

// This data would typically come from the API, but defining the structure here
export const attractionCategories = [
  "Monument",
  "Temple",
  "Museum",
  "Nature",
  "Beach",
  "Wildlife",
  "Architecture",
  "Garden",
  "Bridge",
  "Market",
  "Food",
  "Cultural"
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
