import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/flights/cheap", async (req, res) => {
    const { origin, destination, currency = 'EUR' } = req.query;
    // Check both names to be helpful to the user
    const rawToken = process.env.TRAVELPAYOUTS_TOKEN || process.env.VITE_TRAVELPAYOUTS_TOKEN;
    const token = rawToken?.trim();

    if (!token || token === "MY_TRAVELPAYOUTS_TOKEN" || token.includes("TODO")) {
      return res.status(401).json({ 
        error: "Travelpayouts API token is missing or using a placeholder. Please set TRAVELPAYOUTS_TOKEN in the Secrets panel." 
      });
    }

    if (!origin || !destination) {
      return res.status(400).json({ error: "Origin and destination are required" });
    }

    try {
      const apiUrl = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&destination=${destination}&token=${token}&currency=${currency}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        const text = await response.text();
        console.error(`Travelpayouts API error (${response.status}):`, text);
        
        if (response.status === 401 || text.includes("Unauthorized")) {
          return res.status(401).json({ 
            error: "Travelpayouts API Unauthorized. Please check your TRAVELPAYOUTS_TOKEN in the Secrets panel." 
          });
        }
        
        return res.status(response.status).json({ error: `Travelpayouts API error: ${text}` });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error proxying Travelpayouts request:", error);
      res.status(500).json({ error: "Failed to fetch flight data from Travelpayouts. Please verify your API token." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
