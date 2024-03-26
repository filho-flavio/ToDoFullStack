import express from "express";
import { signIn, signOut, singUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", signIn);

router.post("/signup", singUp);

router.post("/signout", signOut);

export default router;
