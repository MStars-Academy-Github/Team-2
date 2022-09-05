import express, { Router } from "express";
import { mediaController } from "../../modules/media";

const router: Router = express.Router();

router.get("/video/:mediaId", mediaController.getMediaById);
router.post("/upload", mediaController.createMedia);
router.get("/video/by/:userId", mediaController.getMediaByUserId);
router.get("/search/by/:title", mediaController.getMediaByTitle);
export default router;
