import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  Share2, 
  Calendar,
  Camera,
  Users,
  Coffee,
  Wifi,
  Car,
  Shield,
  Mail,
  Check,
  ArrowLeft,
  Heart,
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import RealInteractiveMap from "../components/RealInteractiveMap";
import { useToast } from "@/hooks/use-toast";

const bookingOptions = [
  {
    id: 1,
    name: "Standard Tour",
    description: "Guided tour of the main attractions",
    price: "₹999",
    duration: "2 hours",
    maxGroupSize: 15,
    includes: ["Professional guide", "Entry tickets", "Bottled water"]
  },
  {
    id: 2,
    name: "Premium Experience",
    description: "Private tour with photography session",
    price: "₹2499",
    duration: "3 hours",
    maxGroupSize: 6,
    includes: ["Private guide", "Entry tickets", "Professional photos", "Refreshments"]
  }
];

const facilities = [
  { icon: Coffee, label: "Cafe/Restaurant" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: Car, label: "Parking" },
  { icon: Camera, label: "Photography" },
  { icon: Shield, label: "Security" },
  { icon: Users, label: "Group Tours" }
];

const contactInfo = {
  phone: "+91 33 2345 6789",
  email: "info@victoriamemorial.gov.in",
  website: "www.victoriamemorial-cal.org",
  address: "Victoria Memorial Hall, 1, Queens Way, Kolkata, West Bengal 700071",
  openingDays: "Tuesday to Sunday",
  openingHours: "10:00 AM - 5:00 PM",
  bestTimeToVisit: "Early morning or late afternoon"
};

const reviews = [
  {
    id: 1,
    name: "Anita Sharma",
    avatar: "AS",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely stunning architecture and rich history. The guided tour was very informative. Must visit when in Kolkata!"
  },
  {
    id: 2,
    name: "Raj Patel",
    avatar: "RP",
    rating: 4,
    date: "1 week ago",
    comment: "Beautiful monument with great photo opportunities. Can get crowded during weekends. Best to visit early morning."
  },
  {
    id: 3,
    name: "Priya Das",
    avatar: "PD",
    rating: 5,
    date: "2 weeks ago",
    comment: "One of the most iconic landmarks of Kolkata. The marble work is exquisite and the surrounding gardens are well maintained."
  }
];

// Accept attraction as a prop
interface AttractionDetailsProps {
  attraction: any;
}

function AttractionDetails({ attraction }: AttractionDetailsProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: attraction.name,
        text: attraction.shortDescription,
        url: window.location.href
      });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard!" });
    } else {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        toast({ title: "Link copied to clipboard!" });
      } catch (err) {
        toast({ title: "Failed to copy link. Please copy it manually.", variant: "destructive" });
      }
      document.body.removeChild(textArea);
    }
  };

  const handleDirections = () => {
    const query = encodeURIComponent(`${attraction.name}, ${attraction.location}`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 w-full overflow-x-hidden"
    >
      {/* Hero Section */}
      <div className="relative w-full aspect-[16/9] h-64 sm:h-80 overflow-hidden">
        <img
          src={attraction?.imageUrl}
          alt={attraction?.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-attraction.jpg";
            e.currentTarget.classList.add("animate-pulse");
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {/* Header Controls */}
        <div className="absolute top-2 left-2 right-2 z-10">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.history.back()}
              className="bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        {/* Title and Quick Info */}
        <div className="absolute bottom-4 left-2 right-2 z-10">
          <div className="space-y-2">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">{attraction?.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{attraction?.city}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                  <span>{attraction?.rating} ({attraction?.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{attraction?.openingHours}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white/100 px-2 py-0.5 text-xs font-medium">
                Open Now
              </Badge>
              <Badge variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white/100 px-2 py-0.5 text-xs font-medium">
                {attraction?.category}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      {/* Fixed Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 px-2 h-20 flex items-center justify-between gap-2 w-full max-w-md mx-auto shadow-xl">
          <Button
            className="flex-1 h-12 text-base"
            variant="outline"
            onClick={handleDirections}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Get Directions
          </Button>
          <Button
            className="flex-1 h-12 text-base bg-primary text-white hover:bg-primary/90 transition-colors"
            onClick={() => setShowBookingModal(true)}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Tour
          </Button>
        </div>
      </div>
      {/* Main Content */}
      <div className="px-2 py-6 pb-24 w-full max-w-md mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tours">Tours</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-sm text-gray-700 break-words max-w-[220px]">{attraction?.location}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-sm text-gray-700 ">{attraction?.openHours || contactInfo.openingHours}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Phone className="w-4 h-4 text-primary mt-0.5" />
                    <a href={`tel:${attraction.contactNumber}`} className="text-sm text-gray-700 hover:text-primary break-all">
                      {attraction.contactNumber}
                    </a> 
                  </div>
                  <div className="flex items-start space-x-2">
                    <Mail className="w-4 h-4 text-primary mt-0.5" />
                    {attraction?.website ? (
                      <a href={attraction.website.startsWith('http') ? attraction.website : `https://${attraction.website}`}
                         target="_blank" rel="noopener noreferrer"
                         className="text-sm text-primary underline break-all max-w-[240px]">
                        {attraction.website}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-700 break-all max-w-[220px]">No website listed</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">{attraction?.description}</p>
            </div>
            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Facilities & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <facility.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-700">{facility.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Best Time to Visit */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Best Time to Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{contactInfo.bestTimeToVisit}</p>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            {bookingOptions.map((option) => (
              <Card key={option.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{option.name}</h3>
                      <p className="text-gray-600 mt-1">{option.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-lg font-semibold">{option.price}</Badge>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {option.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Max {option.maxGroupSize} people
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="font-medium text-gray-900">What's Included:</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {option.includes?.map((item, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={() => setShowBookingModal(true)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book This Tour
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="reviews" className="space-y-4">
            {/* Reviews Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <p className="text-sm text-gray-500">{reviews.length} reviews</p>
              </div>
              <Button onClick={() => setShowReviewModal(true)} variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Write a Review
              </Button>
            </div>
            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback>{review.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="map" className="h-[400px]">
            <RealInteractiveMap
              locations={[{
                id: attraction.id,
                name: attraction.name,
                category: attraction.category,
                latitude: parseFloat(attraction.latitude || "22.5"),
                longitude: parseFloat(attraction.longitude || "88.3"),
                imageUrl: attraction.imageUrl
              }]}
              selectedLocation={{
                id: attraction.id,
                name: attraction.name,
                category: attraction.category,
                latitude: parseFloat(attraction.latitude || "22.5"),
                longitude: parseFloat(attraction.longitude || "88.3"),
                imageUrl: attraction.imageUrl
              }}
              className="rounded-lg"
            />
          </TabsContent>
        </Tabs>
      </div>
      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Your Tour</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Preferred Time</Label>
              <select
                id="time"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                defaultValue="2"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tour-type">Tour Type</Label>
              <select
                id="tour-type"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {bookingOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name} - {option.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Special Requests</Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements or requests?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowBookingModal(false);
                alert("Your tour has been booked successfully!");
              }}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              <div className="flex items-center space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="sm"
                    className="p-0 hover:bg-transparent"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  >
                    <Star
                      className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowReviewModal(false);
                alert("Thank you for sharing your experience!");
                setNewReview({ rating: 5, comment: "" });
              }}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default AttractionDetails;