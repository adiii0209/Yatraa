import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function FloatingActionButton() {
  const { toast } = useToast();

  const handleAddToItinerary = () => {
    toast({
      title: "Add to Itinerary",
      description: "This feature will be available soon!",
    });
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleAddToItinerary}
      className="fixed bottom-24 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 z-40 animate-float"
    >
      <Plus className="w-6 h-6" />
    </motion.button>
  );
}
