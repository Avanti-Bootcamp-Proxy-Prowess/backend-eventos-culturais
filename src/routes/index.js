// import { Router } from "express";
const { Router } = require("express");

const categoriasRoutes = require("./categorias.routes");
const eventosRoutes = require("./eventos.routes");
const locaisRoutes = require("./locais.routes");
const usuariosRoutes = require("./usuarios.routes");
const loginRoutes = require("./login.routes");

const routes = Router();

routes.use("/usuarios", usuariosRoutes);
routes.use("/login", loginRoutes);

routes.use("/categorias", categoriasRoutes);
routes.use("/eventos", eventosRoutes);
routes.use("/locais", locaisRoutes);

module.exports = routes;
