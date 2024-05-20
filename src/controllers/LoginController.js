const prismaClient = require("../database/PrismaClient.js");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

class LoginController {
    async create(request, response) {
        const { email, password } = request.body;

        try {
            const user = await prismaClient.usuario.findUnique({
                where: { email }
            });

            if (!user) {
                return response.status(401).json({ message: "E-mail e/ou senha incorreta." });
            }

            const passwordMatched = await compare(password, user.password);

            if (!passwordMatched) {
                return response.status(401).json({ message: "E-mail e/ou senha incorreta." });
            }

            const { secret, expiresIn } = authConfig.jwt;

            const token = sign({}, secret, {
                subject: String(user.id),
                expiresIn
            });

            return response.status(201).json({ token, user });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Erro interno do servidor." });
        }
    }

}

module.exports = LoginController;
