import { NextFunction, Request, Response } from "express";
import { taskManager } from "../models/taskmanager";

interface TaskRequestBody {
  title: string;
  description: string;
  status: string;
}

class taskmanagerController {
  async createTask(
    req: Request<{}, {}, TaskRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { title, description, status } = req.body; // Aquí estamos obteniendo los datos del cuerpo de la solicitud

    const data = {
      title,
      description,
      status,
    };

    const createReg = new taskManager(data); // Modelo de Mongoose
    const savedStatus = await createReg.save();

    if (savedStatus) return res.status(200).json(savedStatus);
    return res.status(500).json({ error: "Error al guardar la tarea" });
  }

  async getAllTasks(
    req: Request<{}, {}, TaskRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const allTask = await taskManager.find({}); // Modelo de Mongoose

    console.log("allTask.length: ", allTask.length);
    console.log("allTask: ", allTask);

    // if (allTask.length < 1) return res.status(200).json(savedStatus);
    return res.status(200).json({ allTask });
  }
}

export default new taskmanagerController();
