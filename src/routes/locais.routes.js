const { Router } = require("express");

const EventosController = require("../controllers/LocaisController");

const locaisRoutes = Router();

const locaisController = new EventosController();

//rotas

module.exports = locaisRoutes; 