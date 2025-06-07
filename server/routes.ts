import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy endpoint for the external skip API
  app.get("/api/skips", async (req, res) => {
    try {
      const response = await fetch(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );
      
      if (!response.ok) {
        throw new Error(`External API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching skip data:", error);
      res.status(500).json({ 
        message: "Failed to fetch skip data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
