const { Router } = require("express");

const EventosController = require("../controllers/EventosController");

const eventosRoutes = Router();

const eventosController = new EventosController();

//rotas

module.exports = eventosRoutes; 