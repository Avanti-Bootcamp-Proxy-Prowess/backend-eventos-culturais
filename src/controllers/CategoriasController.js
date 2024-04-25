import { prismaClient } from "../database/PrismaClient.js";

class CategoriasController {

    async listarCategorias (request, response) {
        const categorias = await prismaClient.categoria.findMany();
    
        response.status(200).json(categorias);
    }

    async criarCategoria (request, response) {
        const { nome, descricao } = request.body;
        const categoria = await prismaClient.categoria.create({
            data: {
                nome: nome,
                descricao: descricao,
            }
        });
    
        response.status(201).json(categoria);
    }

    async atualizarCategoria(request, response) {
        const { id } = request.params;
        const { nome, descricao } = request.body;
        const categoria = await prismaClient.categoria.update({
            where:{
                id
            },
            data: {
                nome: nome,
                descricao: descricao,
            }
        });
    
        response.status(200).json(categoria);
    }

    async deletarCartegoria (request, response) {
        const { id } = request.params;   
        const categoria = await prismaClient.categoria.delete({
            where:{
                id
            }
        });
    
        response.status(204).send();
    }

}

module.exports = CategoriasController;