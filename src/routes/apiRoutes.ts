import { Router } from "express";
import {
    getTrailBySlugApi,
    getTrailsApi,
} from "../controllers/apiTrailController.ts";

const router = Router();

router.get("/trails", getTrailsApi);
router.get("trails/:slug", getTrailBySlugApi);

export default router;