const prismaClient  = require("../database/PrismaClient.js");

class LocaisController {
    async listarLocais (request, response) {
        const locais = await prismaClient.local.findMany();

        response.status(200).json(locais);
    }

    async criarLocal (request, response) {
        const { nome, endereco, cidade, estado, pais } = request.body;
        const local = await prismaClient.local.create({
            data: {
                nome: nome,
                endereco: endereco,
                cidade: cidade,
                estado: estado,
                pais: pais,
            }
        });

        response.status(201).json(local);
    }

    async atualizarLocal (request, response) {
        const { id } = request.params;
        const { nome, endereco, cidade, estado, pais } = request.body;
        const local = await prismaClient.local.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                endereco: endereco,
                cidade: cidade,
                estado: estado,
                pais: pais,
            }
        });

        response.status(200).json(local);
    }

    async deletarLocal (request, response) {
        const { id } = request.params
        const local = await prismaClient.local.delete({
            where: {
                id: id
            }
        });

        response.status(204).send();
    }
}

//

module.exports = LocaisController;