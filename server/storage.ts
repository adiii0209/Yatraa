import { 
  users, 
  attractions, 
  events, 
  offers, 
  userFavorites, 
  userBookings,
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
  type InsertUserBooking
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private attractions: Map<number, Attraction> = new Map();
  private events: Map<number, Event> = new Map();
  private offers: Map<number, Offer> = new Map();
  private userFavorites: Map<number, UserFavorite> = new Map();
  private userBookings: Map<number, UserBooking> = new Map();
  private currentUserId = 1;
  private currentAttractionId = 1;
  private currentEventId = 1;
  private currentOfferId = 1;
  private currentFavoriteId = 1;
  private currentBookingId = 1;

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
      }
    ];

    offersData.forEach((offer, index) => {
      const id = this.currentOfferId++;
      this.offers.set(id, { ...offer, id });
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
}

export const storage = new MemStorage();
