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
    description: "Cultural capital of India",
    coordinates: {
      latitude: 22.5726,
      longitude: 88.3639
    },
    attractions: 45,
    isPopular: true
  },
  {
    name: "Darjeeling",
    description: "Queen of Hills",
    coordinates: {
      latitude: 27.0360,
      longitude: 88.2627
    },
    attractions: 18,
    isPopular: true
  },
  {
    name: "Sundarbans",
    description: "Mangrove wilderness",
    coordinates: {
      latitude: 21.9497,
      longitude: 88.9468
    },
    attractions: 12,
    isPopular: true
  },
  {
    name: "Digha",
    description: "Popular beach destination",
    coordinates: {
      latitude: 21.6270,
      longitude: 87.5090
    },
    attractions: 8,
    isPopular: true
  },
  {
    name: "Siliguri",
    description: "Gateway to Northeast",
    coordinates: {
      latitude: 26.7271,
      longitude: 88.3953
    },
    attractions: 15,
    isPopular: false
  },
  {
    name: "Durgapur",
    description: "Industrial city",
    coordinates: {
      latitude: 23.5204,
      longitude: 87.3119
    },
    attractions: 10,
    isPopular: false
  },
  {
    name: "Asansol",
    description: "Coal mining hub",
    coordinates: {
      latitude: 23.6839,
      longitude: 86.9523
    },
    attractions: 7,
    isPopular: false
  },
  {
    name: "Malda",
    description: "Historic mango city",
    coordinates: {
      latitude: 25.0095,
      longitude: 88.1433
    },
    attractions: 9,
    isPopular: false
  },
  {
    name: "Bishnupur",
    description: "Terracotta temple town",
    coordinates: {
      latitude: 23.0783,
      longitude: 87.3167
    },
    attractions: 6,
    isPopular: true
  },
  {
    name: "Kalimpong",
    description: "Hill station paradise",
    coordinates: {
      latitude: 27.0669,
      longitude: 88.4686
    },
    attractions: 11,
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
