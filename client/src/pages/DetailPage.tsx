import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import AttractionDetails from "@/components/AttractionDetails";
// Import curated attractions from Home (move array to a shared file in a real app)
const curatedAttractions = [
  {
    id: 9001,
    name: "Kolkata Food Trail",
    description: "A guided journey through Kolkata's most iconic food spots, sampling authentic Bengali cuisine and street food with local experts. Includes stops at heritage eateries and hidden gems.",
    shortDescription: "Experience authentic Bengali cuisine with local food experts",
    category: "Food & Drinks",
    city: "Kolkata",
    imageUrl: "https://www.financialexpress.com/wp-content/uploads/2017/04/bengali-reu-L.jpg",
    rating: "4.8",
    reviewCount: 2,
    entryFee: "₹999/person",
    location: "Kolkata, West Bengal",
    openingHours: "10:00 AM - 8:00 PM",
    latitude: 22.5726,
    longitude: 88.3639,
    isTrending: false,
    isFeatured: true,
    tags: ["food", "guided", "bengali", "heritage"],
    contactNumber: "+91 9876543210",
    website: "https://kolkatafoodtrail.example.com",
    bookingUrl: "https://kolkatafoodtrail.example.com/book",
    amenities: ["Guided Tour", "Snacks Included"],
    bestTimeToVisit: "October - March",
    nearestMetro: "Esplanade",
    parkingAvailable: true,
    wheelchairAccessible: true,
    guidedToursAvailable: true,
    languages: ["English", "Bengali"],
  },
  {
    id: 9002,
    name: "Sundarbans Adventure",
    description: "Explore the mystical Sundarbans mangrove forests, spot Royal Bengal Tigers, and enjoy a boat safari with local naturalists. Includes village visits and local cuisine.",
    shortDescription: "Explore the mystical mangrove forests and spot Royal Bengal Tigers",
    category: "Nature",
    city: "Sundarbans",
    imageUrl: "https://i.ytimg.com/vi/5zqCChpY5Ng/maxresdefault.jpg",
    rating: "4.9",
    reviewCount: 3,
    entryFee: "₹2499/person",
    location: "Sundarbans, West Bengal",
    openingHours: "6:00 AM - 6:00 PM",
    latitude: 21.9497,
    longitude: 89.1833,
    isTrending: true,
    isFeatured: true,
    tags: ["wildlife", "tiger", "boat", "adventure"],
    contactNumber: "+91 9123456780",
    website: "https://sundarbansadventure.example.com",
    bookingUrl: "https://sundarbansadventure.example.com/book",
    amenities: ["Boat Safari", "Guide", "Meals Included"],
    bestTimeToVisit: "November - February",
    nearestMetro: undefined,
    parkingAvailable: false,
    wheelchairAccessible: false,
    guidedToursAvailable: true,
    languages: ["English", "Bengali", "Hindi"],
  },
  {
    id: 9003,
    name: "Heritage Walk",
    description: "Discover Kolkata's colonial architecture and history on a guided walk through the city's heritage districts. Includes stories, photo stops, and refreshments.",
    shortDescription: "Discover the rich colonial architecture and history of Kolkata",
    category: "Culture",
    city: "Kolkata",
    imageUrl: "https://media.istockphoto.com/id/1203104555/vector/outline-kolkata-india-city-skyline-with-historic-buildings-isolated-on-white.jpg?s=612x612&w=0&k=20&c=SC37XfqjYqYRyUhjMdfWzo6EbjybDoJBYrCkmqs5wE0=",
    rating: "4.7",
    reviewCount: 1,
    entryFee: "₹499/person",
    location: "Kolkata, West Bengal",
    openingHours: "8:00 AM - 12:00 PM",
    latitude: 22.5726,
    longitude: 88.3639,
    isTrending: false,
    isFeatured: false,
    tags: ["heritage", "walk", "history", "architecture"],
    contactNumber: "+91 9988776655",
    website: "https://kolkataheritagewalk.example.com",
    bookingUrl: "https://kolkataheritagewalk.example.com/book",
    amenities: ["Guide", "Refreshments"],
    bestTimeToVisit: "November - March",
    nearestMetro: "Park Street",
    parkingAvailable: false,
    wheelchairAccessible: false,
    guidedToursAvailable: true,
    languages: ["English", "Bengali"],
  },
  {
    id: 9004,
    name: "Darjeeling Tea Gardens",
    description: "Visit the scenic tea plantations of Darjeeling, learn about tea processing, and enjoy tastings with local experts. Includes plantation walks and tea shop visits.",
    shortDescription: "Visit scenic tea plantations and learn about tea processing",
    category: "Nature",
    city: "Darjeeling",
    imageUrl: "https://traveleva.gumlet.io/activities/1202/1202_2021-06-07things10-45-49.jpg?w=1244&h=312",
    rating: "4.9",
    reviewCount: 2,
    entryFee: "₹1499/person",
    location: "Darjeeling, West Bengal",
    openingHours: "9:00 AM - 5:00 PM",
    latitude: 27.0360,
    longitude: 88.2627,
    isTrending: true,
    isFeatured: false,
    tags: ["tea", "nature", "walk", "plantation"],
    contactNumber: "+91 8877665544",
    website: "https://darjeelingteagardens.example.com",
    bookingUrl: "https://darjeelingteagardens.example.com/book",
    amenities: ["Tea Tasting", "Guided Walks"],
    bestTimeToVisit: "March - May",
    nearestMetro: undefined,
    parkingAvailable: true,
    wheelchairAccessible: false,
    guidedToursAvailable: true,
    languages: ["English", "Hindi", "Nepali"],
  },
];

export default function DetailPage() {
  const { id } = useParams();

  const { data: item, isLoading } = useQuery({
    queryKey: [`/api/categories/item/${id}`],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/categories/item/${id}`);
      if (!response.ok) throw new Error("Failed to fetch item");
      return response.json();
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Try to find curated item if API returns nothing
  const attractionId = Number(id);
  const fallbackItem = curatedAttractions.find(a => a.id === attractionId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-64 bg-gray-200 animate-pulse" />
        <div className="px-4 space-y-3">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  if (!item && !fallbackItem) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Item Not Found</h3>
          <p className="text-gray-600">The item you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <AttractionDetails attraction={item || fallbackItem} />;
}