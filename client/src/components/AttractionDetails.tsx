import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  Heart, 
  Share2, 
  Directions,
  Calendar,
  Camera,
  Users,
  Coffee,
  Wifi,
  Car,
  CreditCard,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import AddToItineraryButton from "./AddToItineraryButton";
import RealInteractiveMap from "./RealInteractiveMap";

interface AttractionDetailsProps {
  attractionId: number;
  onBack: () => void;
}

const facilities = [
  { icon: Coffee, label: "Cafe/Restaurant" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: Car, label: "Parking" },
  { icon: Camera, label: "Photography" },
  { icon: Shield, label: "Security" },
  { icon: Users, label: "Group Tours" }
];

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

export default function AttractionDetails({ attractionId, onBack }: AttractionDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: attraction, isLoading } = useQuery({
    queryKey: ['/api/attractions', attractionId],
    queryFn: async () => {
      const response = await fetch(`/api/attractions/${attractionId}`);
      return response.json();
    }
  });

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        return apiRequest(`/api/favorites/${attractionId}`, { method: 'DELETE' });
      } else {
        return apiRequest('/api/favorites', {
          method: 'POST',
          body: JSON.stringify({ userId: 1, attractionId })
        });
      }
    },
    onSuccess: () => {
      setIsFavorite(!isFavorite);
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite 
          ? `${attraction.name} removed from your favorites`
          : `${attraction.name} added to your favorites`
      });
    }
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: attraction.name,
        text: attraction.shortDescription,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Attraction link copied to clipboard"
      });
    }
  };

  const handleDirections = () => {
    const query = encodeURIComponent(`${attraction.name}, ${attraction.location}`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="h-64 bg-gray-200" />
        <div className="p-4 space-y-4">
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Attraction not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={attraction.imageUrl}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Header Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="bg-white/90 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => favoriteMutation.mutate()}
              disabled={favoriteMutation.isPending}
              className={`bg-white/90 backdrop-blur-sm ${isFavorite ? 'text-red-500' : ''}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white mb-2">{attraction.name}</h1>
          <div className="flex items-center space-x-4 text-white/90 text-sm">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {attraction.city}
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
              {attraction.rating} ({attraction.reviewCount} reviews)
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Quick Actions */}
        <div className="flex space-x-3 mb-6">
          <Button onClick={handleDirections} className="flex-1">
            <Directions className="w-4 h-4 mr-2" />
            Directions
          </Button>
          <AddToItineraryButton 
            attractionId={attraction.id}
            attractionName={attraction.name}
            variant="button"
            className="flex-1"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-700 leading-relaxed">{attraction.description}</p>
              </CardContent>
            </Card>

            {/* Key Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Opening Hours
                  </div>
                  <span className="font-medium">{attraction.openHours}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Entry Fee
                  </div>
                  <Badge variant="outline">{attraction.entryFee}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    Category
                  </div>
                  <Badge>{attraction.category}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {facilities.map((facility, index) => {
                    const Icon = facility.icon;
                    return (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <Icon className="w-4 h-4 text-primary" />
                        <span>{facility.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">+91-33-2223-1234</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-gray-600">{attraction.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Guided Tour - ₹150/person
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Group Booking (10+ people) - ₹100/person
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Free cancellation up to 24 hours before your visit
                </p>
              </CardContent>
            </Card>

            {/* Best Time to Visit */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Best Time to Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Least Crowded</span>
                    <Badge variant="outline">9:00 AM - 11:00 AM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Most Crowded</span>
                    <Badge variant="outline">2:00 PM - 5:00 PM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Best Light</span>
                    <Badge variant="outline">Golden Hour</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            {/* Rating Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{attraction.rating}</div>
                    <div className="flex items-center justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(parseFloat(attraction.rating)) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">{attraction.reviewCount} reviews</div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-2 text-sm">
                        <span className="w-4">{stars}</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${Math.random() * 80 + 20}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{review.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{review.name}</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map">
            <Card>
              <CardContent className="p-0">
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
              </CardContent>
            </Card>
            
            {/* Nearby Places */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Nearby Attractions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p>Loading nearby attractions...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}