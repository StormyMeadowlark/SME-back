import { Router } from "express";
import { fetchApiKey } from "../controllers/footerMapsApiController.js";

const router = Router();

router.get("/key/footer-map", fetchApiKey);

export default router;
