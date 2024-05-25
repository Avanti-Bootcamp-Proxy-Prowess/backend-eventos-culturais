const { Router } = require("express");
const Autenticacao = require("../middlewares/Autenticacao");
const LocaisController = require("../controllers/LocaisController");

const locaisRouter = Router();

const locaisController = new LocaisController();
locaisRouter.use(Autenticacao);

locaisRouter.get('/', locaisController.listarLocais);
locaisRouter.post('/', locaisController.criarLocal);
locaisRouter.put('/:id', locaisController.atualizarLocal);
locaisRouter.delete('/:id', locaisController.deletarLocal);

module.exports = locaisRouter; 