// import { Router } from "express";
const { Router } = require("express");

const categoriasRoutes = require("./categorias.routes");
const eventosRoutes = require("./eventos.routes");
const locaisRoutes = require("./locais.routes");

const routes = Router();

routes.use("/categorias", categoriasRoutes);
routes.use("/eventos", eventosRoutes);
routes.use("/locais", locaisRoutes);

module.exports = routes;
