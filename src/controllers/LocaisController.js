const prismaClient = require("../database/PrismaClient.js");

class LocaisController {
    async listarLocais(request, response) {
        const locais = await prismaClient.local.findMany();

        response.status(200).json(locais);
    }

    async criarLocal(request, response) {
        const { nome, endereco, cidade, estado, pais } = request.body;

        if (!nome || !endereco || !cidade || !estado || !pais) {
            response.status(400).send('Um ou mais campos não foram preenchidos');
        }

        try {
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
        } catch (error) {
            response.status(500).send();
        }
    }

    async atualizarLocal(request, response) {
        const { id } = request.params;
        const { nome, endereco, cidade, estado, pais } = request.body;
        try {
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
        } catch (error) {
            response.status(500).send();
        }
    }

    async deletarLocal(request, response) {
        const { id } = request.params
        try {
            const local = await prismaClient.local.delete({
                where: {
                    id: id
                }
            });
            response.status(204).send();
        } catch (error) {
            if (error.code === 'P2025') {
                response.status(404).send('Registro não encontrado');
            } else {
                response.status(500).send();
            }
        }
    }
}

module.exports = LocaisController;