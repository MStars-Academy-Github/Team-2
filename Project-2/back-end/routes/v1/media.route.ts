import express, { Router } from "express";
import { mediaController } from "../../modules/media";

const router: Router = express.Router();

router.get("/", mediaController.getMedia);
router.post("/upload", mediaController.createMedia);
export default router;
