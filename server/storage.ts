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
  private users: Map<number, User> = new Map();
  private attractions: Map<number, Attraction> = new Map();
  private events: Map<number, Event> = new Map();
  private offers: Map<number, Offer> = new Map();
  private userFavorites: Map<number, UserFavorite> = new Map();
  private userBookings: Map<number, UserBooking> = new Map();
  private userItinerary: Map<number, UserItinerary> = new Map();
  private restaurants: Map<number, Restaurant> = new Map();
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

  private seedData() {
    // Seed attractions
    const attractionsData: Omit<Attraction, 'id'>[] = [
      {
        name: "Victoria Memorial",
        description: "The Victoria Memorial is a large marble building in Central Kolkata, which was built between 1906 and 1921. It is dedicated to the memory of Queen Victoria, then Empress of India, and is now a museum under the auspices of the Ministry of Culture.",
        shortDescription: "Historic marble monument and museum",
        category: "Monument",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.6",
        reviewCount: 5200,
        entryFee: "₹20",
        openHours: "10:00 AM - 6:00 PM",
        location: "Queens Way, Maidan, Kolkata",
        latitude: "22.5448",
        longitude: "88.3426",
        isTrending: true,
        isFeatured: true,
      },
      {
        name: "Howrah Bridge",
        description: "The Howrah Bridge is a cantilever bridge with a suspended span over the Hooghly River in West Bengal. Commissioned in 1943, the bridge was originally named the New Howrah Bridge, because it replaced a pontoon bridge at the same location linking the two cities of Howrah and Kolkata.",
        shortDescription: "Iconic cantilever bridge over Hooghly River",
        category: "Bridge",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        reviewCount: 8900,
        entryFee: "Free",
        openHours: "Open 24/7",
        location: "Howrah Bridge, Kolkata",
        latitude: "22.5958",
        longitude: "88.3126",
        isTrending: true,
        isFeatured: false,
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
      },
      {
        name: "Sundarbans National Park",
        description: "The Sundarbans is a mangrove area in the delta formed by the confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay of Bengal. It spans from the Hooghly River in India's state of West Bengal to the Baleswar River in Bangladesh.",
        shortDescription: "UNESCO World Heritage mangrove forest",
        category: "Wildlife",
        city: "Sundarbans",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.3",
        reviewCount: 2100,
        entryFee: "₹200",
        openHours: "6:00 AM - 6:00 PM",
        location: "Sundarbans Delta",
        latitude: "21.9497",
        longitude: "88.9468",
        isTrending: false,
        isFeatured: true,
      },
      {
        name: "Kalighat Temple",
        description: "Kalighat Kali Temple is a Hindu temple dedicated to the Hindu goddess Kali. It is one of the 51 Shakti Peethas. The temple is located in Kalighat, Kolkata, West Bengal, India. It was built in 1809.",
        shortDescription: "Sacred Hindu temple dedicated to Goddess Kali",
        category: "Temple",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.5",
        reviewCount: 6700,
        entryFee: "Free",
        openHours: "5:00 AM - 10:30 PM",
        location: "Kalighat, Kolkata",
        latitude: "22.5205",
        longitude: "88.3399",
        isTrending: false,
        isFeatured: false,
      },
      {
        name: "Bishnupur Terracotta Temples",
        description: "Bishnupur is famous for its terracotta temples built by the Malla rulers during the 17th and 18th centuries. The temples showcase exquisite terracotta work depicting scenes from Hindu epics.",
        shortDescription: "Historic terracotta temples with intricate artwork",
        category: "Temple",
        city: "Bishnupur",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.7",
        reviewCount: 1800,
        entryFee: "₹15",
        openHours: "8:00 AM - 6:00 PM",
        location: "Bishnupur, Bankura",
        latitude: "23.0783",
        longitude: "87.3167",
        isTrending: false,
        isFeatured: true,
      },
      {
        name: "Eden Gardens",
        description: "Eden Gardens is a cricket ground in Kolkata, India. It is the home of the Bengal cricket team and the Indian Premier League's Kolkata Knight Riders, as well as being a Test, One Day International and Twenty20 International ground.",
        shortDescription: "Historic cricket stadium",
        category: "Sports",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.5",
        reviewCount: 3200,
        entryFee: "Match dependent",
        openHours: "Match days only",
        location: "Eden Gardens, Kolkata",
        latitude: "22.5649",
        longitude: "88.3434",
        isTrending: true,
        isFeatured: false,
      },
      {
        name: "Indian Museum",
        description: "The Indian Museum is a massive museum in Central Kolkata, West Bengal, India. It is the ninth oldest museum in the world and the oldest and largest museum in India and Asia.",
        shortDescription: "Oldest museum in India with vast collections",
        category: "Museum",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        reviewCount: 2800,
        entryFee: "₹20",
        openHours: "10:00 AM - 5:00 PM",
        location: "Park Street, Kolkata",
        latitude: "22.5579",
        longitude: "88.3511",
        isTrending: false,
        isFeatured: true,
      },
      {
        name: "Tiger Hill",
        description: "Tiger Hill is located in Darjeeling, West Bengal, India, and is the summit of Ghoom, the highest railway station in the Darjeeling Himalayan Railway. It has an altitude of 2,567 metres and is famous for its spectacular sunrise views.",
        shortDescription: "Famous sunrise viewpoint in Darjeeling",
        category: "Nature",
        city: "Darjeeling",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.6",
        reviewCount: 4100,
        entryFee: "₹30",
        openHours: "4:00 AM - 10:00 AM",
        location: "Tiger Hill, Darjeeling",
        latitude: "27.0499",
        longitude: "88.2712",
        isTrending: true,
        isFeatured: true,
      },
      {
        name: "New Market",
        description: "New Market is a historic market in the heart of Kolkata. Built in 1874, it is one of the oldest markets in India and is famous for its wide variety of goods including clothing, accessories, food, and souvenirs.",
        shortDescription: "Historic market for shopping and street food",
        category: "Market",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.2",
        reviewCount: 5600,
        entryFee: "Free",
        openHours: "10:00 AM - 8:00 PM",
        location: "Lindsay Street, Kolkata",
        latitude: "22.5579",
        longitude: "88.3511",
        isTrending: false,
        isFeatured: false,
      },
      {
        name: "Digha Beach",
        description: "Digha is a seaside resort town in the state of West Bengal, India. It lies in East Midnapore district and at the northern end of the Bay of Bengal. It is the nearest sea beach to Kolkata.",
        shortDescription: "Popular beach destination near Kolkata",
        category: "Beach",
        city: "Digha",
        imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.1",
        reviewCount: 7200,
        entryFee: "Free",
        openHours: "Open 24/7",
        location: "Digha Beach, Digha",
        latitude: "21.6270",
        longitude: "87.5090",
        isTrending: true,
        isFeatured: false,
      },
      {
        name: "Dakshineswar Kali Temple",
        description: "Dakshineswar Kali Temple is a Hindu navaratna temple located in Dakshineswar near Kolkata. Situated on the eastern bank of the Hooghly River, the presiding deity of the temple is Bhavatarini, an aspect of Kali.",
        shortDescription: "Sacred temple dedicated to Goddess Kali",
        category: "Temple",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.6",
        reviewCount: 8900,
        entryFee: "Free",
        openHours: "6:00 AM - 12:30 PM, 3:00 PM - 9:00 PM",
        location: "Dakshineswar, Kolkata",
        latitude: "22.6555",
        longitude: "88.3568",
        isTrending: true,
        isFeatured: true,
      },
      {
        name: "Belur Math",
        description: "Belur Math is the headquarters of the Ramakrishna Math and Mission, founded by Swami Vivekananda. It is notable for its architecture that fuses Hindu, Christian and Islamic motifs.",
        shortDescription: "Headquarters of Ramakrishna Mission",
        category: "Temple",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.7",
        reviewCount: 5400,
        entryFee: "Free",
        openHours: "6:00 AM - 12:00 PM, 4:00 PM - 7:00 PM",
        location: "Belur, Howrah",
        latitude: "22.6320",
        longitude: "88.3573",
        isTrending: false,
        isFeatured: true,
      },
      {
        name: "Marble Palace",
        description: "Marble Palace is a palatial nineteenth-century mansion in North Kolkata. It is one of the best-preserved and most elegant houses of nineteenth-century Calcutta.",
        shortDescription: "19th century palatial mansion",
        category: "Palace",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.3",
        reviewCount: 2100,
        entryFee: "Free (Permission required)",
        openHours: "10:00 AM - 4:00 PM",
        location: "North Kolkata",
        latitude: "22.6065",
        longitude: "88.3779",
        isTrending: false,
        isFeatured: false,
      },
      {
        name: "Science City",
        description: "Science City Kolkata is the largest science centre in the Indian subcontinent. It is managed by the National Council of Science Museums, Ministry of Culture, Government of India.",
        shortDescription: "Interactive science museum and park",
        category: "Museum",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.2",
        reviewCount: 6800,
        entryFee: "₹60",
        openHours: "9:00 AM - 8:00 PM",
        location: "Eastern Metropolitan Bypass, Kolkata",
        latitude: "22.4987",
        longitude: "88.3948",
        isTrending: true,
        isFeatured: false,
      },
      {
        name: "Botanical Garden",
        description: "The Acharya Jagadish Chandra Bose Indian Botanic Garden is a botanical garden in Shibpur, Howrah. It is under the authority of Botanical Survey of India, Ministry of Environment and Forests.",
        shortDescription: "Historic botanical garden with Great Banyan Tree",
        category: "Garden",
        city: "Howrah",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        reviewCount: 4200,
        entryFee: "₹10",
        openHours: "7:00 AM - 5:00 PM",
        location: "Shibpur, Howrah",
        latitude: "22.5608",
        longitude: "88.2677",
        isTrending: false,
        isFeatured: true,
      },
      {
        name: "Kalimpong Hill Station",
        description: "Kalimpong is a hill station in the Indian state of West Bengal. It is located at an average elevation of 1,250 metres and is famous for its schools, monasteries and nurseries.",
        shortDescription: "Scenic hill station with monasteries",
        category: "Nature",
        city: "Kalimpong",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.5",
        reviewCount: 3600,
        entryFee: "Free",
        openHours: "Open 24/7",
        location: "Kalimpong",
        latitude: "27.0669",
        longitude: "88.4686",
        isTrending: true,
        isFeatured: false,
      },
      {
        name: "Cooch Behar Palace",
        description: "Cooch Behar Palace, also called the Victor Jubilee Palace, is a landmark in Cooch Behar city, West Bengal. It was modeled after Buckingham Palace in London.",
        shortDescription: "Royal palace modeled after Buckingham Palace",
        category: "Palace",
        city: "Cooch Behar",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        reviewCount: 1800,
        entryFee: "₹20",
        openHours: "10:00 AM - 5:00 PM",
        location: "Cooch Behar",
        latitude: "26.3249",
        longitude: "89.4425",
        isTrending: false,
        isFeatured: true,
      },
      {
        name: "Mandarmani Beach",
        description: "Mandarmani is a seaside resort village in the state of West Bengal, India. It has the longest drivable beach in India and is a popular weekend destination.",
        shortDescription: "Longest drivable beach in India",
        category: "Beach",
        city: "Mandarmani",
        imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.2",
        reviewCount: 5400,
        entryFee: "Free",
        openHours: "Open 24/7",
        location: "Mandarmani, East Midnapore",
        latitude: "21.6586",
        longitude: "87.7914",
        isTrending: true,
        isFeatured: false,
      },
      {
        name: "Shantiniketan",
        description: "Shantiniketan is a neighbourhood of Bolpur city in Birbhum district. It was established by Maharshi Devendranath Tagore, and later expanded by his son Rabindranath Tagore.",
        shortDescription: "Cultural center founded by Rabindranath Tagore",
        category: "Cultural",
        city: "Shantiniketan",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.6",
        reviewCount: 7800,
        entryFee: "₹10",
        openHours: "6:00 AM - 6:00 PM",
        location: "Shantiniketan, Birbhum",
        latitude: "23.6817",
        longitude: "87.6820",
        isTrending: true,
        isFeatured: true,
      },
      {
        name: "Mayurbhanj Palace",
        description: "The Mayurbhanj Palace in Baripada is a magnificent example of Indo-Saracenic architecture and was the residence of the Mayurbhanj royal family.",
        shortDescription: "Indo-Saracenic architecture palace",
        category: "Palace",
        city: "Baripada",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.1",
        reviewCount: 1200,
        entryFee: "₹25",
        openHours: "9:00 AM - 5:00 PM",
        location: "Baripada",
        latitude: "21.9347",
        longitude: "86.7336",
        isTrending: false,
        isFeatured: false,
      },
      {
        name: "Netaji Bhawan",
        description: "Netaji Bhawan is the ancestral home of Netaji Subhas Chandra Bose in Kolkata. It has been converted into a museum and research centre.",
        shortDescription: "Ancestral home of Netaji Subhas Chandra Bose",
        category: "Museum",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.3",
        reviewCount: 2800,
        entryFee: "₹10",
        openHours: "10:30 AM - 4:30 PM",
        location: "Elgin Road, Kolkata",
        latitude: "22.5389",
        longitude: "88.3528",
        isTrending: false,
        isFeatured: false,
      },
      {
        name: "Eco Park",
        description: "Eco Park is an urban park located in New Town, Kolkata. It is the largest urban park in India and features various themed gardens and recreational facilities.",
        shortDescription: "Largest urban park in India",
        category: "Park",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        reviewCount: 12000,
        entryFee: "₹30",
        openHours: "9:00 AM - 7:00 PM",
        location: "New Town, Kolkata",
        latitude: "22.5746",
        longitude: "88.4739",
        isTrending: true,
        isFeatured: true,
      },
      {
        name: "Nicco Park",
        description: "Nicco Park is an amusement park located in Kolkata, West Bengal. It is one of the largest amusement parks in Eastern India and offers various rides and attractions.",
        shortDescription: "Popular amusement park with thrilling rides",
        category: "Amusement",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.0",
        reviewCount: 8900,
        entryFee: "₹350",
        openHours: "10:30 AM - 7:00 PM",
        location: "Sector V, Salt Lake, Kolkata",
        latitude: "22.5726",
        longitude: "88.4166",
        isTrending: false,
        isFeatured: false,
      },
      {
        name: "Alipore Zoo",
        description: "The Alipore Zoological Gardens is India's oldest formally stated zoological park and a major tourist attraction in Kolkata, West Bengal.",
        shortDescription: "India's oldest zoo with diverse wildlife",
        category: "Zoo",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.1",
        reviewCount: 11200,
        entryFee: "₹20",
        openHours: "9:00 AM - 5:00 PM",
        location: "Alipore, Kolkata",
        latitude: "22.5197",
        longitude: "88.3331",
        isTrending: false,
        isFeatured: false,
      },
      {
        name: "Rabindra Sarovar",
        description: "Rabindra Sarovar is an artificial lake in South Kolkata. It is flanked by Rabindra Sarovar Metro Station and is a popular spot for morning walks and boating.",
        shortDescription: "Scenic artificial lake for recreation",
        category: "Lake",
        city: "Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.2",
        reviewCount: 6400,
        entryFee: "Free",
        openHours: "5:00 AM - 10:00 PM",
        location: "South Kolkata",
        latitude: "22.5158",
        longitude: "88.3649",
        isTrending: false,
        isFeatured: false,
      },
      {
        name: "Mirik Lake",
        description: "Mirik is a small town and a hill station in Darjeeling district. The town is known for the Mirik Lake, which is surrounded by a garden on one side and pine trees on the other.",
        shortDescription: "Beautiful hill station lake surrounded by gardens",
        category: "Lake",
        city: "Mirik",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.5",
        reviewCount: 3200,
        entryFee: "Free",
        openHours: "Open 24/7",
        location: "Mirik, Darjeeling",
        latitude: "26.8844",
        longitude: "88.1719",
        isTrending: true,
        isFeatured: true,
      },
      {
        name: "Murshidabad Palace",
        description: "Hazarduari Palace is a palace located in Murshidabad, West Bengal. It was built in 1837 by architect Duncan McLeod under the reign of Nawab Nazim Humayun Jah.",
        shortDescription: "Historic palace with thousand doors",
        category: "Palace",
        city: "Murshidabad",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        reviewCount: 2600,
        entryFee: "₹15",
        openHours: "9:00 AM - 5:00 PM",
        location: "Murshidabad",
        latitude: "24.1761",
        longitude: "88.2700",
        isTrending: false,
        isFeatured: true,
      },
      {
        name: "Durgapur Steel Plant",
        description: "Durgapur Steel Plant is one of the integrated steel plants of Steel Authority of India Limited. It offers guided tours showcasing modern steel manufacturing processes.",
        shortDescription: "Modern steel manufacturing facility tours",
        category: "Industrial",
        city: "Durgapur",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "3.9",
        reviewCount: 1400,
        entryFee: "₹50 (Tour)",
        openHours: "Prior appointment required",
        location: "Durgapur",
        latitude: "23.5204",
        longitude: "87.3119",
        isTrending: false,
        isFeatured: false,
      },
      {
        name: "Bakkhali Beach",
        description: "Bakkhali is a seaside resort town located on an island in the Sundarbans area. It is known for its pristine beaches and peaceful environment.",
        shortDescription: "Serene beach in the Sundarbans region",
        category: "Beach",
        city: "Bakkhali",
        imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.0",
        reviewCount: 4800,
        entryFee: "Free",
        openHours: "Open 24/7",
        location: "Bakkhali, South 24 Parganas",
        latitude: "21.5647",
        longitude: "88.2275",
        isTrending: true,
        isFeatured: false,
      },
      {
        name: "Jaldapara National Park",
        description: "Jaldapara National Park is a national park situated at the foothills of the Eastern Himalayas in Alipurduar district. It is famous for its population of Indian rhinoceros.",
        shortDescription: "National park famous for one-horned rhinoceros",
        category: "Wildlife",
        city: "Alipurduar",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.3",
        reviewCount: 2900,
        entryFee: "₹150",
        openHours: "6:00 AM - 6:00 PM",
        location: "Alipurduar",
        latitude: "26.7417",
        longitude: "89.2833",
        isTrending: false,
        isFeatured: true,
      },
      {
        name: "Gorumara National Park",
        description: "Gorumara National Park is a national park in northern West Bengal. The park is rich in wildlife including elephants, rhinoceros, gaur, sambhar, and chital.",
        shortDescription: "Rich wildlife sanctuary with elephants",
        category: "Wildlife",
        city: "Lataguri",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        reviewCount: 3400,
        entryFee: "₹120",
        openHours: "6:00 AM - 4:00 PM",
        location: "Lataguri, Jalpaiguri",
        latitude: "26.7500",
        longitude: "88.8000",
        isTrending: true,
        isFeatured: false,
      }
    ];

    attractionsData.forEach((attraction, index) => {
      const id = this.currentAttractionId++;
      this.attractions.set(id, { ...attraction, id });
    });

    // Seed events
    const eventsData: Omit<Event, 'id'>[] = [
      {
        title: "Durga Puja Festival",
        description: "The most significant festival of West Bengal, celebrating Goddess Durga's victory over evil. Experience magnificent pandals, cultural programs, and traditional Bengali festivities.",
        category: "Festival",
        city: "Kolkata",
        venue: "Various Pandals across Kolkata",
        imageUrl: "https://images.unsplash.com/photo-1542718610-8b57c8bfb02c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-10-15"),
        endDate: new Date("2024-10-24"),
        price: "Free",
        isBookable: false,
        organizer: "Various Community Organizations",
      },
      {
        title: "Bengal Folk Dance Performance",
        description: "Traditional Bengali folk dance performance featuring authentic costumes, music, and storytelling that showcases the rich cultural heritage of West Bengal.",
        category: "Cultural",
        city: "Kolkata",
        venue: "Rabindra Sadan",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-11-18"),
        endDate: new Date("2024-11-18"),
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
        imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
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
        imageUrl: "https://images.unsplash.com/photo-1542718610-8b57c8bfb02c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-11-14"),
        endDate: new Date("2024-11-14"),
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
        imageUrl: "https://images.unsplash.com/photo-1605106715994-18d3fecffb98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-12-05"),
        endDate: new Date("2024-12-07"),
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
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
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
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
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
      const id = this.currentEventId++;
      this.events.set(id, { ...event, id });
    });

    // Seed offers
    const offersData: Omit<Offer, 'id'>[] = [
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
      const id = this.currentOfferId++;
      this.offers.set(id, { ...offer, id });
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
        reviewCount: 678,
        priceRange: "₹2000-3500",
        openHours: "7:00 PM - 11:30 PM",
        phoneNumber: "+91-33-6612-3456",
        latitude: "22.5355",
        longitude: "88.3433",
        isRecommended: true,
      }
    ];

    restaurantsData.forEach((restaurant, index) => {
      const id = this.currentRestaurantId++;
      this.restaurants.set(id, { ...restaurant, id });
    });

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

  async getAttraction(id: number): Promise<Attraction | undefined> {
    return this.attractions.get(id);
  }

  async getTrendingAttractions(city?: string): Promise<Attraction[]> {
    const trending = Array.from(this.attractions.values()).filter(a => a.isTrending);
    return city ? trending.filter(a => a.city === city) : trending;
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
    return events.filter(e => new Date(e.startDate) >= now);
  }

  // Offer operations
  async getOffers(): Promise<Offer[]> {
    return Array.from(this.offers.values());
  }

  async getOffersByCategory(category: string): Promise<Offer[]> {
    return Array.from(this.offers.values()).filter(o => o.category === category);
  }

  async getActiveOffers(): Promise<Offer[]> {
    const now = new Date();
    return Array.from(this.offers.values()).filter(o => 
      o.isActive && new Date(o.validUntil) >= now
    );
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
    const restaurants = Array.from(this.restaurants.values());
    if (city) {
      return restaurants.filter(r => r.city.toLowerCase() === city.toLowerCase());
    }
    return restaurants;
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async getRecommendedRestaurants(city?: string): Promise<Restaurant[]> {
    const restaurants = Array.from(this.restaurants.values())
      .filter(r => r.isRecommended);
    if (city) {
      return restaurants.filter(r => r.city.toLowerCase() === city.toLowerCase());
    }
    return restaurants;
  }

  async searchRestaurants(query: string, city?: string): Promise<Restaurant[]> {
    const lowerQuery = query.toLowerCase();
    let restaurants = Array.from(this.restaurants.values()).filter(r =>
      r.name.toLowerCase().includes(lowerQuery) ||
      r.description.toLowerCase().includes(lowerQuery) ||
      r.cuisine.toLowerCase().includes(lowerQuery)
    );
    
    if (city) {
      restaurants = restaurants.filter(r => r.city.toLowerCase() === city.toLowerCase());
    }
    
    return restaurants;
  }
}

export const storage = new MemStorage();
