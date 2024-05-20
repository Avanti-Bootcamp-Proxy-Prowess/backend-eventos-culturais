const { Router } = require('express');

const LoginController = require('../controllers/LoginController');
const loginController = new LoginController();

const loginRoutes = Router();
loginRoutes.post("/", loginController.create);

module.exports = loginRoutes;