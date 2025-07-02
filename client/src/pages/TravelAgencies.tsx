import { motion } from "framer-motion";
import { Building2, MapPin, Star, Shield, Phone, Mail, Globe, ChevronRight, Search, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function TravelAgencies() {
  const [searchQuery, setSearchQuery] = useState("");

  const agencies = [
    {
      name: "Bengal Heritage Tours",
      rating: 4.8,
      reviews: 156,
      specialties: ["Heritage Tours", "Cultural Experiences"],
      location: "Kolkata, West Bengal",
      contact: "+91 98765 43210",
      email: "info@bengalheritage.com",
      website: "www.bengalheritage.com",
      verified: true,
      image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be"
    },
    {
      name: "Sundarbans Explorers",
      rating: 4.9,
      reviews: 203,
      specialties: ["Wildlife Tours", "Nature Expeditions"],
      location: "South 24 Parganas, West Bengal",
      contact: "+91 98765 43211",
      email: "trips@sundarbanexplorers.com",
      website: "www.sundarbanexplorers.com",
      verified: true,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa"
    }
  ];

  return (
    <div className="min-h-screen pt-0 pb-20 px-4 max-w-lg mx-auto space-y-8 bg-gradient-to-b from-white to-blue-50/30">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 py-8"
      >
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-lg"
          />
          <div className="p-4 bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm rounded-full relative">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Travel Agencies
        </h1>
        <p className="text-gray-600 text-lg">Government approved, trusted travel partners</p>
      </motion.div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur transition-all duration-300 group-hover:blur-md" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
          <input
            type="text"
            placeholder="Search agencies by name or specialty"
            className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400 text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Agencies List */}
      <div className="space-y-6">
        {agencies.map((agency, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 space-y-4 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={agency.image}
                  alt={agency.name}
                  className="w-24 h-24 rounded-xl object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                {agency.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-purple-600 text-white p-1.5 rounded-full shadow-lg">
                    <Shield className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{agency.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{agency.rating}</span>
                    <span className="text-gray-400">({agency.reviews})</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{agency.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{agency.contact}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agency.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="space-x-3">
                <a
                  href={`mailto:${agency.email}`}
                  className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
                <a
                  href={`https://${agency.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </a>
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* List Your Agency CTA */}
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
          <PlusCircle className="w-12 h-12 mx-auto relative group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h2 className="text-2xl font-semibold">List Your Travel Agency</h2>
        <p className="text-white/90 text-lg">Join our network of trusted travel partners</p>
        <button
          onClick={() => window.location.href = '/list-agency'}
          className="w-full py-4 px-6 bg-white/90 backdrop-blur-sm text-primary rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}