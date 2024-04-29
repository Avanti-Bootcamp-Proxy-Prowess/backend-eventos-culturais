const prismaClient = require("../database/PrismaClient.js");

class EventosController{
    async listarEventos(request, response) {
        const eventos = await prismaClient.evento.findMany();

        response.status(200).json(eventos);
    }

    async criarEvento(request, response) {
        const { nome, data_evento, descricao, categoria_id, local_id  } = request.body;
        const evento = await prismaClient.evento.create({
            data: {
                nome: nome,
                data_evento: data_evento,
                descricao: descricao,
                categoria_id: categoria_id,
                local_id: local_id
            }
        });

        response.status(201).json(evento);
    }

    async atualizarEvento(request, response) {
        const { id } = request.params;
        const { nome, data_evento, descricao, categoria_id, local_id } = request.body;
        const evento = await prismaClient.evento.update({
            where: {
                id
            },
            data: {
                nome: nome,
                data_evento: data_evento,
                descricao: descricao,
                categoria_id: categoria_id,
                local_id: local_id
            }
        });

        response.status(200).json(evento);
    }

    async deletarEvento(request, response) {
        const { id } = request.params;
        const evento = await prismaClient.evento.delete({
            where: {
                id
            }
        });

        response.status(204).send();
    }
}

module.exports = EventosController;