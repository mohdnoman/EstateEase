import express from "express"
import { updateUserInfo } from "../controllers/user.controller.js"
import { VerifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id",VerifyUser, updateUserInfo)


export default router