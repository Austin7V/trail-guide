import { Router} from "express";
import { createTrail,
    renderAdminTrailList,
    renderEditTrailForm,
    renderNewTrailForm,
    saveEditedTrail,
} from "../controllers/adminController";

const router = Router();
router.get("/", renderAdminTrailList);
router.get("/trails/new", renderNewTrailForm);
router.post("/trails", createTrail);
router.get("/trails/:id/edit", renderEditTrailForm);
router.post("/trails/:id", saveEditedTrail);

export default router;