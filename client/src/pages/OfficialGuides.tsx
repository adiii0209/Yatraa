import { motion } from "framer-motion";
import { Shield, Star, Award, MapPin, Users, Check, Search } from "lucide-react";
import { useState } from "react";

export default function OfficialGuides() {
  const [searchQuery, setSearchQuery] = useState("");

  const guides = [
    {
      name: "Rajesh Kumar",
      experience: "8 years",
      languages: ["English", "Bengali", "Hindi"],
      rating: 4.9,
      reviews: 156,
      specialties: ["Heritage Sites", "Cultural Tours"],
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
      verified: true
    },
    {
      name: "Priya Sharma",
      experience: "5 years",
      languages: ["English", "Bengali", "French"],
      rating: 4.8,
      reviews: 98,
      specialties: ["Food Tours", "Local Markets"],
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      verified: true
    },
    {
      name: "Amit Das",
      experience: "10 years",
      languages: ["English", "Bengali", "Japanese"],
      rating: 4.9,
      reviews: 212,
      specialties: ["Historical Monuments", "Photography Tours"],
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen pt-3 pb-20 px-4 max-w-lg mx-auto space-y-8 bg-gradient-to-b from-white to-blue-50/30">
      {/* Search Bar - moved to top */}
      <div className="relative group mb-2">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur transition-all duration-300 group-hover:blur-md" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
          <input
            type="text"
            placeholder="Search guides by name, language, or specialty"
            className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400 text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 py-4"
      >
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur"
          />
          <div className="p-2 bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm rounded-full relative">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Official Tour Guides</h1>
        <p className="text-gray-600 text-base">Government approved, experienced local guides</p>
      </motion.div>

      {/* Guides List */}
      <div className="space-y-4">
        {guides.map((guide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 space-y-4 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                {guide.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-primary to-purple-600 text-white p-2 rounded-full shadow-lg">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{guide.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{guide.rating}</span>
                    <span className="text-gray-400">({guide.reviews})</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{guide.experience} experience</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Languages: {guide.languages.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Specialties: {guide.specialties.join(", ")}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300">
                Book Now
              </button>
              <button className="py-3 px-6 bg-white/80 backdrop-blur-sm border border-primary/20 text-primary rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-primary/5 transition-all duration-300">
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Become a Guide CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-white text-center space-y-6 shadow-lg group hover:shadow-xl transition-all duration-300"
      >
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"
          />
          <Award className="w-12 h-12 mx-auto relative group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h2 className="text-2xl font-semibold">Want to become an official guide?</h2>
        <p className="text-white/90 text-lg">Join our certified guide program and share your expertise</p>
        <button
          onClick={() => window.location.href = '/local-guide'}
          className="w-full py-4 px-6 bg-white/90 backdrop-blur-sm text-primary rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
        >
          Apply Now
        </button>
      </motion.div>
    </div>
  );
}