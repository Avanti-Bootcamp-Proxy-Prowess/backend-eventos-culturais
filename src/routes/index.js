import { Router } from "express";

import categoriasRoutes from "./categorias.routes";
import eventosRoutes from "./eventos.routes";
import locaisRoutes from "./locais.routes";

const routes = Router();

routes.use("/categorias", categoriasRoutes);
routes.use("/eventos", eventosRoutes);
routes.use("/locais", locaisRoutes);

module.exports = routes;