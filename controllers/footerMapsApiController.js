// controllers/apiKeyController.mjs
import { GOOGLE_MAPS_API_KEY }from "../config.js";



export const fetchApiKey = (req, res) => {
res.json({apiKey: process.env.GOOGLE_MAPS_API_KEY})
};