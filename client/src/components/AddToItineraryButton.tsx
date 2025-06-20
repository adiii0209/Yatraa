import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Plus, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface AddToItineraryButtonProps {
  attractionId: number;
  attractionName: string;
  variant?: "button" | "icon";
  className?: string;
}

export default function AddToItineraryButton({ 
  attractionId, 
  attractionName, 
  variant = "button",
  className = ""
}: AddToItineraryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToItineraryMutation = useMutation({
    mutationFn: async (data: { attractionId: number; visitDate?: string; notes?: string }) => {
      return apiRequest('/api/itinerary', {
        method: 'POST',
        body: JSON.stringify({
          userId: 1, // Default user
          attractionId: data.attractionId,
          visitDate: data.visitDate ? new Date(data.visitDate) : null,
          notes: data.notes
        })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/itinerary'] });
      setIsAdded(true);
      setIsOpen(false);
      toast({
        title: "Added to Itinerary",
        description: `${attractionName} has been added to your travel itinerary.`,
      });
      
      // Reset added state after 3 seconds
      setTimeout(() => setIsAdded(false), 3000);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add to itinerary. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAddToItinerary = () => {
    addToItineraryMutation.mutate({
      attractionId,
      visitDate: visitDate || undefined,
      notes: notes || undefined
    });
  };

  const buttonContent = isAdded ? (
    <>
      <Check className="w-4 h-4" />
      {variant === "button" && <span>Added</span>}
    </>
  ) : (
    <>
      <Plus className="w-4 h-4" />
      {variant === "button" && <span>Add to Itinerary</span>}
    </>
  );

  if (variant === "icon") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 w-8 p-0 ${isAdded ? 'bg-green-50 border-green-200 text-green-600' : ''} ${className}`}
            disabled={addToItineraryMutation.isPending}
          >
            {buttonContent}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Add to Itinerary</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-medium text-gray-900">{attractionName}</p>
              <p className="text-sm text-gray-600">Plan your visit to this attraction</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitDate">Planned Visit Date (Optional)</Label>
              <Input
                id="visitDate"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about your visit plans..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                onClick={handleAddToItinerary}
                disabled={addToItineraryMutation.isPending}
                className="flex-1"
              >
                {addToItineraryMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Add to Itinerary</span>
                  </div>
                )}
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className={`flex items-center space-x-2 ${isAdded ? 'bg-green-50 border-green-200 text-green-600' : ''} ${className}`}
            disabled={addToItineraryMutation.isPending}
          >
            {buttonContent}
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Add to Itinerary</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium text-gray-900">{attractionName}</p>
            <p className="text-sm text-gray-600">Plan your visit to this attraction</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitDate">Planned Visit Date (Optional)</Label>
            <Input
              id="visitDate"
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about your visit plans..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              onClick={handleAddToItinerary}
              disabled={addToItineraryMutation.isPending}
              className="flex-1"
            >
              {addToItineraryMutation.isPending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Add to Itinerary</span>
                </div>
              )}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}