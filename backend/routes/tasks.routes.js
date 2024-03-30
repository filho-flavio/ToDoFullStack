import express from "express";
import protectRoute from "../middleware/protectRoute";
import { createListColumn, createTask, getAllLists, getAllTasks } from "../controllers/tasks.controller";

const router = express.Router();

router.get("/tasks", protectRoute, getAllTasks)

router.post("/tasks", protectRoute, createTask);

router.get("./lists", protectRoute, getAllLists)

router.post("/lists", protectRoute, createListColumn);
