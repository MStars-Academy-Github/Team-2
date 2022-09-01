import express, { Router } from "express";
import { videosController } from "../../modules/user";

const router: Router = express.Router();

router.get("/", videosController.getVideos);
export default router;
