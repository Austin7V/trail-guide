import { Router } from "express";
import { requireApiKey } from "../middleware/apiKey.ts";
import {
    createTrailApi,
    getTrailBySlugApi,
    getTrailsApi,
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

export default router;