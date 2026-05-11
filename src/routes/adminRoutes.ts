import { Router} from "express";
import { renderAdminTrailList } from "../controllers/adminController";

const router = Router();
router.get("/", renderAdminTrailList);

export default router;