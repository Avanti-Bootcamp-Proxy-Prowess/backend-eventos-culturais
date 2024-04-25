import { Router } from "express";
import CategoriasController from "../controllers/CategoriasController";

const categoriasRoutes = Router();

const categoriasController = new CategoriasController();

categoriasRoutes.get("/", categoriasController.listarCategorias);
categoriasRoutes.post("/", categoriasController.criarCategoria);
categoriasRoutes.put("/:id", categoriasController.atualizarCategoria);
categoriasRoutes.delete("/:id", categoriasController.deletarCartegoria);

module.exports = categoriasRoutes; 