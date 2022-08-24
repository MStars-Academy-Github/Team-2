import express, { Router } from "express";
import UserController from "../controller/UserController";
const router: Router = express.Router();

router.get("/", UserController.getUsers);
router.get("/femaleUsr", UserController.getUsersFemale);
router.get("/maleUsr", UserController.getUsersMale);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.put("/:id", UserController.editUser);
router.delete("/delete?", UserController.deleteUser);

export default router;
