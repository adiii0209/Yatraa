import { MessageSquare, X, Send, Globe, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./ChatMessage";

export default function FloatingActionButton() {
  const { toast } = useToast();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ message: string; isUser: boolean }>>([
    { message: "Hello! I'm your AI travel guide. How can I assist you today?", isUser: false }
  ]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = message.trim();
    setMessage("");
    setChatHistory(prev => [...prev, { message: userMessage, isUser: true }]);
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      let response = "I'm still in development, but I'll be able to help you with translations and travel planning soon!";
      
      if (userMessage.toLowerCase().includes("translate")) {
        response = "I'll be able to help you translate between different languages soon. Which languages would you like to translate between?";
      } else if (userMessage.toLowerCase().includes("itinerary") || userMessage.toLowerCase().includes("plan")) {
        response = "I'll be able to help you plan your perfect itinerary soon! I'll consider factors like your interests, budget, and available time.";
      }

      setChatHistory(prev => [...prev, { message: response, isUser: false }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <h3 className="font-semibold">AI Travel Guide</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary/90 p-1 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div ref={chatContainerRef} className="h-96 p-4 overflow-y-auto bg-gray-50 scroll-smooth">
              <div className="space-y-4">
                <div className="space-y-4 mb-4">
                  {chatHistory.map((chat, index) => (
                    <ChatMessage key={index} message={chat.message} isUser={chat.isUser} />
                  ))}
                  {isLoading && (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      setMessage("Help me translate");
                      handleSendMessage();
                    }}
                    disabled={isLoading}
                  >
                    <Globe className="w-4 h-4" />
                    Translation
                  </button>
                  <button
                    className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      setMessage("Plan my itinerary");
                      handleSendMessage();
                    }}
                    disabled={isLoading}
                  >
                    <Calendar className="w-4 h-4" />
                    Itinerary
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything about your trip..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    message.trim()
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 z-40 animate-float"
        style={{ display: isOpen ? 'none' : 'block' }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </>
  );
}
