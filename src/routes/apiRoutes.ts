import { Router } from "express";
import {
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

export default router;