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

  async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const taskId = req.params.id; // Obtener el id de la tarea desde los parámetros de la ruta
      const deletedTask = await taskManager.findByIdAndDelete(taskId); // Método de Mongoose para eliminar por id

      if (!deletedTask) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }

      res
        .status(200)
        .json({ message: "Tarea eliminada correctamente", task: deletedTask });
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  }

  async updateTaskStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const taskId = req.params.id; // Obtener el id de la tarea desde los parámetros de la ruta
      const updatedTask = await taskManager.findByIdAndUpdate(
        taskId,
        { status: req.body.status }, // Actualiza el campo `status` con el valor proporcionado
        { new: true } // Devuelve la tarea actualizada
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }

      res.status(200).json({
        message: "Tarea actualizada correctamente",
        task: updatedTask,
      });
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  }
}

export default new taskmanagerController();
