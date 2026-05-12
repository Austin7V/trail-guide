import { Router } from "express";
import {
    getTrailBySlugApi,
    getTrailsApi,
} from "../controllers/apiTrailController.ts";
import {
    getRegionsApi,
    getRegionTrailsApi,
} from "../controllers/apiRegionController.ts";
import { requireApiKey} from "../middleware/apiKey.ts";

const router = Router();

router.post("/test-protected", requireApiKey, (_request, response) => {
    response.status(200).json({ message: "API key works" });
});

router.get("/trails", getTrailsApi);
router.get("/trails/:slug", getTrailBySlugApi);
router.get("/regions", getRegionsApi);
router.get("/regions/:slug/trails", getRegionTrailsApi);

export default router;