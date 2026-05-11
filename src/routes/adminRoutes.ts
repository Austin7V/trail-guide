import { Router} from "express";
import { createTrail,
    deleteExistingTrail,
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
router.post("/trails/:id/delete", deleteExistingTrail);

export default router;