export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  imageUrl: string;
  startDate: string;
  endDate?: string;
  price: string;
  isBookable: boolean;
  organizer: string;
}

export const eventCategories = [
  "Festival",
  "Cultural",
  "Music",
  "Dance",
  "Art",
  "Sports",
  "Food",
  "Literature",
  "Theater",
  "Religious"
];

export const popularEvents = [
  "Durga Puja",
  "Kali Puja",
  "Poila Boishakh",
  "Rabindra Jayanti",
  "Kolkata Book Fair",
  "Dover Lane Music Festival",
  "Biswa Bangla Sharad Samman"
];

export const getEventsByCity = (city: string) => {
  // This would make an API call in the real app
  return [];
};

export const getUpcomingEvents = (city?: string) => {
  // This would make an API call in the real app
  return [];
};

export const getEventsByCategory = (category: string, city?: string) => {
  // This would make an API call in the real app
  return [];
};

export const getFestivalCalendar = (month: number, year: number) => {
  // This would return festival dates for the given month/year
  return [];
};
