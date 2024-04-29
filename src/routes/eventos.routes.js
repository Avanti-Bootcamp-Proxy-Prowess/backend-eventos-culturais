const { Router } = require("express");

const EventosController = require("../controllers/EventosController");

const eventosRoutes = Router();

const eventosController = new EventosController();

eventosRoutes.get("/", eventosController.listarEventos);
eventosRoutes.post("/", eventosController.criarEvento);
eventosRoutes.put("/:id", eventosController.atualizarEvento);
eventosRoutes.delete("/:id", eventosController.deletarEvento);

module.exports = eventosRoutes; 