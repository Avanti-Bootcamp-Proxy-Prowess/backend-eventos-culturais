const { Router } = require("express");

const UsuarioAvatarController = require("../controllers/UsuarioAvatarController");
const UsuariosController = require("../controllers/UsuariosController");
const Autenticacao = require("../middlewares/Autenticacao");

const multer = require("multer");
const uploadConfig = require("../configs/upload")

const usuariosRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usuariosController = new UsuariosController();
const usuarioAvatarController = new UsuarioAvatarController();

usuariosRoutes.post("/", usuariosController.criarUsuario);
usuariosRoutes.put('/', Autenticacao, usuariosController.update)
usuariosRoutes.patch('/avatar', Autenticacao, upload.single("avatar"), usuarioAvatarController.update);

module.exports = usuariosRoutes;