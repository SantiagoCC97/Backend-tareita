import mongoose, { InferSchemaType } from "mongoose";

const taskmanagerSchema = new mongoose.Schema(
  {
    title: { type: mongoose.Schema.Types.Mixed },
    description: { type: mongoose.Schema.Types.Mixed }, //
    status: { type: mongoose.Schema.Types.Mixed },
  },
  {
    timestamps: true, // Agrega campos de fecha automáticamente (createdAt, updatedAt)
  }
);

//Interface taskmanager basada en el esquema
export type Itaskmanager = InferSchemaType<typeof taskmanagerSchema>;

//Modelo taskmanager basado en el esquema
export const taskManager = mongoose.model("taskmanager", taskmanagerSchema);
