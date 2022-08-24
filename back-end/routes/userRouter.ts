import express, { Router } from "express";
import UserController from "../controller/UserController";
import AuthencationController from "../controller/AuthencationController";
const router: Router = express.Router();

/*------------------- ALL USER ----------------------------*/
router.get("/", UserController.getUsers);
router.get("/femaleUsr", UserController.getUsersFemale);
router.get("/maleUsr", UserController.getUsersMale);
/*--------------- LOGIN , REGISTER -------------------------*/
router.post("/register", AuthencationController.registerUser);
router.post("/login", AuthencationController.loginUser);
/*--------------- UPDATE , DELETE -------------------------*/
router.put("/:id", UserController.editUser);
router.delete("/delete?", UserController.deleteUser);

export default router;
