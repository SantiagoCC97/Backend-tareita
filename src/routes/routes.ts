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

router.delete(
  "/delete-task/:id", // Recibe el id de la tarea a eliminar
  (req: Request, res: Response, next: NextFunction) => {
    taskmanagerController.deleteTask(req, res, next).catch(next); // Llama al método del controlador para eliminar
  }
);

router.patch(
  "/done-task/:id", // Ruta que recibe el id de la tarea a actualizar
  (req: Request, res: Response, next: NextFunction) => {
    taskmanagerController.updateTaskStatus(req, res, next).catch(next); // Llama al método del controlador para actualizar el estado
  }
);

export default router;
