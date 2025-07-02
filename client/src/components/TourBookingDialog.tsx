import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CreditCard, Users, Clock, ChevronRight, Check } from "lucide-react";

interface TourBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attraction: any;
}

export default function TourBookingDialog({ isOpen, onClose, attraction }: TourBookingDialogProps) {
  const tourOptions = [
    {
      id: 1,
      name: "Standard Tour",
      description: "Guided tour of the main attractions",
      price: attraction?.price ? 999 : 0,
      duration: "2 hours",
      maxGroupSize: 15,
      includes: ["Professional guide", "Entry tickets", "Bottled water"]
    },
    {
      id: 2,
      name: "Premium Experience",
      description: "Private tour with photography session",
      price: attraction?.price ? 2499 : 499,
      duration: "3 hours",
      maxGroupSize: 6,
      includes: ["Private guide", "Entry tickets", "Professional photos", "Refreshments"]
    }
  ];

  const [step, setStep] = useState(1);
  const [selectedTour, setSelectedTour] = useState(tourOptions[0]);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    participants: 1,
    name: "",
    email: "",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setStep(4);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Tour Booked Successfully!",
      description: "Your tour has been booked. Check your email for details."
    });
    setStep(1);
    onClose();
  };

  const steps = [
    {
      title: "Select Tour Package",
      content: (
        <div className="space-y-4">
          {tourOptions.map((tour) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedTour.id === tour.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
              onClick={() => setSelectedTour(tour)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{tour.name}</h3>
                  <p className="text-sm text-gray-500">{tour.description}</p>
                </div>
                <span className="font-medium text-primary">₹{tour.price}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Max {tour.maxGroupSize}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">Includes:</p>
                <ul className="mt-1 space-y-1">
                  {tour.includes.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "Tour Details",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="space-y-2">
            <Label>Time</Label>
            <Input
              type="time"
              name="time"
              value={bookingDetails.time}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Number of Participants</Label>
            <Input
              type="number"
              name="participants"
              value={bookingDetails.participants}
              onChange={handleInputChange}
              min="1"
              max={selectedTour.maxGroupSize}
            />
          </div>
        </div>
      )
    },
    {
      title: "Payment",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tour Package</span>
              <span>{selectedTour.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Participants ({bookingDetails.participants}x)</span>
              <span>₹{selectedTour.price * bookingDetails.participants}</span>
            </div>
            <div className="flex justify-between text-sm">
              {selectedTour.price > 0 && (
                <>
                  <span>Booking Fee</span>
                  <span>₹199</span>
                </>
              )}
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>₹{selectedTour.price > 0 ? (selectedTour.price * bookingDetails.participants + 199) : 0}</span>
            </div>
          </div>

          {selectedTour.price > 0 ? (
            <div className="flex gap-4">
              <Button
                type="button"
                variant={bookingDetails.paymentMethod === "card" ? "default" : "outline"}
                className="flex-1"
                onClick={() => handleInputChange({ target: { name: "paymentMethod", value: "card" } } as any)}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Card
              </Button>
              <Button
                type="button"
                variant={bookingDetails.paymentMethod === "upi" ? "default" : "outline"}
                className="flex-1"
                onClick={() => handleInputChange({ target: { name: "paymentMethod", value: "upi" } } as any)}
              >
                <img src="/upi-icon.svg" className="w-4 h-4 mr-2" />
                UPI
              </Button>
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              This tour is free! Just confirm your booking details above.
            </div>
          )}

          {selectedTour.price > 0 ? (
            <div className="space-y-4">
              {bookingDetails.paymentMethod === "card" ? (
                <>
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input
                      name="cardNumber"
                      value={bookingDetails.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input
                        name="expiryDate"
                        value={bookingDetails.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input
                        type="password"
                        name="cvv"
                        value={bookingDetails.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label>UPI ID</Label>
                  <Input
                    name="upiId"
                    value={bookingDetails.upiId}
                    onChange={handleInputChange}
                    placeholder="username@upi"
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      )
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Tour</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex justify-between mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: step > i ? "#22c55e" : step === i + 1 ? "#0f172a" : "#e5e7eb",
                    scale: step === i + 1 ? 1.1 : 1
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                >
                  {step > i ? <Check className="w-5 h-5" /> : i + 1}
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="w-12 h-[2px] mx-2" style={{ backgroundColor: step > i ? "#22c55e" : "#e5e7eb" }} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 4 ? (
                <div className="py-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"
                  />
                  <p className="mt-4 text-gray-600">Processing your booking...</p>
                </div>
              ) : (
                steps[step - 1].content
              )}
            </motion.div>
          </AnimatePresence>

          {step < 4 && (
            <div className="mt-6 flex justify-end gap-2">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(s => s - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                onClick={() => step === 3 ? handleSubmit() : setStep(s => s + 1)}
              >
                {step === 3 ? "Confirm & Pay" : "Continue"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}