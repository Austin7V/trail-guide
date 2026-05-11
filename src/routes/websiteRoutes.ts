import { Router} from "express";
import {
    renderHomePage,
    renderTrailDetailPage,
} from "../controllers/trailController.ts";
import { renderRegionDetailPage,
renderRegionsPage,
} from "../controllers/regionController.ts";

const router = Router();

router.get("/", renderHomePage);
router.get("/trails/:slug", renderTrailDetailPage);
router.get("/regions", renderRegionsPage);
router.get("/regions/:slug", renderRegionDetailPage);

export default router;