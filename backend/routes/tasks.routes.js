import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createList,
  createTask,
  getAllLists,
  getAllTasks,
} from "../controllers/tasks.controller.js";

const router = express.Router();

router.post("/get-tasks", getAllTasks);

router.post("/create-task", createTask);

router.get("/get-lists", getAllLists);

router.post("/create-list", createList);

export default router;
