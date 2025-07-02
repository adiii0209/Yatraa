import { motion } from "framer-motion";
import { Gift, Star, Trophy, Zap, Crown } from "lucide-react";

export default function TravelRewards() {
  const currentPoints = 150;
  const nextTier = 200;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-5 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Points Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-violet-600 via-primary to-blue-500 rounded-3xl p-8 text-white shadow-xl shadow-primary/20 backdrop-blur-sm border border-white/20"
        >
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold bg-clip-text">Your Travel Points</h1>
            <div className="text-6xl font-bold mt-4 flex items-center justify-center gap-2">
              <Star className="w-8 h-8 text-yellow-300 animate-pulse" />
              {currentPoints}
            </div>
            <p className="text-lg opacity-90 mt-2">{nextTier - currentPoints} points to next tier</p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 space-y-2">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-yellow-300 via-white to-yellow-300 rounded-full transition-all duration-500 animate-shimmer"
                style={{ width: `${(currentPoints / nextTier) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Rewards Tiers */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Rewards Tiers
          </h2>
          <div className="grid gap-3">
            {[
              {
                icon: Star,
                title: "Explorer",
                points: "0-100",
                benefits: ["Basic travel guides", "Community access"]
              },
              {
                icon: Zap,
                title: "Adventurer",
                points: "101-300",
                benefits: ["10% off on bookings", "Priority support"]
              },
              {
                icon: Trophy,
                title: "Voyager",
                points: "301-500",
                benefits: ["20% off on bookings", "Exclusive events access"]
              },
              {
                icon: Crown,
                title: "Elite",
                points: "501+",
                benefits: ["30% off on bookings", "Personal travel concierge"]
              }
            ].map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium text-gray-900 text-base">{tier.title}</h3>
                        <span className="text-xs text-gray-500">{tier.points} pts</span>
                      </div>
                      <ul className="space-y-0.5">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            How to Earn Points
          </h2>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="space-y-3">
              {[
                { action: "Write a review", points: 10 },
                { action: "Book a hotel", points: 50 },
                { action: "Complete a trip", points: 100 },
                { action: "Share travel photos", points: 5 },
                { action: "Refer a friend", points: 200 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center py-2 border-b last:border-0 border-gray-100"
                >
                  <span className="text-gray-700">{item.action}</span>
                  <span className="font-medium text-primary flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    {item.points} pts
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 text-center space-y-6 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <Gift className="w-8 h-8 mx-auto text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Ready to Redeem?</h2>
          <p className="text-gray-600">Use your points to get amazing rewards and experiences</p>
          <button
            onClick={() => window.location.href = '/redeem-rewards'}
            className="w-full py-4 px-6 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-white rounded-xl font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            View Available Rewards
          </button>
        </motion.div>
      </div>
    </div>
  );
}