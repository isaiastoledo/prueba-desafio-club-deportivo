import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const router = express.Router();
const deportesFilePath = path.join(__dirname, "/data/deportes.json");

const readDeportesFile = () => {
  return JSON.parse(fs.readFileSync(deportesFilePath, "utf-8"));
};

const writeDeportesFile = (data) => {
  fs.writeFileSync(deportesFilePath, JSON.stringify(data, null, 2));
};

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

router.get("/agregar", (req, res) => {
  const { nombre, precio } = req.query;

  const objectDeport = {
    nombre,
    precio,
  };

  const { deportes } = readDeportesFile();
  deportes.push(objectDeport);

  writeDeportesFile({ deportes });
  res.send("Deporte agregado con éxito");
});

router.get("/deportes", (req, res) => {
  res.sendFile(deportesFilePath);
});

router.get("/editar", (req, res) => {
  const { nombre, precio } = req.query;

  const { deportes } = readDeportesFile();
  const index = deportes.findIndex((d) => d.nombre === nombre);

  if (index !== -1) {
    deportes[index].precio = precio;
    writeDeportesFile({ deportes });
    res.send("Deporte editado con éxito");
  } else {
    res.status(404).send("Deporte no encontrado");
  }
});

router.get("/eliminar", (req, res) => {
  const { nombre } = req.query;

  const { deportes } = readDeportesFile();
  const index = deportes.findIndex((d) => d.nombre === nombre);

  if (index !== -1) {
    deportes.splice(index, 1);
    writeDeportesFile({ deportes });
    res.send("Deporte eliminado con éxito");
  } else {
    res.status(404).send("Deporte no encontrado");
  }
});

export default router;



