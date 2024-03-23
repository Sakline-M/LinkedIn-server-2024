import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//route object
const router = express.Router();

// routing
/* REGISTER || METHOOD POST */
router.post("/register", registerController);
/*LOGIN  || METHOOD POST*/
router.post("/login", loginController);

export default router;
