const { Router } = require("express");
const UsuariosController = require("../controllers/UsuariosController");
const Autenticacao = require("../middlewares/Autenticacao");

const usuariosRoutes = Router();

const usuariosController = new UsuariosController();

usuariosRoutes .post("/", usuariosController.criarUsuario);
usuariosRoutes .put('/', Autenticacao, usuariosController.update)

module.exports = usuariosRoutes;