import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CreditCard, Users, Clock, ChevronRight, Check } from "lucide-react";

interface EntryFee {
  type: string;
  price: number;
  description: string;
  includes?: string[];
}

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attraction: any;
}

export default function BookingDialog({ isOpen, onClose, attraction }: BookingDialogProps) {
  const [step, setStep] = useState(1);

  // Helper to extract a number from a string like "Entry fee: ₹499 per person"
  function extractEntryFee(str: string | undefined): number {
    if (!str) return 0;
    const match = str.match(/\u20B9\s?(\d+)/); // \u20B9 is the ₹ symbol
    return match ? parseInt(match[1], 10) : 0;
  }

  const entryFees: EntryFee[] = attraction.entryFees || [
    {
      type: "Standard",
      price: extractEntryFee(attraction.entryFee), // Extract price from string
      description: typeof attraction.entryFee === "string" ? attraction.entryFee : "Regular entry ticket",
      includes: ["Basic access", "Visitor guide"]
    }
  ];

  // Initial state helpers
  const getInitialBookingDetails = () => ({
    date: "",
    time: "",
    tickets: 1,
    name: "",
    email: "",
    phone: "",
    paymentMethod: "card", // card or upi
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: ""
  });

  const [selectedFee, setSelectedFee] = useState<EntryFee>(entryFees[0]);
  const [bookingDetails, setBookingDetails] = useState(getInitialBookingDetails());

  // Reset dialog state when closed or after booking
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setBookingDetails(getInitialBookingDetails());
      setSelectedFee(entryFees[0]);
    }
  }, [isOpen, attraction]);

  const calculateTotal = () => {
    const subtotal = selectedFee.price * bookingDetails.tickets;
    const bookingFee = selectedFee.price > 0 ? 20 : 0; // Change booking fee to 20 if price > 0
    return subtotal + bookingFee;
  };
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!bookingDetails.date || !bookingDetails.time) {
      toast({
        title: "Missing Information",
        description: "Please select date and time for your visit",
        variant: "destructive"
      });
      return;
    }

    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all personal details",
        variant: "destructive"
      });
      return;
    }

    // Simulate payment processing
    setStep(4); // Show loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success and close
    toast({
      title: "Booking Confirmed!",
      description: `Successfully ${attraction.price > 0 ? "purchased" : "reserved"} ${bookingDetails.tickets} ticket${bookingDetails.tickets > 1 ? "s" : ""} for ${attraction.name}. Check your email for details.`
    });
    setStep(1);
    setBookingDetails(getInitialBookingDetails());
    setSelectedFee(entryFees[0]);
    onClose();
  };

  const steps = [
    {
      title: "Select Date & Tickets",
      content: (
        <div className="space-y-3 max-w-[320px] mx-auto p-1">
          <div className="space-y-3">
            <div className="p-2 bg-primary/5 rounded-lg">
              <h3 className="text-base font-semibold mb-1 text-center">{attraction.name}</h3>
              <div className="space-y-2">
                {entryFees.map((fee) => (
                  <div
                    key={fee.type}
                    className={`p-2 rounded-lg border-2 cursor-pointer transition-all ${selectedFee.type === fee.type ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/50'}`}
                    onClick={() => setSelectedFee(fee)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-base font-medium">{fee.type}</h4>
                        <p className="text-sm text-muted-foreground">{fee.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-base">{fee.price > 0 ? `₹${fee.price}` : "Free"}</p>
                        <p className="text-xs text-muted-foreground">per person</p>
                      </div>
                    </div>
                    {fee.includes && (
                      <div className="mt-1 space-y-1">
                        {fee.includes.map((item, index) => (
                          <div key={index} className="flex items-center text-xs text-muted-foreground">
                            <Check className="w-4 h-4 mr-2 text-primary" />
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-sm">Date</Label>
            <Input
              type="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="h-9 text-base px-2"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-sm">Number of People</Label>
            <div className="flex items-center gap-2">
              <Button type="button" size="icon" variant="outline" className="h-8 w-8 p-0" onClick={() => setBookingDetails(prev => ({ ...prev, tickets: Math.max(1, prev.tickets - 1) }))}>
                <span className="text-lg">-</span>
              </Button>
              <span className="w-10 text-center text-base">{bookingDetails.tickets}</span>
              <Button type="button" size="icon" variant="outline" className="h-8 w-8 p-0" onClick={() => setBookingDetails(prev => ({ ...prev, tickets: Math.min(10, prev.tickets + 1) }))}>
                <span className="text-lg">+</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Maximum 10 people per booking</p>
          </div>
          <div className="space-y-1">
            <Label className="text-sm">Time</Label>
            <Input
              type="time"
              name="time"
              value={bookingDetails.time}
              onChange={handleInputChange}
              className="h-9 text-base px-2"
            />
          </div>
        </div>
      )
    },
    {
      title: "Personal Details",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              name="name"
              value={bookingDetails.name}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={bookingDetails.phone}
              onChange={handleInputChange}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>
      )
    },
    {
      title: attraction.price > 0 ? "Payment" : "Confirm Reservation",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>{selectedFee.type} Tickets ({bookingDetails.tickets}x)</span>
              <span>{selectedFee.price > 0 ? `₹${selectedFee.price * bookingDetails.tickets}` : "Free"}</span>
            </div>
            {selectedFee.price > 0 && (
              <div className="flex justify-between text-sm">
                <span>Booking Fee</span>
                <span>₹20</span>
              </div>
            )}
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>{selectedFee.price > 0 ? `₹${calculateTotal()}` : "Free"}</span>
            </div>
          </div>

          {attraction.price > 0 && (
            <div className="space-y-4">
              <div>
                <Label className="block mb-2 text-base font-semibold">Payment Method</Label>
                <div className="flex gap-4 mb-2">
                  <Button
                    type="button"
                    variant={bookingDetails.paymentMethod === "card" ? "default" : "outline"}
                    className="flex-1 flex items-center justify-center py-2 px-3 text-base"
                    onClick={() => handleInputChange({ target: { name: "paymentMethod", value: "card" } } as any)}
                    aria-pressed={bookingDetails.paymentMethod === "card"}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Card
                  </Button>
                  <Button
                    type="button"
                    variant={bookingDetails.paymentMethod === "upi" ? "default" : "outline"}
                    className="flex-1 flex items-center justify-center py-2 px-3 text-base"
                    onClick={() => handleInputChange({ target: { name: "paymentMethod", value: "upi" } } as any)}
                    aria-pressed={bookingDetails.paymentMethod === "upi"}
                  >
                    <img src="/upi-icon.svg" className="w-5 h-5 mr-2" alt="UPI" />
                    UPI
                  </Button>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {bookingDetails.paymentMethod === "card" ? (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-2">
                      <Label>Card Number</Label>
                      <Input
                        name="cardNumber"
                        value={bookingDetails.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        inputMode="numeric"
                        maxLength={19}
                        className="text-base"
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
                          maxLength={5}
                          className="text-base"
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
                          className="text-base"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upi"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-2">
                      <Label>UPI ID</Label>
                      <Input
                        name="upiId"
                        value={bookingDetails.upiId}
                        onChange={handleInputChange}
                        placeholder="username@upi"
                        className="text-base"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="pt-2 text-sm text-muted-foreground">
                <span>Selected: </span>
                <span className="font-medium text-primary">
                  {bookingDetails.paymentMethod === "card" ? "Card" : "UPI"}
                </span>
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] z-[9999] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Book Tickets</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Progress Indicator */}
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
                {step === 3 ? (selectedFee.price > 0 ? "Confirm & Pay" : "Confirm Reservation") : "Continue"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}