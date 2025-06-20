import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Percent, Copy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";

const offerCategories = [
  { name: "All Offers", value: "" },
  { name: "Hotels", value: "Hotels" },
  { name: "Food", value: "Food" },
  { name: "Tours", value: "Tours" },
  { name: "Transport", value: "Transport" }
];

export default function Offers() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { toast } = useToast();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["/api/offers"],
    queryFn: async () => {
      const response = await fetch("/api/offers");
      if (!response.ok) throw new Error("Failed to fetch offers");
      return response.json();
    }
  });

  const filteredOffers = selectedCategory 
    ? offers.filter((offer: any) => offer.category === selectedCategory)
    : offers;

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: `Promo code ${code} copied to clipboard`,
    });
  };

  const getGradientClass = (backgroundColor: string) => {
    switch (backgroundColor) {
      case "from-green-500 to-green-600":
        return "gradient-green";
      case "from-orange-500 to-orange-600":
        return "gradient-orange";
      case "from-purple-500 to-purple-600":
        return "gradient-purple";
      default:
        return "gradient-blue";
    }
  };

  return (
    <div className="space-y-4">
      <div className="px-4 py-3">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-gray-900 mb-4"
        >
          Special Offers
        </motion.h2>
        
        {/* Category Filter */}
        <div className="horizontal-scroll flex space-x-2 mb-4 overflow-x-auto">
          {offerCategories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className="flex-shrink-0 rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Offers List */}
      <div className="px-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-8">
            <Percent className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Offers Available</h3>
            <p className="text-gray-600">
              {selectedCategory 
                ? `No ${selectedCategory.toLowerCase()} offers available right now`
                : "No active offers available right now"
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOffers.map((offer: any, index: number) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getGradientClass(offer.backgroundColor)} rounded-xl p-4 text-white`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                    <p className="text-sm opacity-90 mb-2">{offer.description}</p>
                    <div className="flex items-center text-xs opacity-80">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Valid until {format(parseISO(offer.validUntil), "MMM dd, yyyy")}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1 mb-2">
                      <span className="text-xs font-medium">{offer.code}</span>
                    </div>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        onClick={() => copyCode(offer.code)}
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy Code
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white text-gray-900 hover:bg-gray-100 w-full"
                      >
                        Claim Offer
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
