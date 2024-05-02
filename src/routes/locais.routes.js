const { Router } = require("express");

const LocaisController = require("../controllers/LocaisController");

const locaisRouter = Router();

const locaisController = new LocaisController();

locaisRouter.get('/', locaisController.listarLocais);
locaisRouter.post('/', locaisController.criarLocal);
locaisRouter.put('/:id', locaisController.atualizarLocal);
locaisRouter.delete('/:id', locaisController.deletarLocal);

module.exports = locaisRouter; 