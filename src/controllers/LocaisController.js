const prismaClient = require("../database/PrismaClient.js");

class LocaisController {
    async listarLocais(request, response) {
        const { nome } = request.query

        try {
            let locais;
            if(nome) {
                locais = await prismaClient.local.findMany({
                    where: {
                        nome: {
                            contains: nome,
                            mode: 'insensitive'
                        }
                    }
                });
            } else {
                locais = await prismaClient.local.findMany();
            }
            return response.status(200).json(locais)
        } catch(error) {
            console.error("Erro ao buscar locais:", error);
            return response.status(500).send("Erro ao buscar locais");
        }
    }

    async criarLocal(request, response) {
        const { nome, endereco, cidade, estado, pais } = request.body;

        if (!nome || !endereco || !cidade || !estado || !pais) {
            return response.status(400).send('Um ou mais campos não foram preenchidos');
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
            return response.status(201).json(local);
        } catch (error) {
            return response.status(500).send();
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
            return response.status(200).json(local);
        } catch (error) {
            return response.status(500).send();
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
            return response.status(204).send();
        } catch (error) {
            if (error.code === 'P2025') {
                return response.status(404).send('Registro não encontrado');
            } else {
                return response.status(500).send();
            }
        }
    }
}

module.exports = LocaisController;