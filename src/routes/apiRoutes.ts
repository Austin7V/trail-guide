import { Router } from "express";
import { requireApiKey } from "../middleware/apiKey.ts";
import {
    createTrailApi,
    getTrailBySlugApi,
    getTrailsApi,
    updateTrailApi,
} from "../controllers/apiTrailController.ts";
import {
    getRegionsApi,
    getRegionTrailsApi,
} from "../controllers/apiRegionController.ts";

const router = Router();

router.get("/trails", getTrailsApi);
router.get("/trails/:slug", getTrailBySlugApi);

router.get("/regions", getRegionsApi);
router.get("/regions/:slug/trails", getRegionTrailsApi);

router.post("/trails", requireApiKey, createTrailApi);
router.patch("/trails/:id", requireApiKey, updateTrailApi);

export default router;