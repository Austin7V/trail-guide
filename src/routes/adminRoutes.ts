import { Router} from "express";
import { createTrail,
    renderAdminTrailList,
renderNewTrailForm,
} from "../controllers/adminController";

const router = Router();
router.get("/", renderAdminTrailList);
router.get("/trails/new", renderNewTrailForm);
router.post("/trails", createTrail);

export default router;