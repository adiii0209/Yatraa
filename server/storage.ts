import { 
  users, 
  attractions, 
  events, 
  offers, 
  userFavorites, 
  userBookings,
  userItinerary,
  restaurants,
  
  type User, 
  type InsertUser,
  type Attraction,
  type InsertAttraction,
  type Event,
  type InsertEvent,
  type Offer,
  type InsertOffer,
  type UserFavorite,
  type InsertUserFavorite,
  type UserBooking,
  type InsertUserBooking,
  type UserItinerary,
  type InsertUserItinerary,
  type Restaurant,
  type InsertRestaurant
} from "@shared/schema";

export interface IStorage {
  // Category operations
  getItemsByCategory(category: string, city?: string): Promise<(Attraction | Restaurant | Event)[]>;
  
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Attraction operations
  getAttractions(city?: string): Promise<Attraction[]>;
  getAttraction(id: number): Promise<Attraction | undefined>;
  getTrendingAttractions(city?: string): Promise<Attraction[]>;
  getFeaturedAttractions(city?: string): Promise<Attraction[]>;
  searchAttractions(query: string, city?: string): Promise<Attraction[]>;
  
  // Event operations
  getEvents(city?: string): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getEventsByCategory(category: string, city?: string): Promise<Event[]>;
  getUpcomingEvents(city?: string): Promise<Event[]>;
  
  // Offer operations
  getOffers(): Promise<Offer[]>;
  getOffersByCategory(category: string): Promise<Offer[]>;
  getActiveOffers(): Promise<Offer[]>;
  
  // User favorites
  getUserFavorites(userId: number): Promise<Attraction[]>;
  addUserFavorite(favorite: InsertUserFavorite): Promise<UserFavorite>;
  removeUserFavorite(userId: number, attractionId: number): Promise<boolean>;
  
  // User bookings
  getUserBookings(userId: number): Promise<Event[]>;
  createBooking(booking: InsertUserBooking): Promise<UserBooking>;
  
  // User itinerary
  getUserItinerary(userId: number): Promise<Attraction[]>;
  addToItinerary(itinerary: InsertUserItinerary): Promise<UserItinerary>;
  removeFromItinerary(userId: number, attractionId: number): Promise<boolean>;
  
  // Restaurants
  getRestaurants(city?: string): Promise<Restaurant[]>;
  getRestaurant(id: number): Promise<Restaurant | undefined>;
  getRecommendedRestaurants(city?: string): Promise<Restaurant[]>;
  searchRestaurants(query: string, city?: string): Promise<Restaurant[]>;
}

export class MemStorage implements IStorage {
  // --- Only keep this implementation ---
  private restaurantsData: Attraction[] = [
  {
    "id": 5001,
    "name": "Oh! Calcutta",
    "description": "Authentic Bengali cuisine in an elegant setting with traditional recipes and modern presentation.",
    "shortDescription": "Bengali cuisine restaurant",
    "contactNumber": "+91-33-4040-8080",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Kolkata",
    "imageUrl": "https://source.unsplash.com/800x600/?oh-calcutta,restaurant",
    "rating": "4.3",
    "reviewCount": 1250,
    "entryFee": "₹800-1200",
    "openHours": "12:00 PM - 10:30 PM",
    "location": "Forum Mall, Elgin Road, Kolkata",
    "latitude": "22.5448",
    "longitude": "88.3534",
    "isTrending": true,
    "isFeatured": true,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "Year-round",
    "tags": ["bengali", "restaurant", "food", "kolkata"]
  },
  {
    "id": 5002,
    "name": "Bhojohori Manna",
    "description": "Home-style Bengali cooking with traditional flavors and authentic preparation methods.",
    "shortDescription": "Bengali cuisine restaurant",
    "contactNumber": "+91-33-2465-4043",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Kolkata",
    "imageUrl": "https://source.unsplash.com/800x600/?bhojohori-manna,restaurant",
    "rating": "4.1",
    "reviewCount": 890,
    "entryFee": "₹400-600",
    "openHours": "11:30 AM - 10:00 PM",
    "location": "Elgin Road, Kolkata",
    "latitude": "22.5431",
    "longitude": "88.3519",
    "isTrending": true,
    "isFeatured": true,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "Year-round",
    "tags": ["bengali", "restaurant", "food", "kolkata"]
  },
  {
    "id": 5003,
    "name": "Kewpie's Kitchen",
    "description": "Famous for authentic Bengali home cooking, especially fish preparations and traditional sweets.",
    "shortDescription": "Bengali cuisine restaurant",
    "contactNumber": "+91-33-2485-1075",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Kolkata",
    "imageUrl": "https://source.unsplash.com/800x600/?kewpies-kitchen,restaurant",
    "rating": "4.4",
    "reviewCount": 756,
    "entryFee": "₹500-800",
    "openHours": "12:00 PM - 3:00 PM, 7:00 PM - 10:00 PM",
    "location": "Elgin Lane, Kolkata",
    "latitude": "22.5441",
    "longitude": "88.3525",
    "isTrending": true,
    "isFeatured": true,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "Year-round",
    "tags": ["bengali", "restaurant", "food", "kolkata"]
  },
  {
    "id": 5004,
    "name": "6 Ballygunge Place",
    "description": "Upscale Bengali restaurant known for elaborate thalis and traditional preparations.",
    "shortDescription": "Bengali cuisine restaurant",
    "contactNumber": "+91-33-2464-4444",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Kolkata",
    "imageUrl": "https://source.unsplash.com/800x600/?ballygunge-restaurant,kolkata",
    "rating": "4.2",
    "reviewCount": 1120,
    "entryFee": "₹600-900",
    "openHours": "12:00 PM - 10:30 PM",
    "location": "Ballygunge Place, Kolkata",
    "latitude": "22.5325",
    "longitude": "88.3639",
    "isTrending": true,
    "isFeatured": true,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "Year-round",
    "tags": ["bengali", "restaurant", "food", "kolkata"]
  },
  {
    "id": 5005,
    "name": "Flurys",
    "description": "Iconic colonial-era bakery and confectionery famous for English breakfast and pastries.",
    "shortDescription": "Continental cuisine restaurant",
    "contactNumber": "+91-33-2229-7664",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Kolkata",
    "imageUrl": "https://source.unsplash.com/800x600/?flurys-kolkata,bakery",
    "rating": "4.0",
    "reviewCount": 2340,
    "entryFee": "₹300-600",
    "openHours": "7:30 AM - 10:00 PM",
    "location": "Park Street, Kolkata",
    "latitude": "22.5539",
    "longitude": "88.3522",
    "isTrending": true,
    "isFeatured": true,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "Year-round",
    "tags": ["continental", "restaurant", "food", "kolkata"]
  },
  {
    "id": 5006,
    "name": "Glenary's Bakery",
    "description": "Historic bakery in Darjeeling famous for fresh breads, cakes, and mountain views.",
    "shortDescription": "Bakery cuisine restaurant",
    "contactNumber": "+91-354-225-4329",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Darjeeling",
    "imageUrl": "https://source.unsplash.com/800x600/?glenarys,bakery",
    "rating": "4.3",
    "reviewCount": 567,
    "entryFee": "₹200-400",
    "openHours": "8:00 AM - 9:00 PM",
    "location": "Nehru Road, Darjeeling",
    "latitude": "27.0410",
    "longitude": "88.2663",
    "isTrending": true,
    "isFeatured": true,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "Year-round",
    "tags": ["bakery", "restaurant", "food", "darjeeling"]
  },
  {
    "id": 5007,
    "name": "Keventers",
    "description": "Famous for thick milkshakes and breakfast items with stunning Darjeeling hill views.",
    "shortDescription": "Cafe cuisine restaurant",
    "contactNumber": "+91-354-225-4217",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Darjeeling",
    "imageUrl": "https://source.unsplash.com/800x600/?keventers,restaurant",
    "rating": "4.1",
    "reviewCount": 823,
    "entryFee": "₹150-350",
    "openHours": "8:30 AM - 8:30 PM",
    "location": "Mall Road, Darjeeling",
    "latitude": "27.0421",
    "longitude": "88.2673",
    "isTrending": false,
    "isFeatured": false,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "Year-round",
    "tags": ["cafe", "restaurant", "food", "darjeeling"]
  },
  {
    "id": 5008,
    "name": "Sonar Tori",
    "description": "Riverside restaurant in Shantiniketan serving traditional Bengali cuisine with cultural ambiance.",
    "shortDescription": "Bengali cuisine restaurant",
    "contactNumber": "+91-3463-262-751",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Shantiniketan",
    "imageUrl": "https://source.unsplash.com/800x600/?sonar-tori,restaurant",
    "rating": "4.0",
    "reviewCount": 445,
    "entryFee": "₹350-550",
    "openHours": "11:00 AM - 9:30 PM",
    "location": "Prantik, Shantiniketan",
    "latitude": "23.6863",
    "longitude": "87.6772",
    "isTrending": false,
    "isFeatured": false,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "Year-round",
    "tags": ["bengali", "restaurant", "food", "shantiniketan"]
  },
  {
    "id": 5009,
    "name": "Ambrosia Restaurant",
    "description": "Multi-cuisine restaurant in Digha offering fresh seafood and Bengali specialties.",
    "shortDescription": "Seafood cuisine restaurant",
    "contactNumber": "+91-3220-267-123",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Digha",
    "imageUrl": "https://source.unsplash.com/800x600/?ambrosia-seafood,digha",
    "rating": "3.9",
    "reviewCount": 234,
    "entryFee": "₹400-700",
    "openHours": "12:00 PM - 10:00 PM",
    "location": "New Digha Sea Beach Road",
    "latitude": "21.6269",
    "longitude": "87.5085",
    "isTrending": false,
    "isFeatured": false,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "Year-round",
    "tags": ["seafood", "restaurant", "food", "digha"]
  },
  {
    "id": 5010,
    "name": "Taj Bengal Sonargaon",
    "description": "Luxury dining experience with exquisite Bengali cuisine and impeccable service.",
    "shortDescription": "Bengali Fine Dining cuisine restaurant",
    "contactNumber": "+91-33-6612-3456",
    "website": "",
    "nearestMetro": "",
    "parkingAvailable": true,
    "wheelchairAccessible": true,
    "guidedToursAvailable": false,
    "languages": ["English", "Hindi", "Bengali"],
    "category": "Restaurants",
    "city": "Kolkata",
    "imageUrl": "https://source.unsplash.com/800x600/?taj-bengal-sonargaon,restaurant",
    "rating": "4.6",
    "reviewCount": 678,
    "entryFee": "₹2000-3500",
    "openHours": "7:00 PM - 11:30 PM",
    "location": "Taj Bengal Hotel, Alipore",
    "latitude": "22.5355",
    "longitude": "88.3433",
    "isTrending": true,
    "isFeatured": true,
    "amenities": ["Air Conditioning", "Takeaway", "Home Delivery"],
    "bestTimeToVisit": "October to March",
    "tags": ["bengali fine dining", "restaurant", "food", "kolkata"]
  }
  ];

  private cafesData: Attraction[] = [
    {
      id: 1001,
      name: "Flury's",
      contactNumber: "+91-33-2228-4461",
      website: "https://www.flurys.com",
      nearestMetro: "Park Street Metro Station",
      parkingAvailable: false,
      wheelchairAccessible: true,
      guidedToursAvailable: false,
      languages: ["English", "Hindi", "Bengali"],
      description: "Historic cafe known for European confections and breakfast",
      shortDescription: "Iconic heritage cafe",
      category: "Cafes",
      city: "Kolkata",
      imageUrl: "https://www.indiafoodnetwork.in/h-upload/2024/08/29/1345313-flurys-mumbai.webp",
      rating: "4.6",
      reviewCount: 1200,
      entryFee: "Free",
      openHours: "8:00 AM - 10:00 PM",
      location: "Park Street, Kolkata",
      latitude: "22.5549",
      longitude: "88.3512",
      isTrending: true,
      isFeatured: true,
      amenities: ["Cafe", "Bakery", "Dine-in"],
      bestTimeToVisit: "Morning for breakfast",
      tags: ["cafe", "bakery", "breakfast", "heritage"]
    }
  ];

  private entertainmentData: Attraction[] = [
    {
      id: 2001,
      name: "Nicco Park",
      description: "Amusement park with rides and entertainment",
      shortDescription: "Family amusement park",
      contactNumber: "+91-33-2357-2841",
      website: "http://www.niccoparks.com",
      nearestMetro: "Salt Lake Sector V Metro Station",
      parkingAvailable: true,
      wheelchairAccessible: true,
      guidedToursAvailable: false,
      languages: ["English", "Hindi", "Bengali"],
      category: "Entertainment",
      city: "Kolkata",
      imageUrl: "https://nomadsaikat.com/wp-content/uploads/2023/11/Nicco-Park-Bhubaneswar.webp",
      rating: "4.3",
      reviewCount: 3000,
      entryFee: "₹250",
      openHours: "10:30 AM - 7:30 PM",
      location: "Salt Lake City, Kolkata",
      latitude: "22.5741",
      longitude: "88.4219",
      isTrending: true,
      isFeatured: false,
      amenities: ["Rides", "Food Court", "Parking"],
      bestTimeToVisit: "Weekday mornings",
      tags: ["amusement", "rides", "family", "entertainment"]
    }
  ];

  private hotelsData: Attraction[] = [
    {
      id: 3001,
      name: "The Oberoi Grand",
      description: "Luxury heritage hotel in the heart of Kolkata",
      shortDescription: "5-star heritage hotel",
      contactNumber: "+91-33-2249-2323",
      website: "https://www.oberoihotels.com/hotels-in-kolkata/",
      nearestMetro: "Esplanade Metro Station",
      parkingAvailable: true,
      wheelchairAccessible: true,
      guidedToursAvailable: false,
      languages: ["English", "Hindi", "Bengali"],
      category: "Hotels",
      city: "Kolkata",
      imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/46433348.jpg?k=fc8927ff69c47c5ac84bc7498e13c223d535e060ff22096aff68089addb54e86&o=&hp=1",
      rating: "4.8",
      reviewCount: 2500,
      entryFee: "Room rates apply",
      openHours: "24/7",
      location: "Jawaharlal Nehru Road, Kolkata",
      latitude: "22.5604",
      longitude: "88.3502",
      isTrending: true,
      isFeatured: true,
      amenities: ["Spa", "Pool", "Restaurant", "Bar"],
      bestTimeToVisit: "October to March",
      tags: ["luxury", "heritage", "hotel", "5-star"]
    }
  ];

  private transportData: Attraction[] = [
    {
      id: 4001,
      name: "Kolkata Metro",
      contactNumber: "+91-33-2345-6789",
      website: "http://www.mtp.indianrailways.gov.in",
      nearestMetro: null,
      parkingAvailable: true,
      wheelchairAccessible: true,
      guidedToursAvailable: false,
      languages: ["English", "Hindi", "Bengali"],
      description: "Rapid transit system serving Kolkata",
      shortDescription: "City's metro rail network",
      category: "Transport",
      city: "Kolkata",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/The_metro_of_Orange_line_of_Kolkata_%283%29.jpg/1200px-The_metro_of_Orange_line_of_Kolkata_%283%29.jpg",
      rating: "4.4",
      reviewCount: 5000,
      entryFee: "₹5-25",
      openHours: "6:00 AM - 10:00 PM",
      location: "Multiple stations across Kolkata",
      latitude: "22.5726",
      longitude: "88.3639",
      isTrending: true,
      isFeatured: false,
      amenities: ["AC Coaches", "Smart Cards", "Security"],
      bestTimeToVisit: "Avoid peak hours",
      tags: ["metro", "transport", "public", "rail"]
    }
  ];

  async getItemsByCategory(category: string, city?: string): Promise<(Attraction | Restaurant | Event)[]> {
    let items: (Attraction | Restaurant | Event)[] = [];

    switch (category.toLowerCase()) {
      case 'tourist-spots':
        items = Array.from(this.attractions.values());
        break;
      case 'food-and-drinks':
      case 'restaurants':
        items = this.restaurantsData;
        break;
      case 'cafes':
        items = this.cafesData;
        break;
      case 'entertainment':
        items = this.entertainmentData;
        break;
      case 'hotels':
        items = this.hotelsData;
        break;
      case 'transport':
        items = this.transportData;
        break;
      default:
        items = [];
    }

    return city ? items.filter(item => item.city === city) : items;
  }

  private users: Map<number, User> = new Map();
  private attractions: Map<number, Attraction> = new Map();
  private events: Map<number, Event> = new Map();
  private offers: Map<number, Offer> = new Map();
  private userFavorites: Map<number, UserFavorite> = new Map();
  private userBookings: Map<number, UserBooking> = new Map();
  private userItinerary: Map<number, UserItinerary> = new Map();

  private currentUserId = 1;
  private currentAttractionId = 1;
  private currentEventId = 1;
  private currentOfferId = 1;
  private currentFavoriteId = 1;
  private currentBookingId = 1;
  private currentItineraryId = 1;
  private currentRestaurantId = 1;

  constructor() {
    this.seedData();
  }

  // Removed duplicate/legacy getItemsByCategory and categoryMapping logic

  private seedData() {
    // Seed attractions
    // Group attractions by city for easier editing
    const attractionsData: Omit<Attraction, 'id'>[] = [
      // --- Kolkata ---
      {
        name: "Victoria Memorial",
        description: "The Victoria Memorial is a magnificent marble edifice built between 1906-1921 in memory of Queen Victoria. This stunning architectural marvel combines British and Mughal elements, housing a museum with rare collections of antiques, paintings, and manuscripts. The surrounding gardens feature statues and a sound & light show in the evenings.",
        shortDescription: "Iconic marble monument with museum and gardens",
        category: "Historical Monuments",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?q=80&w=1314&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: "4.8",
        reviewCount: 52,
        entryFee: "₹30 for Indians, ₹200 for Foreigners",
        openHours: "10:00 AM - 5:00 PM (Closed on Mondays)",
        location: "Queens Way, Maidan, Kolkata, West Bengal 700071",
        latitude: "22.5448",
        longitude: "88.3426",
        isTrending: true,
        isFeatured: true,
        contactNumber: "+91-33-2223-1890",
        website: "http://www.victoriamemorial-cal.org",
        amenities: ["Garden", "Museum", "Cafe", "Souvenir Shop", "Wheelchair Access"],
        bestTimeToVisit: "October to March",
        nearestMetro: "Maidan Metro Station",
        parkingAvailable: true,
        wheelchairAccessible: true,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["monument", "museum", "kolkata", "heritage", "architecture"]
      },
            {
        "name": "Alipore Jail Museum",
        "description": "The Alipore Jail Museum is a historic colonial-era prison turned museum that once held prominent Indian freedom fighters like Subhas Chandra Bose and Jawaharlal Nehru. Opened to the public in 2022, it offers immersive exhibits, interactive galleries, and restored prison cells that narrate India's struggle for independence. The museum also features sound and light shows, digital storytelling, and guided tours.",
        "shortDescription": "Freedom movement museum in a colonial-era jail",
        "category": "Historical Monuments",
        "city": "Kolkata",
        "imageUrl": "https://independencemuseum.in/standar_slider/img/f_01.jpg",
        "rating": "4.5",
        "reviewCount": 147,
        "entryFee": "₹30 for Indians, ₹100 for Foreigners",
        "openHours": "11:00 AM - 6:00 PM (Closed on Mondays)",
        "location": "Alipore Central Jail, Alipore Road, Kolkata, West Bengal 700027",
        "latitude": "22.5236",
        "longitude": "88.3308",
        "isTrending": true,
        "isFeatured": true,
        "contactNumber": "+91-33-2479-1234",
        "website": "https://wbtourism.gov.in/alipore_museum",
        "amenities": ["Museum", "Audio-Visual Gallery", "Gift Shop", "Café", "Wheelchair Access"],
        "bestTimeToVisit": "November to February",
        "nearestMetro": "Jatin Das Park Metro Station",
        "parkingAvailable": true,
        "wheelchairAccessible": true,
        "guidedToursAvailable": true,
        "languages": ["English", "Hindi", "Bengali"],
        "tags": ["freedom struggle", "museum", "kolkata", "history", "heritage"]
      },

      {
        name: "Howrah Bridge",
        description: "The Howrah Bridge, officially known as Rabindra Setu, is an iconic cantilever bridge spanning the Hooghly River. Built in 1943, this engineering marvel is one of the world's busiest bridges, carrying approximately 100,000 vehicles and countless pedestrians daily. The bridge looks particularly spectacular when illuminated at night.",
        shortDescription: "Iconic cantilever bridge over Hooghly River",
        category: "Bridges & Landmarks",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: "4.7",
        reviewCount: 42,
        entryFee: "Free",
        openHours: "24/7",
        location: "Howrah Bridge Rd, Kolkata, West Bengal",
        latitude: "22.5851",
        longitude: "88.3468",
        isTrending: true,
        isFeatured: true,
        contactNumber: "+91-33-2439-6638",
        website: "https://www.kopt.gov.in",
        amenities: ["Photography Points", "Walking Path", "Night Lighting"],
        bestTimeToVisit: "Early morning or evening for photography",
        nearestMetro: "Howrah Metro Station",
        parkingAvailable: false,
        wheelchairAccessible: true,
        guidedToursAvailable: false,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["bridge", "kolkata", "landmark", "river", "architecture"]
      },
      {
  "name": "Alipore Zoological Gardens",
  "description": "Established in 1876, Alipore Zoo is India's oldest zoological park and a major tourist attraction in Kolkata. Spanning over 46 acres, it houses a wide variety of animals including the Royal Bengal Tiger, Asiatic lions, elephants, reptiles, and exotic birds. The zoo is also home to a reptile house, aquarium, and a children's amusement area, making it ideal for family visits.",
  "shortDescription": "Historic zoo with diverse wildlife and children's attractions",
  "category": "Nature & Parks",
  "city": "Kolkata",
  "imageUrl": "https://indiano.travel/wp-content/uploads/2023/07/I-love-Alipore-Zoo-2.webp",
  "rating": "4.2",
  "reviewCount": 2100,
  "entryFee": "₹30 for Adults, ₹10 for Children",
  "openHours": "9:00 AM - 5:00 PM (Closed on Thursdays)",
  "location": "Belvedere Road, Alipore, Kolkata, West Bengal 700027",
  "latitude": "22.5362",
  "longitude": "88.3376",
  "isTrending": true,
  "isFeatured": false,
  "contactNumber": "+91-33-2479-2141",
  "website": "https://kolkatazoo.in",
  "amenities": ["Animal Enclosures", "Reptile House", "Aquarium", "Cafeteria", "Restrooms", "Wheelchair Access"],
  "bestTimeToVisit": "November to February",
  "nearestMetro": "Jatin Das Park Metro Station",
  "parkingAvailable": true,
  "wheelchairAccessible": true,
  "guidedToursAvailable": false,
  "languages": ["English", "Hindi", "Bengali"],
  "tags": ["zoo", "animals", "family", "nature", "kolkata"]
},
      {
        name: "New Market (Hogg Market)",
        description: "New Market, also known as Hogg Market, is a historic shopping destination established in 1874. This Victorian-era market houses over 2000 stalls selling everything from fresh produce to textiles, electronics, and souvenirs. The market's Gothic architecture and bustling atmosphere offer a unique shopping experience.",
        shortDescription: "Historic Victorian-era shopping complex",
        category: "Markets & Shopping",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1713781926047-5c7f8441bb6c?q=80&w=1069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: "4.4",
        reviewCount: 35,
        entryFee: "Free",
        openHours: "10:00 AM - 8:00 PM (Closed on Mondays)",
        location: "Lindsay Street, New Market Area, Kolkata",
        latitude: "22.5677",
        longitude: "88.3513",
        isTrending: false,
        isFeatured: true,
        contactNumber: "+91-33-2252-1699",
        website: null,
        amenities: ["Shopping Stalls", "Food Court", "Restrooms"],
        bestTimeToVisit: "Morning hours, avoid peak evening hours",
        nearestMetro: "Esplanade Metro Station",
        parkingAvailable: true,
        wheelchairAccessible: false,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["market", "shopping", "kolkata", "victorian", "bazaar"]
      },
      {
        name: "Park Street",
        description: "Park Street, known as 'Food Street', is Kolkata's premier dining destination. From historic restaurants like Flury's and Peter Cat to modern cafes and bars, it offers a diverse culinary experience. The street comes alive during Christmas and New Year celebrations with special decorations and food festivals.",
        shortDescription: "Kolkata's iconic food and entertainment street",
        category: "Food & Dining",
        city: "Kolkata",
        imageUrl: "https://assets.telegraphindia.com/telegraph/2022/Dec/1671658221_park-street.jpg",
        rating: "4.6",
        reviewCount: 48,
        entryFee: "Free (Individual restaurant prices vary)",
        openHours: "11:00 AM - 11:00 PM (Varies by establishment)",
        location: "Park Street, Kolkata, West Bengal",
        latitude: "22.5549",
        longitude: "88.3512",
        isTrending: true,
        isFeatured: true,
        contactNumber: null,
        website: null,
        amenities: ["Restaurants", "Cafes", "Bars", "Street Food", "Shopping"],
        bestTimeToVisit: "Evening hours, December for festivities",
        nearestMetro: "Park Street Metro Station",
        parkingAvailable: true,
        wheelchairAccessible: true,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["food", "street", "kolkata", "restaurants", "nightlife"]
      },
      {
        name: "Dakshineswar Kali Temple",
        description: "The Dakshineswar Kali Temple is a historic Hindu temple dedicated to Goddess Kali. Built in 1855, this architectural marvel features nine spires, intricate carvings, and a serene location by the Hooghly River. The temple complex includes twelve identical Shiva temples and is associated with Sri Ramakrishna, making it a significant spiritual and cultural landmark.",
        shortDescription: "Historic Kali temple by the Hooghly River",
        category: "Religious Sites",
        city: "Kolkata",
        imageUrl: "https://www.pilgrimagetour.in/blog/wp-content/uploads/2024/10/Dakshineswar-Kali-Temple.jpg",
        rating: "4.7",
        reviewCount: 55,
        entryFee: "Free",
        openHours: "6:00 AM - 12:30 PM, 3:00 PM - 8:30 PM",
        location: "Dakshineswar, Kolkata, West Bengal",
        latitude: "22.6575",
        longitude: "88.3573",
        isTrending: true,
        isFeatured: true,
        contactNumber: "+91-33-2564-5222",
        website: "http://www.dakshineswarkalitemple.org",
        amenities: ["Prayer Hall", "Meditation Area", "Prasad Counter", "River Ghat"],
        bestTimeToVisit: "Early morning or evening, avoid crowded festival days",
        nearestMetro: "Dakshineswar Metro Station",
        parkingAvailable: true,
        wheelchairAccessible: true,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["temple", "kali", "kolkata", "spiritual", "river"]
      },
      {
        name: "Science City",
        description: "Science City is India's largest science center, featuring interactive exhibits, a space theater, and dynamic exhibits on various scientific phenomena. The center includes attractions like the Space Odyssey, Evolution Park Theme Tour, and Maritime Centre. It offers an engaging blend of education and entertainment, making science accessible and fun for visitors of all ages.",
        shortDescription: "Interactive science museum with space theater",
        category: "Museums & Galleries",
        city: "Kolkata",
        imageUrl: "https://sciencecitykolkata.org.in/wp-content/uploads/2020/02/banner.jpg",
        rating: "4.5",
        reviewCount: 38,
        entryFee: "₹50 for General Entry, Additional for Special Shows",
        openHours: "9:00 AM - 8:00 PM (Closed on Mondays)",
        location: "JBS Haldane Avenue, East Kolkata Township, Kolkata",
        latitude: "22.5403",
        longitude: "88.3959",
        isTrending: false,
        isFeatured: true,
        contactNumber: "+91-33-2285-4343",
        website: "http://sciencecitykolkata.org.in",
        amenities: ["3D Theater", "Food Court", "Parking", "Gift Shop", "Wheelchair Access"],
        bestTimeToVisit: "Weekday mornings to avoid crowds",
        nearestMetro: "Science City Metro Station",
        parkingAvailable: true,
        wheelchairAccessible: true,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["science", "museum", "kolkata", "education", "family"]
      },
      {
        name: "Kalighat Temple",
        description: "Kalighat Kali Temple is a Hindu temple dedicated to the Hindu goddess Kali. It is one of the 51 Shakti Peethas. The temple is located in Kalighat, Kolkata, West Bengal, India. It was built in 1809.",
        shortDescription: "Sacred Hindu temple dedicated to Goddess Kali",
        category: "Temple",
        city: "Kolkata",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQns1bjietnbXDpBih2hCUaejwPU2xe2huxIA&s",
        rating: "4.5",
        reviewCount: 6700,
        entryFee: "Free",
        openHours: "5:00 AM - 10:30 PM",
        location: "Kalighat, Kolkata",
        latitude: "22.5205",
        longitude: "88.3399",
        isTrending: false,
        isFeatured: true,
        contactNumber: null,
        website: null,
        amenities: ["Prayer Hall", "Prasad Counter", "Shops"],
        bestTimeToVisit: "Festivals, early morning",
        nearestMetro: "Kalighat Metro Station",
        parkingAvailable: false,
        wheelchairAccessible: false,
        guidedToursAvailable: false,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["temple", "kali", "kolkata", "spiritual", "pilgrimage"]
      },
      {
        name: "Eden Gardens",
        description: "Eden Gardens is a cricket ground in Kolkata, India. It is the home of the Bengal cricket team and the Indian Premier League's Kolkata Knight Riders, as well as being a Test, One Day International and Twenty20 International ground.",
        shortDescription: "Historic cricket stadium",
        category: "Sports",
        city: "Kolkata",
        imageUrl: "https://www.india.com/wp-content/uploads/2018/08/16-kolkata-eden-gardens-3-1.jpg",
        rating: "4.5",
        reviewCount: 3200,
        entryFee: "Match dependent",
        openHours: "Match days only",
        location: "Eden Gardens, Kolkata",
        latitude: "22.5649",
        longitude: "88.3434",
        isTrending: true,
        isFeatured: false,
        contactNumber: null,
        website: null,
        amenities: ["Stadium", "Shops", "Food Court"],
        bestTimeToVisit: "During matches",
        nearestMetro: "Eden Gardens Metro Station",
        parkingAvailable: true,
        wheelchairAccessible: true,
        guidedToursAvailable: false,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["stadium", "cricket", "kolkata", "sports", "match"]
      },
      {
        name: "Indian Museum",
        description: "The Indian Museum is a massive museum in Central Kolkata, West Bengal, India. It is the ninth oldest museum in the world and the oldest and largest museum in India and Asia.",
        shortDescription: "Oldest museum in India with vast collections",
        category: "Museum",
        city: "Kolkata",
        imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/indian-museum-kolkata-wb-1-attr-hero?qlt=82&ts=1726644009949",
        rating: "4.4",
        reviewCount: 2800,
        entryFee: "₹20",
        openHours: "10:00 AM - 5:00 PM",
        location: "Park Street, Kolkata",
        latitude: "22.5579",
        longitude: "88.3511",
        isTrending: true,
        isFeatured: true,
        contactNumber: null,
        website: null,
        amenities: ["Museum", "Cafe", "Gift Shop"],
        bestTimeToVisit: "Weekdays",
        nearestMetro: "Park Street Metro Station",
        parkingAvailable: true,
        wheelchairAccessible: true,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["museum", "kolkata", "history", "artifacts", "heritage"]
      },
      // --- Darjeeling ---
      {
        name: "Darjeeling Himalayan Railway",
        description: "The Darjeeling Himalayan Railway, also known as the 'Toy Train', is a UNESCO World Heritage Site that offers a mesmerizing journey through the mountains. This narrow-gauge railway, built between 1879 and 1881, uses innovative engineering solutions to navigate the steep terrain, offering breathtaking views of the Himalayas and tea gardens.",
        shortDescription: "Historic UNESCO World Heritage mountain railway",
        category: "Heritage Sites",
        city: "Darjeeling",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/0e/5b/5e/darjeeling-himalayan.jpg?w=1200&h=-1&s=1",
        rating: "4.7",
        reviewCount: 38,
        entryFee: "₹1,420 for Joy Rides",
        openHours: "8:00 AM - 4:00 PM (Daily)",
        location: "Darjeeling Railway Station, Hill Cart Road, Darjeeling",
        latitude: "27.0410",
        longitude: "88.2663",
        isTrending: true,
        isFeatured: true,
        contactNumber: "+91-354-2252555",
        website: "https://www.irctc.co.in",
        amenities: ["Heritage Train Rides", "Photo Points", "Souvenir Shop"],
        bestTimeToVisit: "March to June, September to December",
        nearestMetro: null,
        parkingAvailable: true,
        wheelchairAccessible: false,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali", "Nepali"],
        tags: ["railway", "heritage", "darjeeling", "toy train", "unesco"]
      },
      {
        name: "Tiger Hill",
        description: "Tiger Hill is famous for its stunning sunrise views over the Kanchenjunga mountain range. At an altitude of 2,590 meters, it offers panoramic vistas of the eastern Himalayas, including Mount Everest on clear days. The first rays of the sun creating a golden glow on the snow-capped peaks is a breathtaking spectacle.",
        shortDescription: "Scenic viewpoint for Himalayan sunrise",
        category: "Nature & Parks",
        city: "Darjeeling",
        imageUrl: "https://www.dreamwanderlust.com/post_images/sunrise_tiger_hill.jpg",
        rating: "4.8",
        reviewCount: 40,
        entryFee: "₹40 per person",
        openHours: "4:00 AM - 6:00 PM (Best visited for sunrise)",
        location: "Tiger Hill, Darjeeling, West Bengal",
        latitude: "27.0472",
        longitude: "88.2631",
        isTrending: true,
        isFeatured: true,
        contactNumber: "+91-354-2252358",
        website: null,
        amenities: ["Viewing Platform", "Parking", "Small Cafe", "Telescope"],
        bestTimeToVisit: "October to December (Clear skies)",
        nearestMetro: null,
        parkingAvailable: true,
        wheelchairAccessible: false,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali", "Nepali"],
        tags: ["hill", "sunrise", "darjeeling", "nature", "viewpoint"]
      },
      {
        name: "Happy Valley Tea Estate",
        description: "Happy Valley Tea Estate, established in 1854, is one of Darjeeling's oldest and most picturesque tea gardens. Situated at an altitude of 6,800 feet, it offers guided tours of tea processing, tea tasting sessions, and stunning views of the Himalayan landscape. Visitors can learn about the art of tea making and purchase authentic Darjeeling tea.",
        shortDescription: "Historic tea garden with guided tours and tasting",
        category: "Tea Gardens",
        city: "Darjeeling",
        imageUrl: "https://images.unsplash.com/photo-1523920290228-4f321a939b4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.5",
        reviewCount: 32,
        entryFee: "₹100 (Includes guided tour)",
        openHours: "8:00 AM - 4:30 PM (Closed on Sundays)",
        location: "Happy Valley Tea Estate, Darjeeling, West Bengal",
        latitude: "27.0389",
        longitude: "88.2639",
        isTrending: true,
        isFeatured: true,
        contactNumber: "+91-354-2252418",
        website: "http://www.happyvalleytea.com",
        amenities: ["Guided Tours", "Tea Tasting", "Shop", "Photography Points"],
        bestTimeToVisit: "March to November (Tea plucking season)",
        nearestMetro: null,
        parkingAvailable: true,
        wheelchairAccessible: false,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali", "Nepali"],
        tags: ["tea", "estate", "darjeeling", "tour", "garden"]
      },
      {
        name: "Darjeeling Tea Gardens",
        description: "The tea gardens of Darjeeling produce the finest black teas in the world. The combination of high altitude, cool temperatures, and unique soil conditions create the perfect environment for growing premium tea leaves with a distinctive muscatel flavor.",
        shortDescription: "Premium tea gardens in the Himalayas",
        category: "Nature",
        city: "Darjeeling",
        imageUrl: "https://images.unsplash.com/photo-1605106715994-18d3fecffb98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.7",
        reviewCount: 3400,
        entryFee: "₹100",
        openHours: "9:00 AM - 5:00 PM",
        location: "Darjeeling Hills",
        latitude: "27.0360",
        longitude: "88.2627",
        isTrending: true,
        isFeatured: true,
        contactNumber: null,
        website: null,
        amenities: ["Tea Tasting", "Guided Tours", "Photography Points"],
        bestTimeToVisit: "March to November",
        nearestMetro: null,
        parkingAvailable: true,
        wheelchairAccessible: false,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali", "Nepali"],
        tags: ["tea", "garden", "darjeeling", "nature", "tour"]
      },
      // --- Sundarbans ---
      {
        name: "Sundarbans National Park",
        description: "The Sundarbans is the world's largest mangrove forest and a UNESCO World Heritage Site. Home to the Royal Bengal Tiger, this unique ecosystem features a complex network of tidal waterways, mudflats, and small islands covered with mangrove forests. The park offers boat safaris, wildlife watching, and a glimpse into the delicate balance of nature.",
        shortDescription: "World's largest mangrove forest & tiger reserve",
        category: "Wildlife Sanctuaries",
        city: "Sundarbans",
        imageUrl: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.6",
        reviewCount: 45,
        entryFee: "₹600 for Indians, ₹1200 for Foreigners (Park Entry)",
        openHours: "6:00 AM - 5:00 PM (Closed during monsoons)",
        location: "Sundarbans National Park, South 24 Parganas, West Bengal",
        latitude: "21.9497",
        longitude: "88.9195",
        isTrending: true,
        isFeatured: true,
        contactNumber: "+91-33-2248-5547",
        website: "http://www.sundarbanbiosphere.org",
        amenities: ["Boat Safari", "Watch Towers", "Guide Services", "Forest Rest Houses"],
        bestTimeToVisit: "October to March",
        nearestMetro: null,
        parkingAvailable: true,
        wheelchairAccessible: false,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["wildlife", "tiger", "mangrove", "sundarbans", "nature"]
      },
      // --- Mandarmani ---
      {
        name: "Mandarmani Beach",
        description: "Mandarmani is one of the longest driveable beaches in India, offering 13 kilometers of pristine coastline. Known for its red crabs, peaceful atmosphere, and water sports activities, it's a perfect weekend getaway. The beach offers spectacular sunrises and sunsets, while the surrounding area features numerous resorts and seafood restaurants.",
        shortDescription: "Longest driveable beach with water sports",
        category: "Beaches",
        city: "Mandarmani",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        reviewCount: 42,
        entryFee: "Free (Activities priced separately)",
        openHours: "24/7",
        location: "Mandarmani Beach, Purba Medinipur, West Bengal",
        latitude: "21.6674",
        longitude: "87.7067",
        isTrending: true,
        isFeatured: false,
        contactNumber: null,
        website: null,
        amenities: ["Water Sports", "Beach Activities", "Restaurants", "Parking"],
        bestTimeToVisit: "October to February",
        nearestMetro: null,
        parkingAvailable: true,
        wheelchairAccessible: false,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["beach", "sea", "mandarmani", "weekend", "water sports"]
      },
      // --- Bishnupur ---
      {
        name: "Bishnupur Terracotta Temples",
        description: "The Terracotta Temples of Bishnupur, built between the 17th and 18th centuries, showcase the unique architectural style of Bengal. These temples feature intricate terracotta sculptures depicting scenes from the Ramayana and Mahabharata. The Rasmancha, Jor Bangla, and Shyam Rai temples are particularly notable for their detailed craftsmanship.",
        shortDescription: "Ancient terracotta temples with intricate carvings",
        category: "Heritage Sites",
        city: "Bishnupur",
        imageUrl: "https://images.unsplash.com/photo-1590059300829-fb5f0b6a41e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.7",
        reviewCount: 34,
        entryFee: "₹25 for Indians, ₹300 for Foreigners",
        openHours: "9:00 AM - 5:00 PM (Closed on Fridays)",
        location: "Bishnupur, Bankura District, West Bengal",
        latitude: "23.0795",
        longitude: "87.3198",
        isTrending: false,
        isFeatured: true,
        contactNumber: "+91-3244-252060",
        website: "http://www.westbengaltourism.gov.in",
        amenities: ["Guide Service", "Museum", "Souvenir Shop", "Rest Area"],
        bestTimeToVisit: "October to March",
        nearestMetro: null,
        parkingAvailable: true,
        wheelchairAccessible: false,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["temple", "terracotta", "bishnupur", "heritage", "architecture"]
      },
      // --- Shantiniketan ---
      {
        name: "Shantiniketan",
        description: "Shantiniketan, founded by Rabindranath Tagore, is a unique cultural and educational hub. Home to Visva-Bharati University, it offers visitors a glimpse into Bengali art, culture, and education. The campus features beautiful murals, sculptures, and architecture, while regular cultural events and the famous Poush Mela showcase traditional Bengali arts and crafts.",
        shortDescription: "Cultural town founded by Rabindranath Tagore",
        category: "Cultural Centers",
        city: "Shantiniketan",
        imageUrl: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.6",
        reviewCount: 36,
        entryFee: "₹20 for Museum Entry",
        openHours: "6:00 AM - 6:00 PM (University timings vary)",
        location: "Shantiniketan, Birbhum District, West Bengal",
        latitude: "23.6826",
        longitude: "87.6841",
        isTrending: true,
        isFeatured: true,
        contactNumber: "+91-3463-262751",
        website: "http://www.visvabharati.ac.in",
        amenities: ["Museum", "Art Galleries", "Cafeteria", "Souvenir Shops"],
        bestTimeToVisit: "October to March, December for Poush Mela",
        nearestMetro: null,
        parkingAvailable: true,
        wheelchairAccessible: true,
        guidedToursAvailable: true,
        languages: ["English", "Hindi", "Bengali"],
        tags: ["culture", "tagore", "university", "art", "bengal"]
      }
    ];

    attractionsData.forEach((attraction, index) => {
      const id = this.currentAttractionId++;
      this.attractions.set(id, { ...attraction, id });
    });

    // Seed events
    const eventsData: Omit<Event, 'id'>[] = [
      {
        title: "Durga Puja Festival 2024",
        description: "Bengal's biggest festival with grand pandals, cultural shows, and traditional celebrations.",
        category: "Festival",
        city: "Kolkata",
        venue: "Multiple Locations",
        imageUrl: "https://thewandertherapy.com/wp-content/uploads/2023/10/3.durga-puja-kolkata.jpg",
        startDate: new Date("2024-10-12"),
        endDate: new Date("2024-10-16"),
        price: "Free",
        isBookable: false,
        organizer: "Durga Puja Committee"
      },
      {
        title: "Kolkata International Film Festival 2024",
        description: "Annual film festival showcasing international and Bengali cinema.",
        category: "Film",
        city: "Kolkata",
        venue: "Nandan Cinema",
        imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-11-10"),
        endDate: new Date("2024-11-17"),
        price: "₹1000",
        isBookable: true,
        organizer: "West Bengal Film Development Corporation"
      },
      {
        title: "Poush Mela 2024",
        description: "Traditional fair celebrating Bengali culture, arts, and crafts.",
        category: "Cultural",
        city: "Shantiniketan",
        venue: "Visva-Bharati University",
        imageUrl: "https://assets.telegraphindia.com/telegraph/2023/Dec/1702306658_new-project-5.jpg0",
        startDate: new Date("2024-12-23"),
        endDate: new Date("2024-12-25"),
        price: "₹100",
        isBookable: true,
        organizer: "Visva-Bharati University"
      },
      {
        title: "Live Jazz Night",
        description: "Experience an evening of soulful jazz music with renowned Bengali musicians.",
        category: "Music",
        city: "Kolkata",
        venue: "Trincas",
        imageUrl: "https://rollingstoneindia.com/wp-content/uploads/2024/04/Willie-Walters-Quartet-at-Trincas-scaled.jpg",
        startDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        price: "₹500",
        isBookable: true,
        organizer: "Jazz Music Society"
      },
      {
        title: "Cafe Poetry Evening",
        description: "Join us for an evening of poetry recitation and storytelling in a cozy cafe setting.",
        category: "Cultural",
        city: "Kolkata",
        venue: "Coffee & Poetry Cafe",
        imageUrl: "https://b.zmtcdn.com/data/pictures/9/19088819/d05ec6bdc3d3b3900659551f12c36e83.jpeg?fit=around|750:500&crop=750:500;*,*",
        startDate: new Date(new Date().setDate(new Date().getDate() + 4)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
        price: "₹200",
        isBookable: true,
        organizer: "Literary Circle"
      },
      {
        title: "Adventure Sports Day",
        description: "A day filled with exciting adventure sports activities including rock climbing and zip-lining.",
        category: "Adventure",
        city: "Kolkata",
        venue: "Adventure Sports Complex",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/66/de/78/cyclone-wooden-roller.jpg?w=900&h=500&s=1",
        startDate: new Date(new Date().setDate(new Date().getDate() + 6)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
        price: "₹1500",
        isBookable: true,
        organizer: "Adventure Sports Club"
      },
      {
        title: "Weekend Art Workshop",
        description: "Learn traditional Bengali art forms including Patachitra and Kantha embroidery.",
        category: "Art",
        city: "Kolkata",
        venue: "Academy of Fine Arts",
        imageUrl: "https://imgmedia.lbb.in/media/2019/05/5cd95ad0b3482641e7934721_1557748432286.jpg",
        startDate: new Date(new Date().setDate(new Date().getDate() + 5)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
        price: "₹800",
        isBookable: true,
        organizer: "Bengal Art Academy"
      },
      {
        title: "Bengali Food Festival",
        description: "Experience the rich culinary heritage of Bengal with traditional dishes and cooking demonstrations.",
        category: "Food",
        city: "Kolkata",
        venue: "Swissotel",
        imageUrl: "https://www.india-tours.com/images/festivals/naba-barsha/naba-barsha-west-bengal.jpg",
        startDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
        price: "₹1200",
        isBookable: true,
        organizer: "Bengal Culinary Association"
      },
      {
        title: "Kolkata Marathon 2024",
        description: "Join the annual Kolkata Marathon featuring various categories including full marathon, half marathon, and fun run.",
        category: "Sports",
        city: "Kolkata",
        venue: "Victoria Memorial Grounds",
        imageUrl: "https://assets.telegraphindia.com/telegraph/2024/Jan/1706014562_lead-75.jpg",
        startDate: new Date("2024-01-21"),
        endDate: new Date("2024-01-21"),
        price: "₹500 - ₹2000",
        isBookable: true,
        organizer: "Kolkata Sports Association",
      },
      {
        title: "Bengal Folk Dance Performance",
        description: "Traditional Bengali folk dance performance featuring authentic costumes, music, and storytelling that showcases the rich cultural heritage of West Bengal.",
        category: "Cultural",
        city: "Kolkata",
        venue: "Rabindra Sadan",
        imageUrl: "https://flyopedia.ca/wp-content/uploads/2024/02/Brita-Dance.jpg",
        startDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
        price: "₹500 - ₹1500",
        isBookable: true,
        organizer: "Bengal Cultural Society",
      },
      {
        title: "Rabindra Sangeet Evening",
        description: "An enchanting evening of Tagore's music performed by renowned artists, celebrating the poetic genius of Rabindranath Tagore.",
        category: "Music",
        city: "Kolkata",
        venue: "Nandan Cultural Complex",
        imageUrl: "https://www.hemsworthsbackalright.com/wp-content/uploads/2021/06/Hindustani-and-Carnatic-Music.png",
        startDate: new Date("2024-11-25"),
        endDate: new Date("2024-11-25"),
        price: "₹300 - ₹800",
        isBookable: true,
        organizer: "Tagore Society",
      },
      {
        title: "Kali Puja Celebration",
        description: "Traditional celebration of Goddess Kali with elaborate decorations, cultural programs, and spiritual ceremonies across the city.",
        category: "Festival",
        city: "Kolkata",
        venue: "Various locations",
        imageUrl: "https://mediaindia.eu/wp-content/uploads/2019/10/kalipuja-story-image-1.jpg",
        startDate: new Date("2025-11-14"),
        endDate: new Date("2025-11-14"),
        price: "Free",
        isBookable: false,
        organizer: "Local Communities",
      },
      {
        title: "Darjeeling Tea Festival",
        description: "Annual celebration of Darjeeling's famous tea culture with tastings, workshops, and cultural performances in the beautiful hill station.",
        category: "Festival",
        city: "Darjeeling",
        venue: "Darjeeling Tea Gardens",
        imageUrl: "https://www.goldentipstea.in/cdn/shop/articles/darjeeling-banner-min_1024x.jpg?v=1574403406",
        startDate: new Date("2025-12-05"),
        endDate: new Date("2025-12-07"),
        price: "₹1000 - ₹2500",
        isBookable: true,
        organizer: "Darjeeling Tea Association",
      },
      {
        title: "Poila Boishakh Celebration",
        description: "Bengali New Year celebration with traditional music, dance, cultural programs, and authentic Bengali cuisine across the city.",
        category: "Festival",
        city: "Kolkata",
        venue: "Multiple venues across Kolkata",
        imageUrl: "https://images.news18.com/ibnlive/uploads/2025/04/Pohela-Boishakh-2025-Date-And-Time-2025-04-8d43c8a6a58b6172b533cd77ab7edbce-16x9.jpg?impolicy=website&width=640&height=360",
        startDate: new Date("2024-04-14"),
        endDate: new Date("2024-04-15"),
        price: "Free",
        isBookable: false,
        organizer: "Cultural Organizations",
      },
      {
        title: "Kolkata Book Fair",
        description: "One of the largest non-trade book fairs in the world, featuring publishers from across India and book readings, discussions, and cultural events.",
        category: "Literature",
        city: "Kolkata",
        venue: "Milan Mela Prangan",
        imageUrl: "https://www.hindustantimes.com/ht-img/img/2023/02/23/550x309/The-46th-International-Kolkata-Book-fair---Swapan-_1677137847970.jpg",
        startDate: new Date("2024-01-30"),
        endDate: new Date("2024-02-11"),
        price: "₹20",
        isBookable: false,
        organizer: "Publishers & Booksellers Guild",
      },
      {
        title: "Dover Lane Music Festival",
        description: "Prestigious classical music festival featuring renowned Indian classical musicians performing in an intimate outdoor setting.",
        category: "Music",
        city: "Kolkata",
        venue: "Dover Lane Music Conference",
        imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-01-20"),
        endDate: new Date("2024-01-25"),
        price: "₹100 - ₹500",
        isBookable: true,
        organizer: "Dover Lane Music Conference",
      },
      {
        title: "Ganga Aarti at Dakshineswar",
        description: "Daily evening prayer ceremony at the sacred Dakshineswar Kali Temple with traditional rituals and spiritual atmosphere.",
        category: "Religious",
        city: "Kolkata",
        venue: "Dakshineswar Kali Temple",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-12-01"),
        endDate: new Date("2024-12-31"),
        price: "Free",
        isBookable: false,
        organizer: "Temple Committee",
      },
      {
        title: "Handicrafts Fair",
        description: "Exhibition and sale of traditional West Bengal handicrafts including terracotta, handloom textiles, and dokra metalwork.",
        category: "Art",
        city: "Kolkata",
        venue: "Science City",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-12-15"),
        endDate: new Date("2024-12-20"),
        price: "₹50",
        isBookable: false,
        organizer: "West Bengal Handicrafts Board",
      },
      {
        title: "Baul Folk Music Festival",
        description: "Traditional Baul folk music festival featuring mystic minstrels of Bengal performing spiritual songs with unique instruments.",
        category: "Music",
        city: "Shantiniketan",
        venue: "Visva-Bharati University",
        imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-11-10"),
        endDate: new Date("2024-11-12"),
        price: "₹200 - ₹800",
        isBookable: true,
        organizer: "Baul Sangha",
      },
      {
        title: "Jagaddhatri Puja",
        description: "Grand celebration of Goddess Jagaddhatri with magnificent pandals, cultural programs, and traditional rituals.",
        category: "Festival",
        city: "Chandannagar",
        venue: "Various Pandals",
        imageUrl: "https://images.unsplash.com/photo-1542718610-8b57c8bfb02c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-11-20"),
        endDate: new Date("2024-11-22"),
        price: "Free",
        isBookable: false,
        organizer: "Local Committees",
      },
      {
        title: "Street Food Festival",
        description: "Celebration of Bengali street food culture featuring authentic dishes from different regions of West Bengal.",
        category: "Food",
        city: "Kolkata",
        venue: "Eco Park",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-12-28"),
        endDate: new Date("2024-12-30"),
        price: "₹100",
        isBookable: true,
        organizer: "Food Lovers Association",
      },
      {
        title: "Dhak Competition",
        description: "Traditional dhak (drum) playing competition featuring master drummers from across Bengal.",
        category: "Cultural",
        city: "Kolkata",
        venue: "Rabindra Sadan",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-10-20"),
        endDate: new Date("2024-10-20"),
        price: "₹150",
        isBookable: true,
        organizer: "Cultural Heritage Society",
      },
      {
        title: "Boat Race Festival",
        description: "Traditional boat racing competition on the Ganges with colorful boats and enthusiastic participants.",
        category: "Sports",
        city: "Kolkata",
        venue: "Hooghly River",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-12-10"),
        endDate: new Date("2024-12-10"),
        price: "Free",
        isBookable: false,
        organizer: "River Sports Association",
      },
      {
        title: "Classical Dance Recital",
        description: "Evening of classical Indian dance forms including Bharatanatyam, Odissi, and Kathak performed by renowned artists.",
        category: "Dance",
        city: "Kolkata",
        venue: "Kala Mandir",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-11-30"),
        endDate: new Date("2024-11-30"),
        price: "₹500 - ₹1200",
        isBookable: true,
        organizer: "Classical Dance Society",
      },
      {
        title: "Heritage Walk",
        description: "Guided heritage walk through the historic lanes of old Kolkata exploring colonial architecture and stories.",
        category: "Cultural",
        city: "Kolkata",
        venue: "North Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-12-08"),
        endDate: new Date("2024-12-08"),
        price: "₹300",
        isBookable: true,
        organizer: "Heritage Preservation Society",
      },
      {
        title: "Photowalk in Sundarbans",
        description: "Photography expedition in the Sundarbans mangrove forests capturing wildlife and natural beauty.",
        category: "Photography",
        city: "Sundarbans",
        venue: "Sundarbans National Park",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-12-12"),
        endDate: new Date("2024-12-14"),
        price: "₹2500",
        isBookable: true,
        organizer: "Photography Club Bengal",
      },
      {
        title: "Textile Exhibition",
        description: "Showcase of traditional Bengali textiles including silk sarees, handloom fabrics, and embroidered garments.",
        category: "Art",
        city: "Kolkata",
        venue: "Bengal Gallery",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-12-05"),
        endDate: new Date("2024-12-15"),
        price: "₹80",
        isBookable: false,
        organizer: "Textile Artisans Guild",
      }
    ];

    eventsData.forEach((event, index) => {
      this.events.set(index + 1, {
        ...event,
        id: index + 1,
        startDate: new Date(event.startDate),
        endDate: event.endDate ? new Date(event.endDate) : null,
      });
    });

    // Seed offers
    const offersData: Omit<Offer, 'id'>[] = [
      {
        title: "Premium Restaurant Week: 40% OFF",
        description: "Exclusive discount at top-rated Bengali restaurants across Kolkata",
        category: "Restaurants",
        discountPercentage: 40,
        discountAmount: null,
        code: "RESTO40",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 30)),
        isActive: true,
        backgroundColor: "from-red-500 to-red-600"
      },
      {
        title: "Shopping Festival: Up to 50% OFF",
        description: "Massive discounts at participating shopping malls and local markets",
        category: "Shopping",
        discountPercentage: 50,
        discountAmount: null,
        code: "SHOP50",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 25)),
        isActive: true,
        backgroundColor: "from-pink-500 to-pink-600"
      },
      {
        title: "Local Transport Pass: 25% OFF",
        description: "Special discount on daily and weekly local transport passes",
        category: "LocalTransport",
        discountPercentage: 25,
        discountAmount: null,
        code: "LOCAL25",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 45)),
        isActive: true,
        backgroundColor: "from-cyan-500 to-cyan-600"
      },
      {
        title: "Train Travel: ₹1000 OFF",
        description: "Special discount on luxury train packages and heritage train tours",
        category: "Train",
        discountPercentage: null,
        discountAmount: "1000",
        code: "TRAIN1K",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 60)),
        isActive: true,
        backgroundColor: "from-slate-500 to-slate-600"
      },
      {
        title: "Car Rental: 35% OFF",
        description: "Discount on car rentals for city tours and intercity travel",
        category: "CarRental",
        discountPercentage: 35,
        discountAmount: null,
        code: "CAR35",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 30)),
        isActive: true,
        backgroundColor: "from-zinc-500 to-zinc-600"
      },
      {
        title: "Bike Tours: 20% OFF",
        description: "Special discount on bike rentals and guided bike tours",
        category: "BikeRental",
        discountPercentage: 20,
        discountAmount: null,
        code: "BIKE20",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 40)),
        isActive: true,
        backgroundColor: "from-lime-500 to-lime-600"
      },
      {
        title: "Photography Tours: 30% OFF",
        description: "Discount on photography tours and workshops across West Bengal",
        category: "Photography",
        discountPercentage: 30,
        discountAmount: null,
        code: "PHOTO30",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 35)),
        isActive: true,
        backgroundColor: "from-rose-500 to-rose-600"
      },
      {
        title: "Entertainment Package: 45% OFF",
        description: "Special discount on entertainment venues and shows",
        category: "Entertainment",
        discountPercentage: 45,
        discountAmount: null,
        code: "ENTERTAIN45",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 25)),
        isActive: true,
        backgroundColor: "from-violet-500 to-violet-600"
      },
      {
        title: "Air Travel: ₹2000 OFF",
        description: "Discount on domestic flights within West Bengal",
        category: "AirTravel",
        discountPercentage: null,
        discountAmount: "2000",
        code: "AIR2K",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 30)),
        isActive: true,
        backgroundColor: "from-sky-500 to-sky-600"
      },
      {
        title: "Durga Puja Special: 40% OFF Hotels",
        description: "Special hotel discounts during Durga Puja festival season",
        category: "Hotels",
        discountPercentage: 40,
        discountAmount: null,
        code: "PUJA40",
        validUntil: new Date("2024-10-20"),
        isActive: true,
        backgroundColor: "from-rose-500 to-rose-600"
      },
      {
        title: "Winter Package: ₹5000 OFF",
        description: "Huge savings on winter vacation packages in Darjeeling and Kalimpong",
        category: "Tours",
        discountPercentage: null,
        discountAmount: "5000",
        code: "WINTER5K",
        validUntil: new Date("2024-12-31"),
        isActive: true,
        backgroundColor: "from-teal-500 to-teal-600"
      },
      {
        title: "Cultural Events Pass: 35% OFF",
        description: "Special discount on cultural event passes during Poush Mela",
        category: "Events",
        discountPercentage: 35,
        discountAmount: null,
        code: "CULTURE35",
        validUntil: new Date("2024-12-25"),
        isActive: true,
        backgroundColor: "from-violet-500 to-violet-600"
      },
      {
        title: "Cafe Happy Hours: 30% OFF",
        description: "Get 30% off on all beverages and snacks during happy hours (2 PM - 6 PM)",
        category: "Cafes",
        discountPercentage: 30,
        discountAmount: null,
        code: "CAFE30",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 15)),
        isActive: true,
        backgroundColor: "from-cyan-500 to-cyan-600"
      },
      {
        title: "Music Festival Pass: 25% OFF",
        description: "Special discount on all music festival passes and concert tickets",
        category: "Music",
        discountPercentage: 25,
        discountAmount: null,
        code: "MUSIC25",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 20)),
        isActive: true,
        backgroundColor: "from-indigo-500 to-indigo-600"
      },
      {
        title: "Adventure Package: ₹1500 OFF",
        description: "Special discount on adventure sports and activities packages",
        category: "Adventure",
        discountPercentage: null,
        discountAmount: "1500",
        code: "ADVENTURE1500",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 12)),
        isActive: true,
        backgroundColor: "from-emerald-500 to-emerald-600"
      },
      {
        title: "Flash Sale: 70% OFF Tours",
        description: "Limited time offer on all guided city tours in Kolkata",
        category: "Tours",
        discountPercentage: 70,
        discountAmount: null,
        code: "FLASH70",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 7)),
        isActive: true,
        backgroundColor: "from-blue-500 to-blue-600"
      },
      {
        title: "Early Bird Special: 40% OFF Events",
        description: "Book any cultural event tickets in advance and save big",
        category: "Events",
        discountPercentage: 40,
        discountAmount: null,
        code: "EARLY40",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 10)),
        isActive: true,
        backgroundColor: "from-yellow-500 to-yellow-600"
      },
      {
        title: "Weekend Getaway: ₹2000 OFF",
        description: "Special discount on weekend hotel bookings in any city",
        category: "Hotels",
        discountPercentage: null,
        discountAmount: "2000",
        code: "WEEKEND2K",
        validUntil: new Date(new Date().setDate(new Date().getDate() + 5)),
        isActive: true,
        backgroundColor: "from-pink-500 to-pink-600"
      },
      {
        title: "50% OFF Heritage Hotels",
        description: "Book heritage hotels in West Bengal and save up to 50% on your stay",
        category: "Hotels",
        discountPercentage: 50,
        discountAmount: null,
        code: "HERITAGE50",
        validUntil: new Date("2024-12-31"),
        isActive: true,
        backgroundColor: "from-green-500 to-green-600",
      },
      {
        title: "Buy 2 Get 1 Free Food Tours",
        description: "Experience authentic Bengali cuisine with our special food tour package",
        category: "Food",
        discountPercentage: null,
        discountAmount: null,
        code: "FOODTOUR3",
        validUntil: new Date("2024-11-30"),
        isActive: true,
        backgroundColor: "from-orange-500 to-orange-600",
      },
      {
        title: "30% OFF Tea Garden Tours",
        description: "Explore Darjeeling's famous tea gardens with exclusive weekend discounts",
        category: "Tours",
        discountPercentage: 30,
        discountAmount: null,
        code: "TEATOUR30",
        validUntil: new Date("2024-12-15"),
        isActive: true,
        backgroundColor: "from-purple-500 to-purple-600",
      },
      {
        title: "20% OFF Restaurant Bills",
        description: "Get discount on authentic Bengali restaurants across Kolkata",
        category: "Restaurants",
        discountPercentage: 20,
        discountAmount: null,
        code: "BENGALIFOOD20",
        validUntil: new Date("2024-12-25"),
        isActive: true,
        backgroundColor: "from-red-500 to-red-600",
      },
      {
        title: "Free River Cruise",
        description: "Book Sundarbans tour and get complimentary Hooghly river cruise",
        category: "Tours",
        discountPercentage: null,
        discountAmount: null,
        code: "RIVERCRUISE",
        validUntil: new Date("2025-01-15"),
        isActive: true,
        backgroundColor: "from-blue-500 to-blue-600",
      },
      {
        title: "₹500 OFF Handicrafts",
        description: "Shop traditional West Bengal handicrafts with instant cashback",
        category: "Shopping",
        discountPercentage: null,
        discountAmount: "500",
        code: "CRAFT500",
        validUntil: new Date("2024-12-20"),
        isActive: true,
        backgroundColor: "from-yellow-500 to-yellow-600",
      },
      {
        title: "Family Package Deal",
        description: "Book family packages for Darjeeling and save up to 40%",
        category: "Family",
        discountPercentage: 40,
        discountAmount: null,
        code: "FAMILY40",
        validUntil: new Date("2024-12-31"),
        isActive: true,
        backgroundColor: "from-indigo-500 to-indigo-600",
      },
      {
        title: "Sweet Shop Special",
        description: "25% off on famous Bengali sweets from renowned shops",
        category: "Sweets",
        discountPercentage: 25,
        discountAmount: null,
        code: "SWEET25",
        validUntil: new Date("2024-11-30"),
        isActive: true,
        backgroundColor: "from-pink-500 to-pink-600",
      },
      {
        title: "Transport Discount",
        description: "Book local transport and rickshaw rides with 15% savings",
        category: "Transport",
        discountPercentage: 15,
        discountAmount: null,
        code: "TRANSPORT15",
        validUntil: new Date("2025-01-31"),
        isActive: true,
        backgroundColor: "from-teal-500 to-teal-600",
      },
      {
        title: "Photography Tour",
        description: "Professional photography tours in heritage locations at 30% off",
        category: "Photography",
        discountPercentage: 30,
        discountAmount: null,
        code: "PHOTO30",
        validUntil: new Date("2024-12-15"),
        isActive: true,
        backgroundColor: "from-gray-500 to-gray-600",
      }
    ];

    offersData.forEach((offer, index) => {
      this.offers.set(index + 1, {
        ...offer,
        id: index + 1,
        validUntil: new Date(offer.validUntil),
      });
    });

    // Seed restaurants
    const restaurantsData: Omit<Restaurant, 'id'>[] = [
      {
        name: "Oh! Calcutta",
        description: "Authentic Bengali cuisine in an elegant setting with traditional recipes and modern presentation.",
        cuisine: "Bengali",
        city: "Kolkata",
        address: "Forum Mall, Elgin Road, Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.3",
        reviewCount: 1250,
        priceRange: "₹800-1200",
        openHours: "12:00 PM - 10:30 PM",
        phoneNumber: "+91-33-4040-8080",
        latitude: "22.5448",
        longitude: "88.3534",
        isRecommended: true,
      },
      {
        name: "Bhojohori Manna",
        description: "Home-style Bengali cooking with traditional flavors and authentic preparation methods.",
        cuisine: "Bengali",
        city: "Kolkata",
        address: "Elgin Road, Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.1",
        reviewCount: 890,
        priceRange: "₹400-600",
        openHours: "11:30 AM - 10:00 PM",
        phoneNumber: "+91-33-2465-4043",
        latitude: "22.5431",
        longitude: "88.3519",
        isRecommended: true,
      },
      {
        name: "Kewpie's Kitchen",
        description: "Famous for authentic Bengali home cooking, especially fish preparations and traditional sweets.",
        cuisine: "Bengali",
        city: "Kolkata",
        address: "Elgin Lane, Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        reviewCount: 756,
        priceRange: "₹500-800",
        openHours: "12:00 PM - 3:00 PM, 7:00 PM - 10:00 PM",
        phoneNumber: "+91-33-2485-1075",
        latitude: "22.5441",
        longitude: "88.3525",
        isRecommended: true,
      },
      {
        name: "6 Ballygunge Place",
        description: "Upscale Bengali restaurant known for elaborate thalis and traditional preparations.",
        cuisine: "Bengali",
        city: "Kolkata",
        address: "Ballygunge Place, Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.2",
        reviewCount: 1120,
        priceRange: "₹600-900",
        openHours: "12:00 PM - 10:30 PM",
        phoneNumber: "+91-33-2464-4444",
        latitude: "22.5325",
        longitude: "88.3639",
        isRecommended: true,
      },
      {
        name: "Flurys",
        description: "Iconic colonial-era bakery and confectionery famous for English breakfast and pastries.",
        cuisine: "Continental",
        city: "Kolkata",
        address: "Park Street, Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.0",
        reviewCount: 2340,
        priceRange: "₹300-600",
        openHours: "7:30 AM - 10:00 PM",
        phoneNumber: "+91-33-2229-7664",
        latitude: "22.5539",
        longitude: "88.3522",
        isRecommended: true,
      },
      {
        name: "Glenary's Bakery",
        description: "Historic bakery in Darjeeling famous for fresh breads, cakes, and mountain views.",
        cuisine: "Bakery",
        city: "Darjeeling",
        address: "Nehru Road, Darjeeling",
        imageUrl: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.3",
        reviewCount: 567,
        priceRange: "₹200-400",
        openHours: "8:00 AM - 9:00 PM",
        phoneNumber: "+91-354-225-4329",
        latitude: "27.0410",
        longitude: "88.2663",
        isRecommended: true,
      },
      {
        name: "Keventers",
        description: "Famous for thick milkshakes and breakfast items with stunning Darjeeling hill views.",
        cuisine: "Cafe",
        city: "Darjeeling",
        address: "Mall Road, Darjeeling",
        imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.1",
        reviewCount: 823,
        priceRange: "₹150-350",
        openHours: "8:30 AM - 8:30 PM",
        phoneNumber: "+91-354-225-4217",
        latitude: "27.0421",
        longitude: "88.2673",
        isRecommended: false,
      },
      {
        name: "Sonar Tori",
        description: "Riverside restaurant in Shantiniketan serving traditional Bengali cuisine with cultural ambiance.",
        cuisine: "Bengali",
        city: "Shantiniketan",
        address: "Prantik, Shantiniketan",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.0",
        reviewCount: 445,
        priceRange: "₹350-550",
        openHours: "11:00 AM - 9:30 PM",
        phoneNumber: "+91-3463-262-751",
        latitude: "23.6863",
        longitude: "87.6772",
        isRecommended: false,
      },
      {
        name: "Ambrosia Restaurant",
        description: "Multi-cuisine restaurant in Digha offering fresh seafood and Bengali specialties.",
        cuisine: "Seafood",
        city: "Digha",
        address: "New Digha Sea Beach Road",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "3.9",
        reviewCount: 234,
        priceRange: "₹400-700",
        openHours: "12:00 PM - 10:00 PM",
        phoneNumber: "+91-3220-267-123",
        latitude: "21.6269",
        longitude: "87.5085",
        isRecommended: false,
      },
      {
        name: "Taj Bengal Sonargaon",
        description: "Luxury dining experience with exquisite Bengali cuisine and impeccable service.",
        cuisine: "Bengali Fine Dining",
        city: "Kolkata",
        address: "Taj Bengal Hotel, Alipore",
        imageUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.6",
        reviewCount:  678,
        priceRange: "₹2000-3500",
        openHours: "7:00 PM - 11:30 PM",
        phoneNumber: "+91-33-6612-3456",
        latitude: "22.5355",
        longitude: "88.3433",
        isRecommended: true,
      }
    ];



    // Seed default user
    const defaultUser: User = {
      id: 1,
      username: "traveler",
      email: "john@example.com",
      password: "password",
      name: "John Traveler",
      avatar: null,
      preferredLanguage: "en",
      createdAt: new Date(),
    };
    this.users.set(1, defaultUser);
    this.currentUserId = 2;

  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      avatar: insertUser.avatar || null,
      preferredLanguage: insertUser.preferredLanguage || "en",
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Attraction operations
  async getAttractions(city?: string): Promise<Attraction[]> {
    const allAttractions = Array.from(this.attractions.values());
    return city ? allAttractions.filter(a => a.city === city) : allAttractions;
  }

  async getItemById(id: number): Promise<Attraction | Restaurant | Event | undefined> {
    // Try to find the item in attractions
    const attraction = this.attractions.get(id);
    if (attraction) return attraction;

    // Try to find the item in restaurants
    const restaurant = this.restaurantsData.find(r => r.id === id);
    if (restaurant) return restaurant;

    // Try to find the item in events
    const event = this.events.get(id);
    if (event) return event;

    // Try to find the item in cafes
    const cafe = this.cafesData.find(c => c.id === id);
    if (cafe) return cafe;

    // Try to find the item in entertainment
    const entertainment = this.entertainmentData.find(e => e.id === id);
    if (entertainment) return entertainment;

    // Try to find the item in hotels
    const hotel = this.hotelsData.find(h => h.id === id);
    if (hotel) return hotel;

    // Try to find the item in transport
    const transport = this.transportData.find(t => t.id === id);
    if (transport) return transport;

    return undefined;
  }

  async getAttraction(id: number): Promise<Attraction | undefined> {
    return this.attractions.get(id);
  }

  async getTrendingAttractions(city?: string): Promise<Attraction[]> {
    const trendingItems: Attraction[] = [];

    // Get trending attractions
    const attractions = Array.from(this.attractions.values())
      .filter(a => a.isTrending && (!city || a.city === city));
    trendingItems.push(...attractions);

    // Get trending cafes
    const cafes = this.cafesData
      .filter(c => c.isTrending && (!city || c.city === city));
    trendingItems.push(...cafes);

    // Get trending entertainment
    const entertainment = this.entertainmentData
      .filter(e => e.isTrending && (!city || e.city === city));
    trendingItems.push(...entertainment);

    // Get trending hotels
    const hotels = this.hotelsData
      .filter(h => h.isTrending && (!city || h.city === city));
    trendingItems.push(...hotels);

    // Get trending transport
    const transport = this.transportData
      .filter(t => t.isTrending && (!city || t.city === city));
    trendingItems.push(...transport);

    return trendingItems;
  }

  async getFeaturedAttractions(city?: string): Promise<Attraction[]> {
    const featured = Array.from(this.attractions.values()).filter(a => a.isFeatured);
    return city ? featured.filter(a => a.city === city) : featured;
  }

  async searchAttractions(query: string, city?: string): Promise<Attraction[]> {
    const allAttractions = await this.getAttractions(city);
    const searchTerm = query.toLowerCase();
    return allAttractions.filter(a => 
      a.name.toLowerCase().includes(searchTerm) ||
      a.description.toLowerCase().includes(searchTerm) ||
      a.category.toLowerCase().includes(searchTerm)
    );
  }

  // Event operations
  async getEvents(city?: string): Promise<Event[]> {
    const allEvents = Array.from(this.events.values());
    return city ? allEvents.filter(e => e.city === city) : allEvents;
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getEventsByCategory(category: string, city?: string): Promise<Event[]> {
    const events = await this.getEvents(city);
    return events.filter(e => e.category === category);
  }

  async getUpcomingEvents(city?: string): Promise<Event[]> {
    const events = await this.getEvents(city);
    const now = new Date();
    const sixMonthsFromNow = new Date(now);
    sixMonthsFromNow.setMonth(now.getMonth() + 6);
    return events.filter(e => {
      const startDate = e.startDate instanceof Date ? e.startDate : new Date(e.startDate);
      return startDate >= now && startDate <= sixMonthsFromNow;
    }).sort((a, b) => {
      const dateA = a.startDate instanceof Date ? a.startDate : new Date(a.startDate);
      const dateB = b.startDate instanceof Date ? b.startDate : new Date(b.startDate);
      return dateA.getTime() - dateB.getTime();
    });
  }

  // Offer operations
  async getOffers(): Promise<Offer[]> {
    return Array.from(this.offers.values()).map(o => ({
      ...o,
      validUntil: o.validUntil instanceof Date ? o.validUntil : new Date(o.validUntil)
    }));
  }

  async getOffersByCategory(category: string): Promise<Offer[]> {
    const activeOffers = await this.getActiveOffers();
    return activeOffers.filter(o => o.category === category);
  }

  async getActiveOffers(): Promise<Offer[]> {
    const now = new Date();
    return Array.from(this.offers.values())
      .filter(o => {
        const validUntil = o.validUntil instanceof Date ? o.validUntil : new Date(o.validUntil);
        return o.isActive && validUntil >= now;
      })
      .map(o => ({
        ...o,
        validUntil: o.validUntil instanceof Date ? o.validUntil : new Date(o.validUntil)
      }));
  }

  // User favorites
  async getUserFavorites(userId: number): Promise<Attraction[]> {
    const favorites = Array.from(this.userFavorites.values())
      .filter(f => f.userId === userId);
    const attractions: Attraction[] = [];
    for (const favorite of favorites) {
      const attraction = this.attractions.get(favorite.attractionId!);
      if (attraction) {
        attractions.push(attraction);
      }
    }
    return attractions;
  }

  async addUserFavorite(favorite: InsertUserFavorite): Promise<UserFavorite> {
    const id = this.currentFavoriteId++;
    const userFavorite: UserFavorite = {
      id,
      userId: favorite.userId || null,
      attractionId: favorite.attractionId || null,
      createdAt: new Date(),
    };
    this.userFavorites.set(id, userFavorite);
    return userFavorite;
  }

  async removeUserFavorite(userId: number, attractionId: number): Promise<boolean> {
    const favorite = Array.from(this.userFavorites.values())
      .find(f => f.userId === userId && f.attractionId === attractionId);
    if (favorite) {
      this.userFavorites.delete(favorite.id);
      return true;
    }
    return false;
  }

  // User bookings
  async getUserBookings(userId: number): Promise<Event[]> {
    const bookings = Array.from(this.userBookings.values())
      .filter(b => b.userId === userId);
    const events: Event[] = [];
    for (const booking of bookings) {
      const event = this.events.get(booking.eventId!);
      if (event) {
        events.push(event);
      }
    }
    return events;
  }

  async createBooking(booking: InsertUserBooking): Promise<UserBooking> {
    const id = this.currentBookingId++;
    const userBooking: UserBooking = {
      id,
      userId: booking.userId || null,
      eventId: booking.eventId || null,
      status: booking.status || "confirmed",
      bookingDate: new Date(),
    };
    this.userBookings.set(id, userBooking);
    return userBooking;
  }

  // User itinerary methods
  async getUserItinerary(userId: number): Promise<Attraction[]> {
    const itineraryItems = Array.from(this.userItinerary.values())
      .filter(i => i.userId === userId);
    const attractions: Attraction[] = [];
    for (const item of itineraryItems) {
      const attraction = this.attractions.get(item.attractionId!);
      if (attraction) {
        attractions.push(attraction);
      }
    }
    return attractions;
  }

  async addToItinerary(itinerary: InsertUserItinerary): Promise<UserItinerary> {
    const id = this.currentItineraryId++;
    const userItinerary: UserItinerary = {
      id,
      userId: itinerary.userId || null,
      attractionId: itinerary.attractionId || null,
      visitDate: itinerary.visitDate || null,
      notes: itinerary.notes || null,
      createdAt: new Date(),
    };
    this.userItinerary.set(id, userItinerary);
    return userItinerary;
  }

  async removeFromItinerary(userId: number, attractionId: number): Promise<boolean> {
    const item = Array.from(this.userItinerary.values())
      .find(i => i.userId === userId && i.attractionId === attractionId);
    if (item) {
      this.userItinerary.delete(item.id);
      return true;
    }
    return false;
  }

  // Restaurant methods
  async getRestaurants(city?: string): Promise<Restaurant[]> {
    // Only use restaurantsData, which is Attraction[] for now, but should match Restaurant type
    // Convert Attraction[] to Restaurant[] by mapping required fields
    const restaurants: Restaurant[] = this.restaurantsData.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      cuisine: item.cuisine || '',
      city: item.city,
      address: item.location || '',
      imageUrl: item.imageUrl,
      rating: String(item.rating), // Fix: ensure rating is string
      reviewCount: item.reviewCount,
      priceRange: item.priceRange || '',
      openHours: item.openHours || '',
      phoneNumber: item.contactNumber || null,
      latitude: item.latitude ? String(item.latitude) : null,
      longitude: item.longitude ? String(item.longitude) : null,
      isRecommended: item.isRecommended ?? null,
    }));
    return city ? restaurants.filter(r => r.city === city) : restaurants;
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    // Only use restaurantsData
    return this.getRestaurants().then(restaurants => restaurants.find(r => r.id === id));
  }

  async getRecommendedRestaurants(city?: string): Promise<Restaurant[]> {
    const restaurants = await this.getRestaurants(city);
    return restaurants.filter(r => r.isRecommended);
  }

  async searchRestaurants(query: string, city?: string): Promise<Restaurant[]> {
    const restaurants = await this.getRestaurants(city);
    const searchTerm = query.toLowerCase();
    return restaurants.filter(r => 
      r.name.toLowerCase().includes(searchTerm) ||
      r.description.toLowerCase().includes(searchTerm) ||
      r.cuisine.toLowerCase().includes(searchTerm)
    );
  }
}

export const storage = new MemStorage();
