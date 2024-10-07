import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/routes";

const port = 7200;
const app = express();

mongoose
  .connect(
    "mongodb+srv://tienda_nube_prod:Y8q9jzLrWBGBob2g@produccion.yw5q6.mongodb.net/Alain"
  )
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

app.use(express.json());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(router);
