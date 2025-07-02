import { motion } from "framer-motion";
import { Gift, Ticket, Hotel, Plane, Coffee, ShoppingBag, Camera, Award, Star } from "lucide-react";
import { useState } from "react";

export default function RedeemRewards() {
  const [points] = useState(150);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Rewards", icon: Gift },
    { id: "travel", name: "Travel", icon: Plane },
    { id: "stays", name: "Stays", icon: Hotel },
    { id: "experiences", name: "Experiences", icon: Camera },
    { id: "shopping", name: "Shopping", icon: ShoppingBag }
  ];

  const rewards = [
    {
      title: "5-Star Hotel Stay",
      description: "One night stay at luxury hotels",
      points: 500,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      category: "stays",
      value: "₹8,000"
    },
    {
      title: "Adventure Package",
      description: "Full day adventure activities",
      points: 300,
      image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
      category: "experiences",
      value: "₹5,000"
    },
    {
      title: "Shopping Voucher",
      description: "Valid at partner stores",
      points: 200,
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
      category: "shopping",
      value: "₹2,000"
    },
    {
      title: "Flight Discount",
      description: "Up to 20% off on flights",
      points: 400,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
      category: "travel",
      value: "₹6,000"
    }
  ];

  const filteredRewards = selectedCategory === "all" 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-5 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
      {/* Points Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-violet-600 via-primary to-blue-500 rounded-2xl p-4 text-white shadow-xl shadow-primary/20 backdrop-blur-sm border border-white/20 w-full"
      >
        <div className="text-center space-y-2">
          <Award className="w-8 h-8 mx-auto text-yellow-300 animate-pulse" />
          <h1 className="text-xl font-bold bg-clip-text">Your Points Balance</h1>
          <div className="text-4xl font-bold mt-2 flex items-center justify-center gap-2">
            <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
            {points}
          </div>
          <p className="text-base opacity-90 mt-1">Redeem your points for amazing rewards</p>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="overflow-x-auto -mx-4 px-4 py-2 w-full bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
        <div className="flex space-x-3 pb-2">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${selectedCategory === category.id ? 'bg-gradient-to-r from-primary to-violet-600 text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {filteredRewards.map((reward, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30 transform hover:-translate-y-1 group w-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={reward.image}
                alt={reward.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div className="absolute top-3 right-3 bg-white/90 text-gray-900 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                Value: {reward.value}
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary transition-colors">{reward.title}</h3>
                <p className="text-sm text-gray-600">{reward.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-primary">
                  <Gift className="w-4 h-4" />
                  <span className="font-medium text-sm">{reward.points} pts</span>
                </div>
                <button
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${points >= reward.points ? 'bg-gradient-to-r from-primary to-violet-600 text-white hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  disabled={points < reward.points}
                >
                  {points >= reward.points ? 'Redeem Now' : 'Not Enough Points'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Earn More Points CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 text-center space-y-6 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm w-full"
      >
        <Ticket className="w-7 h-7 mx-auto text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Want more rewards?</h2>
        <p className="text-gray-600 text-sm">Complete trips and activities to earn more points</p>
        <button
          onClick={() => window.location.href = '/rewards'}
          className="w-full py-4 px-6 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-white rounded-xl font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
        >
          View Ways to Earn
        </button>
      </motion.div>
      </div>
    </div>
  );
}