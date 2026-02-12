import type { Express, Request, Response } from "express";
import { createServer, type Server } from "node:http";

const WEATHER_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/weather/current", async (req: Request, res: Response) => {
    try {
      const { lat, lon } = req.query;
      if (!lat || !lon) {
        return res.status(400).json({ error: "lat and lon are required" });
      }
      if (!WEATHER_API_KEY) {
        return res.status(500).json({ error: "Weather API key not configured" });
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      res.json(data);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  app.get("/api/weather/forecast", async (req: Request, res: Response) => {
    try {
      const { lat, lon } = req.query;
      if (!lat || !lon) {
        return res.status(400).json({ error: "lat and lon are required" });
      }
      if (!WEATHER_API_KEY) {
        return res.status(500).json({ error: "Weather API key not configured" });
      }
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      res.json(data);
    } catch (error) {
      console.error("Forecast API error:", error);
      res.status(500).json({ error: "Failed to fetch forecast data" });
    }
  });

  app.get("/api/geocode/reverse", async (req: Request, res: Response) => {
    try {
      const { lat, lon } = req.query;
      if (!lat || !lon) {
        return res.status(400).json({ error: "lat and lon are required" });
      }
      if (!WEATHER_API_KEY) {
        return res.status(500).json({ error: "API key not configured" });
      }
      const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      res.json(data);
    } catch (error) {
      console.error("Geocode API error:", error);
      res.status(500).json({ error: "Failed to reverse geocode" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
