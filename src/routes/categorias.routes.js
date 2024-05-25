const { Router } = require("express");
const Autenticacao = require("../middlewares/Autenticacao");
const CategoriasController = require("../controllers/CategoriasController.js");

const categoriasRoutes = Router();

const categoriasController = new CategoriasController();
categoriasRoutes.use(Autenticacao);

categoriasRoutes.get("/", categoriasController.listarCategorias);
categoriasRoutes.post("/", categoriasController.criarCategoria);
categoriasRoutes.put("/:id", categoriasController.atualizarCategoria);
categoriasRoutes.delete("/:id", categoriasController.deletarCategoria);

module.exports = categoriasRoutes; 