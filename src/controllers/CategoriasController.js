const prismaClient = require("../database/PrismaClient.js");

class CategoriasController {
    
    async listarCategorias(request, response) {
        const { nome } = request.query;

        try {
            let categorias;

            if (nome) {
                categorias = await prismaClient.categoria.findMany({
                    where: {
                        nome: {
                            contains: nome,
                            mode: "insensitive"
                        }
                    }
                });
            } else {
                categorias = await prismaClient.categoria.findMany();
            }

            return response.status(200).json(categorias);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            return response.status(500).send("Erro ao buscar categorias");
        }
    }

    async criarCategoria(request, response) {
        const { nome, descricao } = request.body;

        if (!nome || !descricao) {
            return response.status(400).send('Um ou mais campos não foram preenchidos');
        }

        try {
            const categoria = await prismaClient.categoria.create({
                data: {
                    nome: nome,
                    descricao: descricao,
                }
            });
            return response.status(201).json(categoria);
        } catch (error) {
            return response.status(500).send();
        }
    }

    async atualizarCategoria(request, response) {
        const { id } = request.params;
        const { nome, descricao } = request.body;
        try {
            const categoria = await prismaClient.categoria.update({
                where: {
                    id
                },
                data: {
                    nome: nome,
                    descricao: descricao,
                }
            });
            return response.status(200).json(categoria);
        } catch (error) {
            return response.status(500).send();
        }
    }

    async deletarCategoria(request, response) {
        const { id } = request.params;
        try {
            const categoria = await prismaClient.categoria.delete({
                where: {
                    id
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

module.exports = CategoriasController;