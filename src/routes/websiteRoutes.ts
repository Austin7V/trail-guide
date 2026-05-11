import { Router} from "express";
import {
    renderHomePage,
    renderTrailDetailPage,
} from "../controllers/trailController.ts";

const router = Router();

router.get("/", renderHomePage);
router.get("/trails/:slug", renderTrailDetailPage);

export default router;