const { Router } = require("express");

const CategoriasController = require("../controllers/CategoriasController.js");

const categoriasRoutes = Router();

const categoriasController = new CategoriasController();

categoriasRoutes.get("/", categoriasController.listarCategorias);
categoriasRoutes.post("/", categoriasController.criarCategoria);
categoriasRoutes.put("/:id", categoriasController.atualizarCategoria);
categoriasRoutes.delete("/:id", categoriasController.deletarCategoria);

module.exports = categoriasRoutes; 