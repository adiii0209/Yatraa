export interface City {
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  attractions: number;
  isPopular: boolean;
}

export const cities: City[] = [
  {
    name: "Kolkata",
    description: "Cultural capital of India with rich heritage",
    coordinates: { latitude: 22.5726, longitude: 88.3639 },
    attractions: 45,
    isPopular: true
  },
  {
    name: "Darjeeling",
    description: "Queen of Hills with tea gardens",
    coordinates: { latitude: 27.0360, longitude: 88.2627 },
    attractions: 18,
    isPopular: true
  },
  {
    name: "Sundarbans",
    description: "Mangrove wilderness and Royal Bengal Tigers",
    coordinates: { latitude: 21.9497, longitude: 88.9468 },
    attractions: 12,
    isPopular: true
  },
  {
    name: "Digha",
    description: "Popular beach destination with golden sands",
    coordinates: { latitude: 21.6270, longitude: 87.5090 },
    attractions: 8,
    isPopular: true
  },
  {
    name: "Shantiniketan",
    description: "Cultural hub of Rabindranath Tagore",
    coordinates: { latitude: 23.6863, longitude: 87.6772 },
    attractions: 12,
    isPopular: true
  },
  {
    name: "Siliguri",
    description: "Gateway to Northeast India",
    coordinates: { latitude: 26.7271, longitude: 88.3953 },
    attractions: 15,
    isPopular: false
  },
  {
    name: "Durgapur",
    description: "Industrial city with parks",
    coordinates: { latitude: 23.5204, longitude: 87.3119 },
    attractions: 10,
    isPopular: false
  },
  {
    name: "Asansol",
    description: "Coal mining hub and industrial center",
    coordinates: { latitude: 23.6839, longitude: 86.9523 },
    attractions: 7,
    isPopular: false
  },
  {
    name: "Malda",
    description: "Historic city famous for mangoes",
    coordinates: { latitude: 25.0095, longitude: 88.1433 },
    attractions: 9,
    isPopular: false
  },
  {
    name: "Bishnupur",
    description: "Terracotta temple town with rich heritage",
    coordinates: { latitude: 23.0783, longitude: 87.3167 },
    attractions: 14,
    isPopular: true
  },
  {
    name: "Kalimpong",
    description: "Serene hill station with mountain views",
    coordinates: { latitude: 27.0669, longitude: 88.4686 },
    attractions: 11,
    isPopular: false
  },
  {
    name: "Murshidabad",
    description: "Former capital of Bengal with palaces",
    coordinates: { latitude: 24.1833, longitude: 88.2667 },
    attractions: 16,
    isPopular: true
  },
  {
    name: "Cooch Behar",
    description: "Royal heritage city with beautiful palace",
    coordinates: { latitude: 26.3164, longitude: 89.4386 },
    attractions: 9,
    isPopular: false
  },
  {
    name: "Purulia",
    description: "Tribal culture and Chhau dance heritage",
    coordinates: { latitude: 23.3323, longitude: 86.3616 },
    attractions: 8,
    isPopular: false
  },
  {
    name: "Bankura",
    description: "Famous for terracotta crafts",
    coordinates: { latitude: 23.2324, longitude: 87.0753 },
    attractions: 10,
    isPopular: false
  },
  {
    name: "Howrah",
    description: "Historic city with iconic Howrah Bridge",
    coordinates: { latitude: 22.5958, longitude: 88.2636 },
    attractions: 8,
    isPopular: false
  },
  {
    name: "Chandannagar",
    description: "Former French colony with colonial charm",
    coordinates: { latitude: 22.8700, longitude: 88.3700 },
    attractions: 6,
    isPopular: false
  },
  {
    name: "Kurseong",
    description: "Charming hill station near Darjeeling",
    coordinates: { latitude: 26.8800, longitude: 88.2800 },
    attractions: 5,
    isPopular: false
  },
  {
    name: "Mandarmani",
    description: "Pristine beach with long coastline",
    coordinates: { latitude: 21.6588, longitude: 87.7854 },
    attractions: 4,
    isPopular: true
  },
  {
    name: "Haldia",
    description: "Major port city with industrial significance",
    coordinates: { latitude: 22.0580, longitude: 88.0603 },
    attractions: 3,
    isPopular: false
  },
  {
    name: "Alipurduar",
    description: "Gateway to Bhutan with tea gardens",
    coordinates: { latitude: 26.4906, longitude: 89.5292 },
    attractions: 5,
    isPopular: false
  },
  {
    name: "Jalpaiguri",
    description: "Tea city at foothills of Himalayas",
    coordinates: { latitude: 26.5463, longitude: 88.7197 },
    attractions: 7,
    isPopular: false
  },
  {
    name: "Balurghat",
    description: "District headquarters with historical sites",
    coordinates: { latitude: 25.2167, longitude: 88.7667 },
    attractions: 4,
    isPopular: false
  },
  {
    name: "Barrackpore",
    description: "Historic cantonment town",
    coordinates: { latitude: 22.7667, longitude: 88.3667 },
    attractions: 6,
    isPopular: false
  },
  {
    name: "Baharampur",
    description: "Silk city with historical importance",
    coordinates: { latitude: 24.1042, longitude: 88.2517 },
    attractions: 5,
    isPopular: false
  },
  {
    name: "Krishnanagar",
    description: "Famous for clay dolls and sweets",
    coordinates: { latitude: 23.4058, longitude: 88.5019 },
    attractions: 4,
    isPopular: false
  },
  {
    name: "Raniganj",
    description: "Coal mining town with industrial heritage",
    coordinates: { latitude: 23.6167, longitude: 87.1333 },
    attractions: 3,
    isPopular: false
  },
  {
    name: "Raiganj",
    description: "Bird sanctuary and silk production center",
    coordinates: { latitude: 25.6167, longitude: 88.1167 },
    attractions: 4,
    isPopular: false
  },
  {
    name: "Serampore",
    description: "Danish colonial heritage town",
    coordinates: { latitude: 22.7500, longitude: 88.3400 },
    attractions: 5,
    isPopular: false
  },
  {
    name: "Tamluk",
    description: "Ancient port city with archaeological sites",
    coordinates: { latitude: 22.3000, longitude: 87.9167 },
    attractions: 6,
    isPopular: false
  }
];

export const getPopularCities = () => cities.filter(city => city.isPopular);

export const getCityByName = (name: string) => cities.find(city => city.name === name);

export const searchCities = (query: string) => 
  cities.filter(city => 
    city.name.toLowerCase().includes(query.toLowerCase()) ||
    city.description.toLowerCase().includes(query.toLowerCase())
  );
