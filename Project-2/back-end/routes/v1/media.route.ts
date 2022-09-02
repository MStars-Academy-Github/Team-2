import express, { Router } from "express";
import { mediaController } from "../../modules/media";

const router: Router = express.Router();

router.get("/video/:mediaId", mediaController.getMediaById);
router.post("/upload", mediaController.createMedia);
router.get("/video/by/:userId", mediaController.getMediaByUserId);
export default router;
