import express, { Router } from "express";
import UserController from "../controller/UserController";
const router: Router = express.Router();

router.get("/", UserController.getUsers);
// router.post("/", UserController.createUser);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

export default router;
