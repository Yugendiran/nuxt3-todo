import express from "express";

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/TaskController.js";

const router = express.Router();

router.get("/", getAllTasks);

router.post("/createTask", createTask);

router.put("/updateTask", updateTask);

router.delete("/deleteTask", deleteTask);

export default router;
