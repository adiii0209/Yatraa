import { motion } from "framer-motion";
import { Users, Star, Award, MapPin, MessageCircle } from "lucide-react";

export default function LocalGuide() {
  return (
    <div className="min-h-screen pt-5 pb-20 px-4 max-w-lg mx-auto space-y-8 bg-gradient-to-b from-white to-blue-50/30">
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
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur"
          />
          <Users className="w-12 h-12 text-primary relative" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Become a Local Guide</h1>
        <p className="text-gray-600 text-lg">Share your knowledge, earn rewards, and help others explore West Bengal</p>
      </motion.div>

      {/* Benefits Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Benefits</h2>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              icon: Star,
              title: "Earn Points",
              description: "Get points for every contribution you make"
            },
            {
              icon: Award,
              title: "Special Badges",
              description: "Unlock exclusive badges as you level up"
            },
            {
              icon: MapPin,
              title: "Local Expert Status",
              description: "Be recognized as an authority in your area"
            },
            {
              icon: MessageCircle,
              title: "Direct Connect",
              description: "Interact directly with travelers"
            }
          ].map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 flex items-start gap-3 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-2 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-base">{benefit.title}</h3>
                  <p className="text-xs text-gray-500">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">How It Works</h2>
        <div className="space-y-2">
          {[
            "Sign up as a local guide",
            "Complete your profile with your expertise",
            "Start contributing reviews and tips",
            "Help travelers and earn points",
            "Level up and unlock more benefits"
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/20"
            >
              <span className="w-7 h-7 flex items-center justify-center bg-gradient-to-r from-primary to-purple-600 text-white rounded-full text-xs font-medium shadow-md">
                {index + 1}
              </span>
              <span className="text-gray-700 text-sm">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <button
          onClick={() => window.location.href = '/become-guide'}
          className="w-full py-4 px-6 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Join as Local Guide
        </button>
        <button
          onClick={() => window.location.href = '/official-guides'}
          className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm text-primary border-2 border-primary/20 rounded-xl font-medium hover:bg-primary/5 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Find Official Guides
        </button>
      </motion.div>
    </div>
  );
}