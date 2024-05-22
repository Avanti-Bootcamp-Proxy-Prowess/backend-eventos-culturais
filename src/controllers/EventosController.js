const prismaClient = require("../database/PrismaClient.js");

class EventosController {
    async listarEventos(request, response) {
        const eventos = await prismaClient.evento.findMany();

        response.status(200).json(eventos);
    }

    async criarEvento(request, response) {
        const { nome, data_evento, descricao, categoria_id, local_id, usuario_id } = request.body;

        if(!nome || !data_evento || !descricao || !categoria_id || !local_id || !usuario_id) {
            response.status(400).send('Um ou mais campos não foram preenchidos');
        }

        try{
            const evento = await prismaClient.evento.create({
                data: {
                    nome: nome,
                    data_evento: data_evento,
                    descricao: descricao,
                    categoria_id: categoria_id,
                    local_id: local_id,
                    usuario_id: usuario_id
                }
            });
            response.status(201).json(evento);   
        } catch(error) {
            response.status(500).send();
        }
    }

    async atualizarEvento(request, response) {
        const { id } = request.params;
        const { nome, data_evento, descricao, categoria_id, local_id } = request.body;
        try {
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
        } catch(error) {
            response.status(500).send();
        }
    }

    async deletarEvento(request, response) {
        const { id } = request.params;
        try {
            const evento = await prismaClient.evento.delete({
                where: {
                    id
                }
            });
            response.status(204).send();
        } catch(error) {
            if(error.code === 'P2025') {
                response.status(404).send('Registro não encontrado');
            }else {
                response.status(500).send();
            }
        }
    }

    // filtros
    async filtrarEventos(request, response) {
        const { nome, categoria, local, data } = request.query;
        try {
            const eventosFiltrados = await prismaClient.evento.findMany({
                where: {
                    OR: [ 
                        nome ? {nome: nome} : {},
                        categoria ? { categoria_id: categoria } : {},
                        local ? { local_id: local } : {},
                        data ? { data_evento: new Date(data) } : {}
                    ]
                }
            });
            response.status(200).json(eventosFiltrados);
        } catch(error) {
            response.status(500).send();
        }
    }
}

module.exports = EventosController;