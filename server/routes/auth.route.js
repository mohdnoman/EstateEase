import express from "express"
import User from "../models/user.model.js";
import { signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp)


export default router