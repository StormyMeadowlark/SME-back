// controllers/apiKeyController.mjs
import { FOOTER_MAPS_API_KEY }from "../config.js";



export const fetchApiKey = (req, res) => {
  try {
    const apiKey = FOOTER_MAPS_API_KEY;
    if (apiKey) {
      res.json({ apiKey });
    } else {
      res.status(500).json({ error: "API key not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};