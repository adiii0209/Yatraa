import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Attractions routes
  app.get("/api/attractions", async (req, res) => {
    try {
      const city = req.query.city as string | undefined;
      const attractions = await storage.getAttractions(city);
      res.json(attractions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attractions" });
    }
  });

  app.get("/api/attractions/trending", async (req, res) => {
    try {
      const city = req.query.city as string | undefined;
      const trending = await storage.getTrendingAttractions(city);
      res.json(trending);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trending attractions" });
    }
  });

  app.get("/api/attractions/featured", async (req, res) => {
    try {
      const city = req.query.city as string | undefined;
      const featured = await storage.getFeaturedAttractions(city);
      res.json(featured);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured attractions" });
    }
  });

  app.get("/api/attractions/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      const city = req.query.city as string | undefined;
      
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }

      const results = await storage.searchAttractions(query, city);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to search attractions" });
    }
  });

  app.get("/api/attractions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const attraction = await storage.getAttraction(id);
      
      if (!attraction) {
        return res.status(404).json({ error: "Attraction not found" });
      }

      res.json(attraction);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attraction" });
    }
  });

  // Events routes
  app.get("/api/events", async (req, res) => {
    try {
      const city = req.query.city as string | undefined;
      const events = await storage.getEvents(city);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/upcoming", async (req, res) => {
    try {
      const city = req.query.city as string | undefined;
      const events = await storage.getUpcomingEvents(city);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch upcoming events" });
    }
  });

  app.get("/api/events/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const city = req.query.city as string | undefined;
      const events = await storage.getEventsByCategory(category, city);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events by category" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  // Offers routes
  app.get("/api/offers", async (req, res) => {
    try {
      const offers = await storage.getActiveOffers();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch offers" });
    }
  });

  app.get("/api/offers/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const offers = await storage.getOffersByCategory(category);
      res.json(offers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch offers by category" });
    }
  });

  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // User favorites routes  
  app.get("/api/user/:userId/favorites", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const favorites = await storage.getUserFavorites(userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user favorites" });
    }
  });

  app.post("/api/user/:userId/favorites", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { attractionId } = req.body;
      
      const favorite = await storage.addUserFavorite({ userId, attractionId });
      res.json(favorite);
    } catch (error) {
      res.status(500).json({ error: "Failed to add favorite" });
    }
  });

  app.delete("/api/user/:userId/favorites/:attractionId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const attractionId = parseInt(req.params.attractionId);
      
      const removed = await storage.removeUserFavorite(userId, attractionId);
      if (removed) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Favorite not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to remove favorite" });
    }
  });

  // User bookings routes
  app.get("/api/user/:userId/bookings", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const bookings = await storage.getUserBookings(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user bookings" });
    }
  });

  app.post("/api/user/:userId/bookings", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { eventId } = req.body;
      
      const booking = await storage.createBooking({ userId, eventId, status: "confirmed" });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
