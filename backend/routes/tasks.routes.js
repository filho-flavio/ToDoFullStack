import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createList, createTask, getAllLists, getAllTasks } from "../controllers/tasks.controller.js";

const router = express.Router();

router.get("/tasks", protectRoute, getAllTasks)

router.post("/tasks", protectRoute, createTask);

router.get("./lists", protectRoute, getAllLists)

router.post("/create-list", createList);

export default router;