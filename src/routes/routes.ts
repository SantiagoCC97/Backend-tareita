import express from "express";
import { Request, Response, NextFunction } from "express";
import taskmanagerController from "../controller/taskmanager"; // Asegúrate de usar el nombre correcto

const router = express.Router();

// Asegúrate de que `createTask` es compatible con middleware de Express
router.post(
  "/create-task",
  (req: Request, res: Response, next: NextFunction) => {
    taskmanagerController.createTask(req, res, next).catch(next);
  }
);

router.get("/get-all", (req: Request, res: Response, next: NextFunction) => {
  taskmanagerController.getAllTasks(req, res, next).catch(next);
});

export default router;
